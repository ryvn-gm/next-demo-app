'use client'; // 必須是 Client Component 才能使用 usePathname, useSearchParams

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * [Course-09] Navigation & Link
 * 
 * 目標：
 * 1. 學習使用 `<Link>` 組件進行 Client-side Navigation (不刷新頁面)。
 * 2. 學習 `usePathname` 取得當前路徑。
 * 3. 學習 `useSearchParams` 取得 Query String (網址參數)。
 */

const NAV_ITEMS = [
    { label: 'Home', path: '/tutorials/course-09-navigation' },
    { label: 'Sort A-Z', path: '/tutorials/course-09-navigation?sort=asc' },
    { label: 'Sort Z-A', path: '/tutorials/course-09-navigation?sort=desc' },
    { label: 'External', path: 'https://nextjs.org', isExternal: true },
];

function NavigationContent() {
    // [教學重點] 取得當前路徑 (例如: /tutorials/course-09-navigation)
    const pathname = usePathname();

    // [教學重點] 取得 Query Params (例如: ?sort=asc)
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort');

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 09] Navigation 導航</h1>
                <p className="text-muted-foreground">Next.js 提供了高性能的客戶端導航機制。</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Navigation Bar Demo</CardTitle>
                    <CardDescription>
                        觀察點擊不同按鈕時，瀏覽器是否刷新？(提示：Link 不會刷新，a 標籤會刷新)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* 模擬導航列 */}
                    <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg border">
                        {NAV_ITEMS.map((item) => {
                            // 判斷是否為「當前活躍」狀態 (Active State)
                            // 注意：這裡簡單判斷 pathname 是否相等，或是 query param 對上
                            let isActive = false;
                            if (item.path.includes('?')) {
                                const itemSort = item.path.split('=')[1];
                                isActive = currentSort === itemSort;
                            } else if (!item.isExternal) {
                                // 如果沒有 query param，且當前也沒有 sort param，則視為首頁 active
                                isActive = pathname === item.path && !currentSort;
                            }

                            return (
                                <Button
                                    key={item.label}
                                    variant={isActive ? "default" : "outline"}
                                    asChild
                                >
                                    {/* [教學重點] 外部連結建議用 <a>，內部路由必用 <Link> */}
                                    {item.isExternal ? (
                                        <a href={item.path} target="_blank" rel="noopener noreferrer">
                                            {item.label} ↗
                                        </a>
                                    ) : (
                                        <Link href={item.path}>
                                            {item.label}
                                        </Link>
                                    )}
                                </Button>
                            );
                        })}
                    </div>

                    {/* 顯示當前路由資訊 */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 rounded border bg-slate-50">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Pathname</span>
                            <div className="text-lg font-mono font-bold mt-1 text-primary">
                                {pathname}
                            </div>
                        </div>

                        <div className="p-4 rounded border bg-slate-50">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Sort Param</span>
                            <div className="text-lg font-mono font-bold mt-1 text-primary">
                                {currentSort || '(none)'}
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Hooks</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`import { usePathname, useSearchParams } from 'next/navigation';

// 1. 取得路徑
const pathname = usePathname(); // e.g. "/blog"

// 2. 取得參數
const searchParams = useSearchParams();
const sort = searchParams.get('sort'); // e.g. "asc"`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}

export default function Course09Navigation() {
    return (
        <Suspense fallback={<div>Loading navigation...</div>}>
            <NavigationContent />
        </Suspense>
    );
}
