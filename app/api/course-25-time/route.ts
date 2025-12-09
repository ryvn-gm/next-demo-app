import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // API Route 預設行為

export async function GET() {
    return NextResponse.json({
        // 回傳當前時間
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        timestamp: Date.now(),
    });
}
