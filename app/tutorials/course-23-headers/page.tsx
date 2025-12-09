import React, { Suspense } from 'react';
import { cookies, headers } from 'next/headers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { setPreference, clearPreference } from '@/actions/course-23-actions';

/**
 * [Course-23] Headers & Cookies (Server Component)
 * 
 * 目標：
 * 1. 在 Server Component 中直接讀取 Request Headers (例如 User-Agent)。
 * 2. 讀取 Cookies 來還原使用者狀態。
 * 3. 透過 Server Action 寫入 Cookies。
 */

export default async function Course23Headers() {
    // [教學重點] 讀取 Headers
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';

    // [教學重點] 讀取 Cookies
    const cookieStore = await cookies();
    const preference = cookieStore.get('user-preference')?.value || 'default';

    const isDark = preference === 'dark';

    return (
        <div className={`container mx-auto py-10 space-y-8 max-w-4xl transition-colors duration-500 ${isDark ? 'bg-slate-900 text-slate-50 p-8 rounded-xl' : ''}`}>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 23] Backend Context</h1>
                <p className="text-muted-foreground">
                    直接在 Server Component 存取 HTTP Headers 與 Cookies。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Headers Info */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Request Headers</CardTitle>
                        <CardDescription>Server-side detected info</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-muted-foreground">User-Agent:</span>
                            <div className="p-3 bg-muted rounded text-xs font-mono break-all">
                                {userAgent}
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground mt-4">
                            <p>💡 這些資訊是在伺服器端渲染 (SSR) 時直接從 HTTP 請求中獲取的。</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Cookies Management */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Cookie Management</CardTitle>
                        <CardDescription>Current Preference: <Badge variant="outline">{preference}</Badge></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="flex gap-4">
                            <form action={setPreference.bind(null, 'dark')}>
                                <Button type="submit" variant={isDark ? "secondary" : "default"}>
                                    Set Dark Mode
                                </Button>
                            </form>

                            <form action={setPreference.bind(null, 'light')}>
                                <Button type="submit" variant={!isDark ? "secondary" : "outline"}>
                                    Set Light Mode
                                </Button>
                            </form>

                            <form action={clearPreference}>
                                <Button type="submit" variant="ghost" size="icon" title="Clear Cookie">
                                    🗑️
                                </Button>
                            </form>
                        </div>

                        <div className="text-xs bg-yellow-50 text-yellow-800 p-3 rounded">
                            <strong>HttpOnly Cookie:</strong>
                            這個 Cookie 是由 Server Action 設定的。你可以打開 DevTools (Application {'>'} Cookies) 查看。
                            因為設定了 HttpOnly，前端 JS (document.cookie) 無法讀取它，提高了安全性。
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
