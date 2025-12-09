'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

/**
 * [Course-22] Dynamic Route Handlers Client Demo
 * 
 * 測試前端如何與動態 API `api/course-22-products/[id]` 互動。
 * 展示不同 HTTP Method (GET, PATCH, DELETE) 的呼叫。
 */

export default function Course22DynamicApi() {
    const [targetId, setTargetId] = useState('1');
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // 通用 Fetch Wrapper
    const callApi = async (method: string, body?: any) => {
        setLoading(true);
        setResponse(null);
        try {
            const res = await fetch(`/api/course-22-products/${targetId}`, {
                method,
                headers: body ? { 'Content-Type': 'application/json' } : undefined,
                body: body ? JSON.stringify(body) : undefined,
            });

            // 即使 404/500 也會回傳 JSON，所以這裡一併讀取
            const json = await res.json();
            setResponse({ status: res.status, ...json });
        } catch (error) {
            console.error(error);
            setResponse({ error: 'Fetch failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 22] Dynamic API Routes</h1>
                <p className="text-muted-foreground">
                    測試後端動態路由 <code>/api/course-22-products/[id]</code>
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* 控制面板 */}
                <Card>
                    <CardHeader>
                        <CardTitle>API Tester</CardTitle>
                        <CardDescription>Select ID and Method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Target Product ID</label>
                            <div className="flex gap-2">
                                {['1', '2', '3', '99'].map(id => (
                                    <Button
                                        key={id}
                                        variant={targetId === id ? 'default' : 'outline'}
                                        onClick={() => setTargetId(id)}
                                        size="sm"
                                    >
                                        ID: {id}
                                    </Button>
                                ))}
                            </div>
                            <Input
                                value={targetId}
                                onChange={e => setTargetId(e.target.value)}
                                placeholder="Custom ID"
                                className="mt-2"
                            />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Actions</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button onClick={() => callApi('GET')} disabled={loading}>
                                    GET (Read)
                                </Button>

                                <Button
                                    onClick={() => callApi('PATCH', { price: Math.floor(Math.random() * 1000) })}
                                    variant="secondary"
                                    disabled={loading}
                                >
                                    PATCH (Random Price)
                                </Button>

                                <Button
                                    onClick={() => callApi('DELETE')}
                                    variant="destructive"
                                    disabled={loading}
                                >
                                    DELETE
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* 結果顯示 */}
                <Card className="bg-slate-950 text-slate-50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Response</CardTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant={loading ? "secondary" : "outline"} className="text-xs">
                                {loading ? 'Fetching...' : 'Idle'}
                            </Badge>
                            {response?.status && (
                                <Badge variant={response.status === 200 ? 'default' : 'destructive'} className={response.status === 200 ? 'bg-green-600' : ''}>
                                    Status: {response.status}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <pre className="font-mono text-xs overflow-auto max-h-[300px] text-green-400">
                            {response ? JSON.stringify(response, null, 2) : '// Waiting for request...'}
                        </pre>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
