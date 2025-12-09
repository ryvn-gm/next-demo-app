'use client'; // 為了方便 demo 互動觸發錯誤，這裡使用 Client Component

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

/**
 * [Course-13] Error Handling
 * 
 * 目標：
 * 1. 演示如何觸發 Error Boundary。
 */

export default function Course13Error() {
    const [shouldError, setShouldError] = useState(false);

    // [教學重點] 渲染時拋出錯誤
    if (shouldError) {
        throw new Error('This is a simulated error! (這是模擬的錯誤)');
    }

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 13] Error Handling</h1>
                <p className="text-muted-foreground">Next.js 提供了優雅的錯誤處理機制，不會讓整個 App 崩潰。</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Error Simulation</CardTitle>
                    <CardDescription>
                        點擊下方按鈕來觸發一個 Runtime Error。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                        <div className="text-sm">
                            <p className="font-bold">警告：</p>
                            <p>
                                點擊後，這個組件會拋出錯誤 (<code>throw new Error</code>)。
                                因為有 <code>error.tsx</code> 存在，你會看到一個紅色的錯誤畫面，而不是全白畫面 (White Screen of Death)。
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => setShouldError(true)}
                        className="w-full sm:w-auto"
                    >
                        Trigger Error Now
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
