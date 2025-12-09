import { NextResponse } from 'next/server';

/**
 * [Course-20] API Route Handler
 * 
 * 路徑：/api/course-20-data
 * 
 * 這是 Next.js 標準的後端 API 定義方式 (取代了舊版的 Pages Router API)。
 * 支援 GET, POST, PUT, DELETE, PATCH 等 HTTP 方法。
 */

// 模擬資料庫
const DATA = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 300 },
];

export async function GET() {
    // [教學重點] NextResponse 是 Web Response API 的擴充
    return NextResponse.json({
        success: true,
        data: DATA,
        timestamp: new Date().toISOString(),
    });
}

export async function POST(request: Request) {
    // [教學重點] 讀取 Request Body
    const body = await request.json();

    // 模擬處理
    const newData = {
        id: DATA.length + 1,
        ...body,
        createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
        success: true,
        message: 'Data created successfully',
        data: newData,
    }, { status: 201 });
}
