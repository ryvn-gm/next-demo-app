import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InteractiveCounter } from './InteractiveCounter';

/**
 * [Course-10] Server vs Client Components
 * 
 * 目標：
 * 1. 理解 App Router 中預設所有頁面都是 Server Component。
 * 2. 學習 Server Component 的優勢 (直接存取資料庫、不增加 Bundle Size、SEO)。
 * 3. 學習如何混合使用 (Pattern: Server Page 引入 Client Component)。
 */

export default function Course10ServerVsClient() {
    // [教學重點] 這是一個 Server Component
    // 1. 我們不能在這裡使用 useState, useEffect。
    // 2. 我們可以使用 async/await 讀取資料庫。
    // 3. 這裡的 console.log 只會在 "伺服器終端機" 顯示，瀏覽器 Console 看不到。

    console.log('[Server] Course 10 page rendered on server.');

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 10] Server vs Client Components</h1>
                <p className="text-muted-foreground">
                    Next.js 13+ 的核心架構：預設在伺服器渲染，只有需要互動時才切換到客戶端。
                </p>
            </div>

            <div className="grid gap-6">

                {/* Server Component 區域 */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                        <CardTitle className="text-green-700">Server Component (Parent)</CardTitle>
                        <CardDescription>
                            這個頁面本身 (page.tsx) 是 Server Component。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            Server Component 的代碼 <strong>不會</strong> 被傳送到瀏覽器 (Zero Bundle Size)。
                            適合用來呈現靜態內容、讀取資料庫、保護敏感資訊 (API Keys)。
                        </p>
                        <div className="bg-slate-100 p-4 rounded text-sm font-mono">
                            console.log("Hello from Server"); // Only visible in terminal
                        </div>
                    </CardContent>
                </Card>

                {/* Client Component 區域 (引入使用) */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                        <CardTitle className="text-blue-600">Client Component (Child)</CardTitle>
                        <CardDescription>
                            下面這個計數器是透過引入 <code>&lt;InteractiveCounter /&gt;</code> 載入的。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* [教學重點] 在 Server Component 中使用 Client Component */}
                        <InteractiveCounter />
                    </CardContent>
                </Card>

            </div>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">When to use what?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                        <li>
                            <strong className="text-white">Server Component:</strong> 讀取資料、敏感邏輯、SEO 內容 (Default).
                        </li>
                        <li>
                            <strong className="text-white">Client Component:</strong> <code>useState</code>, <code>useEffect</code>, <code>onClick</code> 事件, 瀏覽器 API (window/localStorage).
                        </li>
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
}
