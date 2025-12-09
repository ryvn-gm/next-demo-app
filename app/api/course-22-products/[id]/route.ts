import { NextResponse } from 'next/server';

/**
 * [Course-22] Dynamic Route Handler
 * 路徑：/api/course-22-products/[id]
 * 
 * 對應動態路由參數 `[id]`。
 * 在 Next.js 15 (或較新版 App Router) 中，params 是一個 Promise，需要 await。
 */

// 模擬資料庫
let products = [
    { id: '1', name: 'iPhone 15', price: 999 },
    { id: '2', name: 'MacBook Pro', price: 1999 },
    { id: '3', name: 'AirPods', price: 199 },
];

// Context Type Definition
type Context = {
    params: Promise<{ id: string }>;
};

// 1. GET - 讀取特定 ID
export async function GET(request: Request, context: Context) {
    // [教學重點] 記得 await params
    const { id } = await context.params;

    const product = products.find((p) => p.id === id);

    if (!product) {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, data: product });
}

// 2. PATCH - 更新特定 ID
export async function PATCH(request: Request, context: Context) {
    const { id } = await context.params;
    const body = await request.json(); // 讀取 Request Body

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // 更新模擬資料
    products[index] = { ...products[index], ...body };

    return NextResponse.json({
        success: true,
        message: `Product ${id} updated`,
        data: products[index],
    });
}

// 3. DELETE - 刪除特定 ID
export async function DELETE(request: Request, context: Context) {
    const { id } = await context.params;

    const initialLength = products.length;
    products = products.filter((p) => p.id !== id);

    if (products.length === initialLength) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
        success: true,
        message: `Product ${id} deleted`,
    });
}
