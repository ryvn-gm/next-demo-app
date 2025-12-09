import { create } from 'zustand';

export type CartItem = {
    id: string;
    name: string;
    price: number;
};

type CartState = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (item) => set((state) => ({
        items: [...state.items, item]
    })),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
    })),
    clearCart: () => set({ items: [] }),
    getTotal: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
    }
}));

