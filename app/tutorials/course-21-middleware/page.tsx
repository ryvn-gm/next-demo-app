import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

/**
 * [Course-21] Middleware
 * 
 * 目標：
 * 1. 理解 Middleware 是在請求到達 Page/API **之前** 攔截並執行的代碼。
 * 2. 它是 Edge Runtime，速度極快，但不支援所有 Node.js API。
 */

export default function Course21Middleware() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 21] Middleware 中間件</h1>
                <p className="text-muted-foreground">
                    全局攔截器，通常用於身分驗證 (Auth)、重導向 (Redirects)、重寫 (Rewrites) 或修改 Headers。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>How it works</CardTitle>
                    <CardDescription>Middleware 定義在專案根目錄的 <code>middleware.ts</code> 文件中。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm">
                        由於 Middleware 會影響全站效能，我們這裡僅展示代碼範例，而不實際建立全局 middleware 檔案以免干擾其他課程頁面。
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Example Code: middleware.ts</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  // 1. 讀取 Cookie
  const token = request.cookies.get('auth-token');

  // 2. 條件判斷：如果沒有 Token 且正在訪問 /dashboard
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    // 3. 重導向到登入頁
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. 放行
  return NextResponse.next();
}

// 5. 設定匹配路徑 (Matcher) - 效能優化關鍵
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};`}
                    </pre>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                            <li><strong>Redirects / Rewrites</strong>: 根據條件改變 URL。</li>
                            <li><strong>Authentication</strong>: 檢查 Cookie 或 Token。</li>
                            <li><strong>Headers</strong>: 增加 Security Headers (CORS, CSP)。</li>
                            <li><strong>Geolocation</strong>: 根據使用者 IP 判斷地區。</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
