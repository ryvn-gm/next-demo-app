'use client';

import React, { useState, useCallback, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-17] useCallback 函數記憶化
 * 
 * 目標：
 * 1. 理解 "Referential Equality" (傳址相等性)。
 *    - 在 JS 中，每次 function Component 執行，定義在內部的 `const fn = () => {}` 都是一個 "新的物件"。
 * 2. 理解這會導致 `React.memo` 失效 (因為新舊函數位址不同，props 視為改變)。
 * 3. 學習 `useCallback` 如何鎖定函數的記憶體位址。
 */

// 子組件 (必須被 memo 包裹，否則 props 變不變都會 render)
// 這裡接收一個函數 props: `onClick`
const ChildButton = memo(({ onClick, label }: { onClick: () => void, label: string }) => {
    console.log(`[Child Render] Button "${label}" rendered!`);

    return (
        <Button onClick={onClick} variant="secondary" className="w-full">
            {label} (Check Console)
        </Button>
    );
});

// 為了讓 ESLint 不會報錯，加上 displayName
ChildButton.displayName = 'ChildButton';

export default function Course17UseCallback() {
    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(false);

    // [Case 1] 沒有使用 useCallback
    // 每次父組件 Re-render (例如 toggle 變了)，這個函數都會被重新創建 (New Reference)。
    // 導致 ChildButton 發現 props.onClick 變了 -> 觸發 Re-render。
    const handleIncrementNormal = () => {
        setCount(c => c + 1);
    };

    // [Case 2] 使用 useCallback
    // 只要依賴陣列 [] 沒變，這個函數的記憶體位址就 "永遠不會變"。
    // ChildButton 發現 props.onClick 沒變 -> 跳過 Re-render。
    const handleIncrementCallback = useCallback(() => {
        setCount(c => c + 1);
    }, []); // Empty dependency: 永遠不變

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 17] useCallback</h1>
                <p className="text-muted-foreground">維持函數的 "傳址恆定"，避免破壞子組件的 memo 優化。</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Function Stability Demo</CardTitle>
                    <CardDescription>
                        點擊 Toggle 按鈕觸發父組件 Render，觀察下方兩個子按鈕是否跟著 Render。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                    {/* 父組件控制區 */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded border">
                        <div className="space-y-1">
                            <div className="font-bold">Parent Count: {count}</div>
                            <div className="text-xs text-muted-foreground">Toggle State: {toggle.toString()}</div>
                        </div>

                        <Button onClick={() => setToggle(prev => !prev)}>
                            Click Parent (Trigger Re-render)
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* 左側：無優化 */}
                        <div className="space-y-2 border p-4 rounded bg-red-50/50 border-red-100">
                            <Badge variant="destructive">Without useCallback</Badge>
                            <p className="text-xs text-muted-foreground min-h-[40px]">
                                傳入普通函數。父組件 Render 時，函數位址改變，導致子組件也 Render。
                            </p>

                            <ChildButton
                                label="Normal Button"
                                onClick={handleIncrementNormal}
                            />
                        </div>

                        {/* 右側：有優化 */}
                        <div className="space-y-2 border p-4 rounded bg-green-50/50 border-green-100">
                            <Badge className="bg-green-600">With useCallback</Badge>
                            <p className="text-xs text-muted-foreground min-h-[40px]">
                                傳入 Cached 函數。父組件 Render 時，函數位址不變，子組件 <strong>不</strong> Render。
                            </p>

                            <ChildButton
                                label="Callback Button"
                                onClick={handleIncrementCallback}
                            />
                        </div>

                    </div>

                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Concept: Referential Equality</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 每次 Render 都是新的 (不同的記憶體位址)
const fn1 = () => {}; 
const fn2 = () => {}; 
console.log(fn1 === fn2); // false

// 使用 useCallback 保持位址不變 (直到依賴改變)
const memoFn = useCallback(() => {}, []);`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
