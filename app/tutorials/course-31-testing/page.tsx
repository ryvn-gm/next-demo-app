import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Counter } from './Counter';

/**
 * [Course-31] Unit Testing (Vitest + React Testing Library)
 * 
 * 目標：
 * 1. 展示如何編寫單元測試。
 * 2. 測試 "行為" (Behavior) 而非 "實作" (Implementation)。
 * 3. 雖然本專案未配置 Vitest 環境 (為了簡化教學 Repo)，但提供了完整的測試代碼範例。
 */

export default function Course31Testing() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 31] Unit Testing</h1>
                <p className="text-muted-foreground">
                    使用 Vitest 與 React Testing Library 進行組件測試。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* 組件展示 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Component Under Test</CardTitle>
                        <CardDescription>
                            <code>&lt;Counter /&gt;</code>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center h-[200px]">
                        <Counter />
                    </CardContent>
                </Card>

                {/* 測試代碼展示 */}
                <Card className="bg-slate-950 text-slate-50">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Test Code (Example)</CardTitle>
                        <CardDescription className="text-slate-400">
                            Counter.test.tsx
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="font-mono text-xs overflow-auto max-h-[300px] p-2 bg-slate-900 rounded border border-slate-800">
                            {`import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';

test('increments count', () => {
  // 1. Render
  render(<Counter />);

  // 2. Act (找到按鈕並點擊)
  const button = screen.getByText('Increment');
  fireEvent.click(button);

  // 3. Assert (驗證結果)
  expect(screen.getByTestId('count-value'))
    .toHaveTextContent('1');
});`}
                        </pre>
                    </CardContent>
                </Card>

            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Why Unit Test?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        <li><strong>信心 (Confidence)</strong>: 重構代碼時，測試能確保功能沒壞。</li>
                        <li><strong>文檔 (Documentation)</strong>: 測試代碼本身就是最好的用法說明。</li>
                        <li><strong>快速反饋 (Fast Feedback)</strong>: 不需要每次都在瀏覽器手動點擊。</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
