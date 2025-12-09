'use client'; // [教學重點] error.tsx 必須是 Client Component

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

/**
 * [Course-13] Error UI
 * 
 * 目標：
 * 1. 學習 error.tsx 的用法。
 * 2. 理解 Error Boundary 機制。
 * 3. 使用 reset() 嘗試恢復。
 */

// error.tsx 接收兩個 props:
// error: 錯誤物件
// reset: 一個函數，呼叫後會嘗試重新渲染該 segment (Segment Recovery)。
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    useEffect(() => {
        // 這裡可以用來回報錯誤給 Sentry 或其他監控服務
        console.error('Logged in Error Boundary:', error);
    }, [error]);

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <Card className="border-red-200 bg-red-50">
                <CardHeader>
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-6 w-6" />
                        <CardTitle>Something went wrong!</CardTitle>
                    </div>
                    <CardDescription className="text-red-700">
                        這是一個 Error Boundary 畫面。因為在 page.tsx 發生了未捕獲的錯誤，所以 Next.js 顯示了這個後備 UI。
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-white rounded border border-red-100 text-sm font-mono text-red-600">
                        Error Message: {error.message}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                    <Button onClick={() => reset()} variant="destructive">
                        Try again (Recover)
                    </Button>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Full Page Reload
                    </Button>
                </CardFooter>
            </Card>

            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm text-muted-foreground">
                <p>
                    <strong>原理：</strong>
                    <code>error.tsx</code> 會自動包裹 <code>page.tsx</code>。當子組件拋出錯誤時，會被這個邊界捕獲。
                    點擊 "Try again" 會嘗試重新渲染 <code>page.tsx</code>。如果錯誤已解決 (例如是隨機網路錯誤)，頁面就會恢復正常。
                </p>
            </div>
        </div>
    );
}
