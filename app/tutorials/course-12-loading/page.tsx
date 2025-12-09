import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';

/**
 * [Course-12] Loading & Streaming
 * 
 * 目標：
 * 1. 學習如何使用 `loading.tsx` 建立即時 Loading 狀態。
 * 2. 理解 Next.js 的 Streaming 機制。
 */

// 模擬慢速請求
async function getSlowData() {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 等待 3 秒
    return {
        message: "Data loaded successfully after 3 seconds!",
        timestamp: new Date().toLocaleTimeString(),
    };
}

// 由於使用了 async/await，此頁面在 Promise 完成前不會顯示。
// 但是因為有 `loading.tsx`，所以在等待期間使用者會看到骨架屏。
export default async function Course12Loading() {
    const data = await getSlowData();

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 12] Loading UI & Suspense</h1>
                <p className="text-muted-foreground">
                    你剛剛應該有看到一個骨架屏 (Skeleton)，那是 <code>loading.tsx</code> 的功勞。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Slow Data Loaded</CardTitle>
                    <CardDescription>
                        這個區塊的資料花了 3 秒鐘才準備好。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                        <h3 className="font-bold flex items-center gap-2">
                            ✅ {data.message}
                        </h3>
                        <p className="text-sm mt-1">Fetched at: {data.timestamp}</p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Next.js 使用 React Suspense 技術，將頁面拆分為靜態部分和動態部分。
                        當動態部分還在準備時，先傳送 Loading UI 給瀏覽器，優化了 TTFB (Time To First Byte)。
                    </p>

                    <Button asChild>
                        {/* 這裡使用 Link href 指定到當前頁面，雖然不會真的刷新，但因為它是同一個路由，
                我們可以透過加上隨機 query param 或者使用 router.refresh() 來觸發重新載入。
                為了演示方便，這裡只提供說明。 */}
                        <a href="/tutorials/course-12-loading">
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Reload Page (Trigger Loading Again)
                        </a>
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">File Convention</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`course-12-loading/
  ├── page.tsx      (Async Component, takes 3s)
  └── loading.tsx   (Instant Loading UI)`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
