'use client';

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

/**
 * [Course-29] Global State (Zustand)
 * 
 * 目標：
 * 1. 演示跨組件狀態共享 (CartHeader vs ProductList)。
 * 2. 體驗 Zustand 的簡潔語法 (不需要 Provider)。
 */

// 子組件：顯示購物車摘要 (通常放在 Navbar)
function CartHeader() {
    // [教學重點] Selector 模式：只訂閱需要的 items (或 length)
    // 這樣當其他無關屬性變動時，不會觸發這個組件 Re-render
    const itemsCount = useCartStore((state) => state.items.length);
    const total = useCartStore((state) => state.getTotal());

    return (
        <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg shadow">
            <span className="font-bold text-lg">My Shop</span>
            <div className="flex items-center gap-4">
                <span>Total: ${total}</span>
                <Badge variant="secondary" className="text-md px-3 font-bold">
                    🛒 {itemsCount}
                </Badge>
            </div>
        </div>
    );
}

// 子組件：商品列表
function ProductList() {
    const addItem = useCartStore((state) => state.addItem);

    const PRODUCTS = [
        { id: '1', name: 'Keyboard', price: 100 },
        { id: '2', name: 'Mouse', price: 50 },
        { id: '3', name: 'Monitor', price: 300 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRODUCTS.map(p => (
                <Card key={p.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{p.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <span className="font-bold">${p.price}</span>
                            <Button size="sm" onClick={() => addItem(p)}>Add to Cart</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// 子組件：購物車內容
function CartContents() {
    // 訂閱多個屬性
    const { items, removeItem, clearCart } = useCartStore();

    if (items.length === 0) {
        return <div className="text-center text-muted-foreground py-8">Cart is empty</div>;
    }

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                // 使用 index 只是為了 demo (允許重複添加相同 ID 商品)
                <div key={`${item.id}-${index}`} className="flex justify-between items-center border-b pb-2">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4">
                        <span>${item.price}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500">
                            Remove
                        </Button>
                    </div>
                </div>
            ))}
            <Button variant="destructive" className="w-full" onClick={clearCart}>
                Clear Cart
            </Button>
        </div>
    );
}

export default function Course29Zustand() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 29] Zustand</h1>
                <p className="text-muted-foreground">
                    輕量級全域狀態管理。無需 Context Provider 包裹，可在任意組件 (甚至組件外) 使用。
                </p>
            </div>

            <CartHeader />

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Products</h2>
                    <ProductList />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Cart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CartContents />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
