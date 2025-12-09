'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-05] useRef DOM 操作與變數
 * 
 * 目標：
 * 1. 理解 useRef 可以用來存儲 "不會觸發 Re-render" 的數據 (Mutable Variable)。
 * 2. 理解 useRef 常用於直接操作 DOM 元素 (如 focus, scroll)。
 * 3. 區分 useState (觸發渲染) 與 useRef (不觸發渲染) 的使用時機。
 */

export default function Course05Refs() {
    const [inputValue, setInputValue] = useState('');

    // [教學重點] Create a Ref
    // inputRef.current 初始值為 null。
    // 當這被綁定到 <Input ref={inputRef}> 後，current 就會指向該 DOM 節點。
    const inputRef = useRef<HTMLInputElement>(null);

    // [教學重點] 使用 ref 來記錄渲染次數
    // 為什麼不用 useState？因為如果用 useState 更新次數，會再次觸發渲染 -> 更新次數 -> 無限迴圈。
    // ref.current 的改變 "不會" 通知 React 重新繪製。
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        console.log(`Render Count: ${renderCount.current}`);
    });

    const handleFocus = () => {
        // [教學重點] 直接操作 DOM API
        // 這裡我們繞過了 React 的聲明式寫法，直接呼叫瀏覽器原生的 .focus() 方法。
        if (inputRef.current) {
            inputRef.current.focus();
            // 甚至可以改變樣式 (盡量少用，除非必要)
            inputRef.current.style.backgroundColor = '#fdf2f8'; // light pink
            setTimeout(() => {
                if (inputRef.current) inputRef.current.style.backgroundColor = '';
            }, 500);
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 05] useRef 引用與變數</h1>
                <p className="text-muted-foreground">有些時候，我們需要 "跳出" React 的資料流，直接控制 DOM 或保存數據。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* 用例 1: DOM 存取 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Use Case 1: Accessing DOM</CardTitle>
                        <CardDescription>點擊按鈕，讓 Input 框自動獲得焦點。</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="focus-input">Target Input</Label>
                            {/* [教學重點] 綁定 ref */}
                            <Input
                                ref={inputRef}
                                id="focus-input"
                                placeholder="I am the target..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>

                        <Button onClick={handleFocus} variant="secondary" className="w-full">
                            Focus Input Programmatically
                        </Button>
                    </CardContent>
                </Card>

                {/* 用例 2: 可變變數 (Mutable Variables) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Use Case 2: Render Count</CardTitle>
                        <CardDescription>記錄組件被渲染了幾次 (不觸發新的渲染)。</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-4 min-h-[150px]">
                        <div className="text-muted-foreground text-sm">
                            試著在左側 Input 打字，觸發 State 更新 (Re-render)。
                        </div>

                        <div className="text-4xl font-mono font-bold text-primary">
                            {/* 注意：在 JSX 直接顯示 ref.current 其實不太好，因為它不會隨 ref 改變而即時更新畫面。
                  但因為這邊有 inputValue 的 state update 帶動畫面更新，所以看得到數字跳動。 */}
                            {renderCount.current}
                        </div>
                        <Badge variant="outline">Render Count</Badge>
                    </CardContent>
                    <CardFooter className="bg-muted/50 text-xs text-muted-foreground p-4">
                        <p>
                            觀念澄清：改變 Ref 不會觸發 Re-render。這裡之所以數字會變，是因為 Input 的 onChange 觸發了 useState (Re-render)，順便把新的 Ref 值畫出來了。
                        </p>
                    </CardFooter>
                </Card>
            </div>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Code Snippets</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 1. 定義 Ref
const inputRef = useRef(null);

// 2. 綁定到 JSX
<input ref={inputRef} />

// 3. 操作 DOM
const focusInput = () => {
  inputRef.current.focus();
};`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
