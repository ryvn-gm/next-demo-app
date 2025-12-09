'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-07] Custom Hooks 自定義 Hook
 * 
 * 目標：
 * 1. 理解 Custom Hook 只是 "共用邏輯" 的函數 (Function)。
 * 2. 學習如何將重複的 State + Effect 邏輯抽離出來。
 * 3. 遵守 Hook 命名規則 (use 開頭)。
 */

// ----------------------------------------------------------------------------
// Custom Hook 1: useToggle
// 最常見的簡單 Hook，處理布林值切換。
// ----------------------------------------------------------------------------
function useToggle(initialValue: boolean = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((prev) => !prev);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);

    // 回傳我們想要讓組件使用的東西 (State & Methods)
    return { value, toggle, setTrue, setFalse };
}

// ----------------------------------------------------------------------------
// Custom Hook 2: useWindowSize
// 處理視窗大小改變的監聽 (Event Listener)。
// ----------------------------------------------------------------------------
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // 只有在 Client 端才有 window 物件
        if (typeof window === 'undefined') return;

        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // 初始化執行一次
        handleResize();

        // 監聽 Resize 事件
        window.addEventListener('resize', handleResize);

        // Cleanup: 記得移除監聽器，否則會有 Memory Leak
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

// ----------------------------------------------------------------------------
// 主頁面 (Page)
// ----------------------------------------------------------------------------
export default function Course07CustomHooks() {
    // 1. 使用 useToggle
    const modal = useToggle(false);
    const spoiler = useToggle(true);

    // 2. 使用 useWindowSize
    const { width, height } = useWindowSize();

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 07] Custom Hooks 自定義 Hook</h1>
                <p className="text-muted-foreground">把邏輯 (Logic) 從 UI 中抽離，讓代碼更乾淨、可重用 (Reusable)。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Demo 1: useToggle */}
                <Card>
                    <CardHeader>
                        <CardTitle>Demo 1: useToggle</CardTitle>
                        <CardDescription>
                            一個管理 Switch/Modal 開關邏輯的 Hook。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* 範例 A: 模擬 Modal 控制 */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Modal State:</span>
                                <Badge variant={modal.value ? 'default' : 'secondary'}>
                                    {modal.value ? 'OPEN' : 'CLOSED'}
                                </Badge>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={modal.toggle} variant="outline">Toggle</Button>
                                <Button size="sm" onClick={modal.setTrue} variant="outline">Open</Button>
                                <Button size="sm" onClick={modal.setFalse} variant="outline">Close</Button>
                            </div>
                        </div>

                        <hr className="border-dashed" />

                        {/* 範例 B: 模擬劇透內容 */}
                        <div className="space-y-2">
                            <span className="font-medium">Spoiler Content:</span>
                            <div className="p-3 bg-muted rounded text-sm relative overflow-hidden">
                                <div className={`transition-opacity duration-300 ${spoiler.value ? 'opacity-0 blur-sm select-none' : 'opacity-100'}`}>
                                    Iron Man dies inside the suit in the final battle. (Oops!)
                                </div>

                                {spoiler.value && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button size="sm" variant="ghost" onClick={spoiler.setFalse}>
                                            Click to reveal
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {!spoiler.value && (
                                <Button size="sm" variant="link" onClick={spoiler.setTrue} className="px-0">
                                    Hide again
                                </Button>
                            )}
                        </div>

                    </CardContent>
                </Card>

                {/* Demo 2: useWindowSize */}
                <Card>
                    <CardHeader>
                        <CardTitle>Demo 2: useWindowSize</CardTitle>
                        <CardDescription>
                            封裝了 `window.addEventListener` 的邏輯。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
                        <div className="text-5xl font-mono font-bold text-primary">
                            {width} <span className="text-muted-foreground text-2xl">px</span>
                        </div>
                        <div className="text-muted-foreground text-sm">Window Width</div>

                        <div className="w-full h-2 bg-secondary rounded overflow-hidden">
                            {/* 簡單的視覺化：隨著寬度變化的進度條 (假設最大 1920) */}
                            <div
                                className="h-full bg-primary transition-all duration-100"
                                style={{ width: `${Math.min((width / 1920) * 100, 100)}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

            </div>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Code Snippets</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 定義 Custom Hook
function useToggle(init = false) {
  const [v, setV] = useState(init);
  const toggle = () => setV(p => !p);
  return { value: v, toggle };
}

// 在組件中使用 (可以多次使用，狀態獨立)
const menu = useToggle();
const modal = useToggle();`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
