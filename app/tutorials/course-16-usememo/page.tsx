'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-16] useMemo 效能優化
 * 
 * 目標：
 * 1. 理解當組件 Re-render 時，函數內部的一般代碼都會重跑一遍。
 * 2. 學習如何用 `useMemo` 來 "Cache" (快取) 昂貴的計算結果。
 * 3. 理解 Dependency Array 的作用。
 */

// 模擬昂貴計算函數
// 這裡用一個空迴圈模擬 CPU 密集運算
function extensiveCalculation(num: number): number {
    console.log('[Expensive] Calculating...');
    const start = performance.now();

    // 模擬一些負載 (Loop 1000萬次)
    // 注意：在真實專案中不要這樣寫死迴圈，這裡只是為了 Demo
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
        result += 1;
    }

    const end = performance.now();
    console.log(`[Expensive] Done in ${(end - start).toFixed(2)}ms`);

    return num * 2;
}

export default function Course16UseMemo() {
    const [count, setCount] = useState(1);
    const [darkTheme, setDarkTheme] = useState(false);

    // [Case 1] 沒有使用 useMemo (Slow)
    // 每次這個組件 Render (例如切換 Dark Mode 時)，這一行都會執行。
    // const doubledNumber = extensiveCalculation(count);

    // [Case 2] 使用 useMemo (Fast)
    // [教學重點] 只有當 `count` 改變時，React 才會重新執行這個函數。
    // 如果只是切換 darkTheme，`count` 沒變，React 就直接回傳上次存的結果。
    const doubledNumber = useMemo(() => {
        return extensiveCalculation(count);
    }, [count]); // <--- 依賴陣列

    // 樣式切換
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#FFF',
        color: darkTheme ? '#FFF' : '#333',
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 16] useMemo 計算快取</h1>
                <p className="text-muted-foreground">避免在每次渲染時都執行昂貴的計算。</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Expensive Calculation Demo</CardTitle>
                    <CardDescription>
                        請打開 Console。你會發現當使用了 useMemo 後，只有調整數字會觸發計算，切換與之無關的主題則不會。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                    {/* 控制區 1: 觸發計算的 State */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-semibold">Input Number: {count}</span>
                            <Badge variant="outline">Result: {doubledNumber}</Badge>
                        </div>
                        <Slider
                            value={[count]}
                            onValueChange={(vals) => setCount(vals[0])}
                            max={100}
                            step={1}
                        />
                        <p className="text-xs text-muted-foreground">
                            拖動滑桿 -&gt; <code>count</code> 變了 -&gt; 觸發重算 (Console 出現 Log)
                        </p>
                    </div>

                    <hr />

                    {/* 控制區 2: 無關的 State */}
                    <div className="p-4 rounded border transition-colors duration-300" style={themeStyles}>
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Unrelated State (Theme)</span>
                            <Button
                                onClick={() => setDarkTheme(prev => !prev)}
                                variant={darkTheme ? "secondary" : "default"}
                            >
                                Toggle Theme
                            </Button>
                        </div>
                        <p className="text-xs mt-2 opacity-80">
                            切換這裡 -&gt; <code>darkTheme</code> 變了 -&gt; 組件 Re-render。<br />
                            如果沒有 useMemo，上方昂貴計算會再次執行 (浪費效能)。<br />
                            有了 useMemo，這裡切換時 <strong>不會</strong> 看到 "[Expensive] Calculating..."。
                        </p>
                    </div>

                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Syntax</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`const cachedValue = useMemo(() => {
  return expensiveFunction(a, b);
}, [a, b]); // 只有 a 或 b 改變時才重算`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
