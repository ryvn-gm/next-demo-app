'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-20] Route Handlers (API Endpoints)
 * 
 * 目標：
 * 1. 學習如何建立後端 API (`app/api/.../route.ts`)。
 * 2. 學習如何在前端 Fetch 這些 API。
 * 3. 區分 Server Actions 與 Route Handlers 的使用時機。
 */

export default function Course20RouteHandlers() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // 呼叫 GET API
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/course-20-data');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 呼叫 POST API
    const createData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/course-20-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'New Item', price: 999 }),
            });
            const json = await res.json();
            alert(`Server Response: ${json.message}`);
            // 這裡可以選擇把新資料合併到顯示中
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 20] Route Handlers API</h1>
                <p className="text-muted-foreground">
                    標準的 REST API 端點，適用於 Webhooks、Mobile App 接口或第三方整合。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Client-side Fetching</CardTitle>
                    <CardDescription>
                        點擊按鈕來請求 <code>/api/course-20-data</code>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Button onClick={fetchData} disabled={loading}>
                            GET Data
                        </Button>
                        <Button onClick={createData} variant="outline" disabled={loading}>
                            POST Data
                        </Button>
                    </div>

                    <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-auto min-h-[150px]">
                        {loading ? 'Requesting...' : (data ? JSON.stringify(data, null, 2) : '// No data yet')}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Server Actions vs Route Handlers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div>
                        <Badge className="bg-blue-600 mb-1">Server Actions</Badge>
                        <p>主要與 <strong>React 組件</strong> 綁定，處理 Form 提交、Mutation，與 UI 緊密整合 (RPC 風格)。</p>
                    </div>
                    <div>
                        <Badge className="bg-orange-600 mb-1">Route Handlers (API)</Badge>
                        <p>標準 HTTP Endpoint。當你需要公開 API 給外部使用、或是非 React 客戶端時使用。</p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
