import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * [Course-32] E2E Testing (Playwright)
 * 
 * 目標：
 * 1. 解釋 End-to-End Testing 的概念。
 * 2. 展示 Playwright Script 的寫法。
 */

export default function Course32E2E() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 32] E2E Testing</h1>
                <p className="text-muted-foreground">
                    使用 Playwright 模擬真實使用者操作 (End-to-End)。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                <Card>
                    <CardHeader>
                        <CardTitle>What is E2E?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                        <p>
                            Unit Testing 測試單一組件，Integration Testing 測試組件互動，
                            而 <strong>E2E Testing</strong> 則是測試整個應用程式流程。
                        </p>
                        <p>
                            它會開啟一個真實的瀏覽器 (Chromium/Firefox/WebKit)，像使用者一樣點擊、輸入、導航。
                        </p>
                        <div className="mt-4 p-4 bg-muted rounded">
                            <strong>Scenario Example:</strong><br />
                            User opens login page -&gt; Types credentials -&gt; Clicks Login -&gt; Redirects to Dashboard.
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-950 text-slate-50">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Playwright Script</CardTitle>
                        <CardDescription className="text-slate-400">tests/login.spec.ts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="font-mono text-xs overflow-auto max-h-[300px] p-2 bg-slate-900 rounded border border-slate-800">
                            {`import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  // 1. Go to page
  await page.goto('/login');

  // 2. Interaction
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  // 3. Assertion (Wait for URL change)
  await expect(page).toHaveURL('/dashboard');
  
  // 4. Visual Check
  await expect(page.getByText('Welcome back')).toBeVisible();
});`}
                        </pre>
                    </CardContent>
                </Card>

            </div>

            <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">Tutorial Complete! 🎉</h2>
                <p className="max-w-md mx-auto text-muted-foreground mb-8">
                    恭喜！你已經完成了從 React 基礎到 Next.js 高階應用，再到生態系與測試的所有課程。
                </p>
                <Link href="/tutorials">
                    <Button size="lg">Return to Course List</Button>
                </Link>
            </div>

        </div>
    );
}
