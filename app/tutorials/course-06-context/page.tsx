'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeProvider, useTheme } from './_components/ThemeProvider'; // 引入剛剛建立的 Provider 和 Hook

/**
 * [Course-06] useContext 全局狀態
 * 
 * 目標：
 * 1. 理解 Context 可以解決 Prop Drilling (層層傳遞) 的問題。
 * 2. 理解 Provider 必須包在組件外層，內層才能讀取到值。
 * 3. 學習如何封裝 Context (createContext + Provider + Custom Hook)。
 */

// ----------------------------------------------------------------------------
// 深層子組件 (Deeply Nested Component)
// ----------------------------------------------------------------------------
function DeepChildComponent() {
    // [教學重點] 直接從 Context 讀取狀態，不需要從 Props 接收！
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
            <h3 className="font-bold text-lg mb-2">我是深層組件 (Deep Component)</h3>
            <p className="text-sm mb-4 opacity-80">
                目前主題是：<span className="font-mono font-bold bg-primary/20 px-1 rounded">{theme}</span>
            </p>
            <p className="text-xs text-muted-foreground mb-4">
                我並沒有透過 Props 接收 theme，而是直接用 <code className="bg-muted px-1 rounded">useTheme()</code> 拿到的。
            </p>
            <Button onClick={toggleTheme} variant={theme === 'dark' ? 'secondary' : 'default'}>
                切換主題 (Toggle Theme)
            </Button>
        </div>
    );
}

// ----------------------------------------------------------------------------
// 中間層組件 (Intermediate Component)
// ----------------------------------------------------------------------------
function IntermediateLayer() {
    return (
        <div className="p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50">
            <p className="text-sm text-muted-foreground mb-2 text-center">
                我是中間層 (Intermediate Layer) — 我不需要傳遞任何 Props 給下面。
                <br />(No Prop Drilling here!)
            </p>
            {/* 這裡並沒有傳任何 props 給 DeepChildComponent */}
            <DeepChildComponent />
        </div>
    );
}

// ----------------------------------------------------------------------------
// 主頁面 (Page)
// ----------------------------------------------------------------------------
export default function Course06Context() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 06] useContext 全局狀態</h1>
                <p className="text-muted-foreground">跨越層級傳遞數據，無需手動一層層搬運 (Prop Drilling)。</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Theme Context Demo</CardTitle>
                    <CardDescription>
                        這個區塊被 <code className="bg-muted px-1 rounded">&lt;ThemeProvider&gt;</code> 包覆，
                        所以內部的所有組件都能存取 Theme Context。
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    {/* [教學重點] 必須用 Provider 包住，裡面的 useTheme 才會生效 */}
                    <ThemeProvider>
                        <IntermediateLayer />
                    </ThemeProvider>

                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Code Snippets</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 1. 建立 Context (通常在單獨檔案)
const ThemeContext = createContext();

// 2. 提供資料 (Provider)
<ThemeContext.Provider value={{ theme, toggle }}>
  <App />
</ThemeContext.Provider>

// 3. 讀取資料 (useContext)
const { theme } = useContext(ThemeContext);`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
