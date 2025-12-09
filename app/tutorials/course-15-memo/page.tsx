'use client';

import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-15] React.memo 組件記憶化
 * 
 * 目標：
 * 1. 理解 React 預設行為：當父組件 Re-render，"所有" 子組件都會 Re-render (不管 Props 有沒有變)。
 * 2. 學習 `React.memo` 如何透過 Shallow Compare (淺層比對) Props 來阻止不必要的渲染。
 * 3. 理解 "Referential Equality" (傳址相等性) 的重要性。
 */

// ----------------------------------------------------------------------------
// 子組件 (未優化)
// ----------------------------------------------------------------------------
function SlowComponent({ name }: { name: string }) {
    // [教學重點] 為了模擬 "昂貴" 的渲染，我們這裡可以塞一點延遲 (但為了不卡死瀏覽器，我們用 log 代表)
    const startTime = performance.now();
    while (performance.now() - startTime < 0) {
        // 這裡不做實際延遲，避免 DEMO 卡頓，主要看 Console Log
    }

    console.log(`[Re-render] ${name} rendered!`); // 打開 Console 觀察這裡

    return (
        <div className="p-4 border rounded bg-slate-50 dark:bg-slate-800">
            <p className="text-sm font-medium">I am {name}</p>
            <p className="text-xs text-muted-foreground mt-1">Check Console Log!</p>
        </div>
    );
}

// ----------------------------------------------------------------------------
// 子組件 (已優化 - 使用 memo)
// ----------------------------------------------------------------------------
// [教學重點] React.memo
// 它是一個 Higher Order Component (HOC)。
// 它會檢查：如果 Props (舊) === Props (新)，就跳過渲染，直接沿用上一次的結果。
// 這裡用的是 Shallow Compare (淺層比對)：
// - 字串、數字、布林值：比較值是否相等。
// - 物件、陣列、函數：比較 "記憶體位址" (Reference) 是否相等。
const MemoizedSlowComponent = memo(SlowComponent);

// ----------------------------------------------------------------------------
// 父組件 (Page)
// ----------------------------------------------------------------------------
export default function Course15Memo() {
    const [count, setCount] = useState(0);
    const [fixedName] = useState("Static Name"); // 這個 State 不會變

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 15] React.memo</h1>
                <p className="text-muted-foreground">
                    預設情況下，父組件更新 =&gt; 子組件必更新。使用 <code>memo</code> 來改變這個行為。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Rendering Behavior Demo</CardTitle>
                    <CardDescription>
                        請打開瀏覽器的 <strong>Console (F12)</strong> 觀察 Log。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded border">
                        <span className="font-bold text-xl">Parent State: {count}</span>
                        <Button onClick={() => setCount(c => c + 1)}>
                            Click me to Re-render Parent
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* 左邊：一般組件 */}
                        <div className="space-y-2">
                            <Badge variant="destructive">Normal Component</Badge>
                            <SlowComponent name="Normal Child" />
                            <p className="text-xs text-red-600">
                                每次點擊按鈕，這個組件都會 Re-render。<br />
                                (因為父組件 Render 導致它也 Render)
                            </p>
                        </div>

                        {/* 右邊：Memo 組件 */}
                        <div className="space-y-2">
                            <Badge variant="default" className="bg-green-600">Memoized Component</Badge>
                            {/* 
                 [教學重點] 
                 這裡傳入的 name 是 "Static Name"，是不變的字串。
                 雖然父組件 Re-render 了，但 MemoizedSlowComponent 發現 props.name 沒變，
                 所以它選擇 "不" 執行內容代碼，直接用上次的 HTML。
              */}
                            <MemoizedSlowComponent name="Memo Child" />
                            <p className="text-xs text-green-600">
                                點擊按鈕，這個組件 <strong>不會</strong> Re-render。<br />
                                (因為 Props 沒變，memo 擋下來了)
                            </p>
                        </div>
                    </div>

                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Concept: Shallow Compare</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 1. 一般組件
function MyComponent() {} 
// 父更新 -> 子一定更新

// 2. Memo 組件
const Memoized = React.memo(MyComponent);
// 父更新 -> 檢查 (prevProps === nextProps) ? 不更新 : 更新`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
