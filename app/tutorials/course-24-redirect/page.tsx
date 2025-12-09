'use client';
// 注意：redirect() 可以在 Server Component, Server Actions, Route Handlers 中使用。
// 但為了演示表單提交，我們這裡使用 Server Actions + Client Form。

import React from 'react';
import { useFormStatus } from 'react-dom'; // Next.js 14+
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAndRedirect } from '@/actions/course-24-actions'; // 待實現

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Logging in...' : 'Login & Redirect'}
        </Button>
    );
}

export default function Course24Redirect() {
    // useFormState 用於處理 Server Action 回傳的錯誤訊息 (如果有)
    // 這裡使用簡單版，主要演示 redirect

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-lg">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">[Course 24] Redirects</h1>
                <p className="text-muted-foreground">
                    Server-side Redirect vs Client-side Navigation
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Login Simulation</CardTitle>
                    <CardDescription>
                        輸入任意內容提交。成功後將被 Server Action 重導向回 <code>/tutorials</code>。
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={loginAndRedirect} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="user@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Redirect Types</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                    <div>
                        <code className="bg-slate-800 p-1 rounded">redirect(path)</code>
                        <p className="text-slate-400 mt-1">
                            回傳 307 (Temporary Redirect)。預設使用。告訴搜尋引擎這個資源只是暫時移動。
                        </p>
                    </div>
                    <div>
                        <code className="bg-slate-800 p-1 rounded">permanentRedirect(path)</code>
                        <p className="text-slate-400 mt-1">
                            回傳 308 (Permanent Redirect)。告訴搜尋引擎資源已永久移動，會快取這個跳轉。
                        </p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
