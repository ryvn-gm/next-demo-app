'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCcw } from 'lucide-react'; // 假設 lucide-react 已安裝 (shadcn 預設依賴)

/**
 * [Course-02] useEffect 副作用處理
 * 
 * 目標：
 * 1. 理解 useEffect 執行時機 (Render 後)。
 * 2. 理解 Dependency Array (依賴陣列) 如何控制執行頻率。
 * 3. 理解 Cleanup Function (清除函數) 的重要性。
 */

export default function Course02UseEffect() {
    // 模擬 API 回傳的資料型別
    type UserData = {
        id: number;
        name: string;
        email: string;
        timestamp: string;
    };

    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);

    // [教學重點] 用這個 state 來觸發 useEffect 重新執行
    // 只要這個值改變，因為它在 useEffect 的依賴陣列中，useEffect 就會再次跑起來。
    const [refreshId, setRefreshId] = useState(0);

    // [教學重點] useEffect
    // 參數 1: 執行的函數 (Effect)
    // 參數 2: 依賴陣列 (Dependency Array)
    useEffect(() => {
        // 1. 設置 Loading 狀態
        setLoading(true);
        console.log(`[Effect Start] Fetching data for ID: ${refreshId}`);
    
        // [觀念講解] 模擬異步 API 請求
        const timer = setTimeout(() => {
            const mockData: UserData = {
                id: refreshId,
                name: `User-${Math.floor(Math.random() * 1000)}`,
                email: `user${Math.floor(Math.random() * 1000)}@example.com`,
                timestamp: new Date().toLocaleTimeString(),
            };

            setData(mockData);
            setLoading(false);
            console.log('[Effect Done] Data received');
        }, 1500); // 1.5秒延遲

        // [教學重點] Cleanup Function (清除函數)
        // 當組件 Unmount (卸載) 或 依賴改變導致 Effect 重新執行 "前"，會先執行這裡。
        // 用途：清除計時器、取消訂閱、還原副作用，防止 Memory Leak。
        return () => {
            console.log('[Cleanup] Clearing timer');
            clearTimeout(timer);
        };

    }, [refreshId]); // [教學重點] 依賴陣列：只有當 `refreshId` 改變時，這個 Effect 才會重新執行。
    // 如果是空陣列 []，則只會執行一次 (Mount 時)。

    const handleRefresh = () => {
        setRefreshId((prev) => prev + 1);
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 02] useEffect 副作用</h1>
                <p className="text-muted-foreground">處理 API 請求、訂閱、計時器等 "Side Effects" 的地方。</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>模擬 API 請求 (Data Fetching)</CardTitle>
                    <CardDescription>
                        觀察 Console Log 可以看到 Effect 的執行順序 (Effect Start -&gt; Cleanup -&gt; Effect Done)。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* 資料顯示區 */}
                    <div className="border rounded-md p-6 min-h-[160px] flex flex-col justify-center items-center bg-slate-50/50 relative overflow-hidden">
                        {loading ? (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span>Loading user data...</span>
                            </div>
                        ) : data ? (
                            <div className="w-full space-y-2 animate-in fade-in zoom-in duration-300">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">User Profile</span>
                                    <Badge variant="outline">ID: {data.id}</Badge>
                                </div>
                                <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                                    <span className="text-muted-foreground">Name:</span>
                                    <span className="font-medium">{data.name}</span>

                                    <span className="text-muted-foreground">Email:</span>
                                    <span className="font-medium">{data.email}</span>

                                    <span className="text-muted-foreground">Fetched:</span>
                                    <span className="font-mono text-xs bg-slate-100 px-1 rounded">{data.timestamp}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-muted-foreground">No data loaded yet.</div>
                        )}

                        {/* [視覺效果] 顯示當前狀態 */}
                        <div className="absolute top-2 right-2">
                            <Badge variant={loading ? "secondary" : "default"}>
                                {loading ? "Fetching..." : "Idle"}
                            </Badge>
                        </div>
                    </div>

                    <Button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                重整資料 (Update Dependence)
                            </>
                        )}
                    </Button>

                </CardContent>
                <CardFooter className="bg-muted/50 text-xs text-muted-foreground p-4">
                    <p>
                        提示：在這個範例中，我們把 `refreshId` 放進 Dependency Array。
                        每次點擊按鈕，`refreshId` 改變，React 就知道 "該重新執行 useEffect 了"。
                    </p>
                </CardFooter>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Code Snippets</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`useEffect(() => {
  setLoading(true);
  
  // 1. 執行異步任務
  const timer = setTimeout(() => {
    fetchData(); 
  }, 1000);

  // 2. 清除函數 (Cleanup) - 在組件卸載或下次執行前跑
  return () => clearTimeout(timer);

}, [refreshId]); // 3. 依賴陣列 - refreshId 變了才跑`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
