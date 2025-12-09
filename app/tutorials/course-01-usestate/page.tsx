'use client'; // [教學重點] 這一行標記此組件為 Client Component。因為我們使用了 useState，這屬於瀏覽器端的交互行為，所以必須在客戶端執行。

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-01] useState 基礎教學
 * 
 * 目標：
 * 1. 理解 useState 的基本語法與用途。
 * 2. 理解 State 改變會觸發組件重新渲染 (Re-render)。
 * 3. 理解 setState 是異步的觀念。
 */

export default function Course01UseState() {
    // [觀念講解]
    // useState 回傳一個陣列：[當前的狀態值, 更新狀態的函數]
    // count: 變數名稱 (Read-only)
    // setCount: 用來更新變數的函數。注意：直接修改 count (count = count + 1) 是無效的，React 不會知道數據變了。
    const [count, setCount] = useState(0);

    // [觀念講解] 開關狀態，布林值
    const [isOn, setIsOn] = useState(false);

    // [教學重點] 為什麼這裡要用箭頭函數？
    // 這樣通常比較乾淨，且不會有 `this` 的問題（雖然在 Function Component 中本來就很少用 this）。
    const handleIncrement = () => {
        // [教學重點] setCount 是 "異步" 的 (Asynchronous-like)
        // React 為了效能，會把多次 State 更新 "批次處理" (Batching)。
        // 所以如果在同一段代碼中 console.log(count)，會印出 "舊的" 值。
        // setCount(count + 1);
        setCount((prev) => prev + 1)
        // setCount((prev) => prev + 1);
        console.log('Current count (in handler):', count); // 這裡依然會是舊的值
    };

    const handleToggle = () => {
        // [教學重點] 使用前一個狀態來更新 (Functional Update)
        // 這是更安全的寫法，確保我們是基於 "最新的" prev 值去做反轉。
        setIsOn((prev) => !prev);
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">

            {/* 標題區 */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 01] useState 狀態管理</h1>
                <p className="text-muted-foreground">React 最核心的 Hook，讓組件擁有 "記憶" 能力。</p>
            </div>

            {/* 1. 觀念講解區 */}
            <Card>
                <CardHeader>
                    <CardTitle>核心觀念</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed">
                    <p>
                        在 React 中，我們不使用普通變數 (例如 <code className="bg-muted px-1 rounded">let count = 0</code>) 來控制畫面顯示。
                        因為 React 需要知道數據何時改變，以便觸發 <strong>Re-render (重新繪製)</strong>。
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>State (狀態)</strong>：是組件內部的數據，當它改變時，畫面會自動更新。</li>
                        <li><strong>setFunction</strong>：這是唯一能修改 State 的方式。</li>
                        <li><strong>Client Component</strong>：因為涉及使用者互動 (Click)，此頁面必須是 Client Component (檔案頂部有聲明)。</li>
                    </ul>
                </CardContent>
            </Card>

            {/* 2. 互動演示區 - 計數器 */}
            <Card>
                <CardHeader>
                    <CardTitle>Demo 1 Summary: 計數器 (Counter)</CardTitle>
                    <CardDescription>點擊按鈕，觀察數字變化。</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                    <div className="text-6xl font-mono font-bold w-24 text-center">
                        {count}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button onClick={handleIncrement} size="lg">
                            增加數字 (Count + 1)
                        </Button>
                        <Button variant="outline" onClick={() => setCount(0)}>
                            重置 (Reset)
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 3. 互動演示區 - 開關 (Toggle) */}
            <Card>
                <CardHeader>
                    <CardTitle>Demo 2: 開關 (Toggle)</CardTitle>
                    <CardDescription>條件渲染 (Conditional Rendering) 的基礎。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        {/* [觀念講解] 根據 isOn 的狀態，動態決定顯示的樣式或文字 */}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${isOn ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]' : 'bg-slate-200'}`}>
                            {isOn ? 'ON' : 'OFF'}
                        </div>

                        <Button
                            onClick={handleToggle}
                            variant={isOn ? "default" : "secondary"}
                        >
                            切換燈光 (Toggle)
                        </Button>
                    </div>

                    <div className="bg-muted p-4 rounded-md">
                        <p className="text-sm font-mono text-muted-foreground">
                            Current State: <Badge variant={isOn ? "default" : "secondary"}>{isOn.toString()}</Badge>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* 4. 代碼重點區 */}
            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Code Snippets</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 1. 定義 State
const [count, setCount] = useState(0);

// 2. 更新 State (觸發 Re-render)
const handleIncrement = () => {
  setCount(count + 1);
};

// 3. 在 JSX 中使用
<div>{count}</div>
<button onClick={handleIncrement}>Add</button>`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
