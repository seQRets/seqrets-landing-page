import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { PRODUCTS, type ProductSlug } from "@/lib/stripe";

// ─── Types ───────────────────────────────────────────────────────
export interface CartItem {
  slug: ProductSlug;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; slug: ProductSlug }
  | { type: "REMOVE_ITEM"; slug: ProductSlug }
  | { type: "UPDATE_QUANTITY"; slug: ProductSlug; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "SET_DRAWER"; open: boolean };

// ─── Reducer ─────────────────────────────────────────────────────
const STORAGE_KEY = "seqrets-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.slug === action.slug);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.slug === action.slug ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { slug: action.slug, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.slug !== action.slug),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.slug !== action.slug),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.slug === action.slug ? { ...i, quantity: action.quantity } : i,
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case "SET_DRAWER":
      return { ...state, isDrawerOpen: action.open };
    default:
      return state;
  }
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    // Validate slugs still exist in catalog
    return parsed.filter((i) => i.slug in PRODUCTS && i.quantity > 0);
  } catch {
    return [];
  }
}

// ─── Context ─────────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (slug: ProductSlug) => void;
  removeItem: (slug: ProductSlug) => void;
  updateQuantity: (slug: ProductSlug, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadCart(),
    isDrawerOpen: false,
  });

  // Persist items to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (sum, i) => sum + PRODUCTS[i.slug].priceInCents * i.quantity,
        0,
      ),
    [state.items],
  );

  const addItem = useCallback(
    (slug: ProductSlug) => dispatch({ type: "ADD_ITEM", slug }),
    [],
  );
  const removeItem = useCallback(
    (slug: ProductSlug) => dispatch({ type: "REMOVE_ITEM", slug }),
    [],
  );
  const updateQuantity = useCallback(
    (slug: ProductSlug, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", slug, quantity }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleDrawer = useCallback(
    () => dispatch({ type: "TOGGLE_DRAWER" }),
    [],
  );
  const setDrawerOpen = useCallback(
    (open: boolean) => dispatch({ type: "SET_DRAWER", open }),
    [],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      isDrawerOpen: state.isDrawerOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleDrawer,
      setDrawerOpen,
    }),
    [state.items, state.isDrawerOpen, totalItems, totalPrice,
     addItem, removeItem, updateQuantity, clearCart, toggleDrawer, setDrawerOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
