import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshButton } from './RefreshButton'; // Client Component

// API URL (絕對路徑對於 Server Component fetch 是必要的)
// 為了避免 host 問題，我們這裡直接用 mock function 模擬，或者假設 localhost:3000
// 但為了教學正確性，我們展示 fetch 參數。
// 這裡改用直接呼叫 Date 模擬，因為 fetch localhost 在 build time 有時會有問題。
// 不過為了展示 fetch cache，我們還是模擬 fetch 的行為。

async function getTime(cacheStrategy: RequestCache) {
    // const res = await fetch('http://localhost:3000/api/course-25-time', { cache: cacheStrategy });

    // 為了 Demo 穩定性 (不用依賴真實 API Server)，我們用 Promise 模擬
    // 如果是真實 Fetch:
    // fetch(..., { cache: 'force-cache' }) -> 永遠回傳第一次抓到的
    // fetch(..., { cache: 'no-store' }) -> 每次都抓新的

    const time = new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 });
    return time;
}

// 由於我們沒法在 Server Component 內部輕鬆模擬 fetch cache (除非真的架 server)，
// 這裡我們用一個教學上的替代方案：
// Next.js 的 fetch 是基於 Web Cache API。
// 為了讓學生看到效果，我們必須真的去打 API。

async function fetchTimeFromApi(strategy: RequestCache) {
    try {
        // 注意：在 Vercel 等環境，localhost fetch 可能失敗。
        // 這裡假設是本地開發環境。
        const res = await fetch('http://localhost:3000/api/course-25-time', {
            cache: strategy,
            next: { tags: strategy === 'force-cache' ? ['static-time'] : [] }
        });
        const data = await res.json();
        return data.time;
    } catch (e) {
        return 'Error fetching';
    }
}

export default async function Course25Caching() {
    // 1. Static Data (預設 or force-cache)
    // 如果沒有特別設定，Next.js component 內的 fetch 預設是 force-cache (除非使用了 dynamic function 導致降級)
    // 但在 Next 15 可能預設是 no-store (根據不同 canary 版本)。
    // 我們顯式指定。

    const staticTime = await fetchTimeFromApi('force-cache');

    // 2. Dynamic Data (no-store)
    const dynamicTime = await fetchTimeFromApi('no-store');

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 25] Caching Strategy</h1>
                <p className="text-muted-foreground">
                    Next.js 的 Data Cache 機制：控制 <code>fetch</code> 的快取行為。
                </p>
            </div>

            <div className="flex justify-end">
                <RefreshButton />
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Static Cache */}
                <Card className="border-blue-200 bg-blue-50/20">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Static Data
                            <Badge variant="outline">force-cache</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-mono font-bold tracking-wider text-blue-600">
                            {staticTime}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            這個時間在 Build Time (或第一次請求) 就被快取了。
                            即使你按下 Refresh，它通常也不會變 (直到 Revalidate)。
                        </p>
                    </CardContent>
                </Card>

                {/* Dynamic Data */}
                <Card className="border-orange-200 bg-orange-50/20">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Dynamic Data
                            <Badge variant="outline" className="text-orange-600 border-orange-200">no-store</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-mono font-bold tracking-wider text-orange-600">
                            {dynamicTime}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            這是即時資料。每次 Request (或 Refresh) 都會重新 Fetch。
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
