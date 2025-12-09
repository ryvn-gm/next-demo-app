import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function AnalyticsPage() {
    // 模擬較長延遲 (3s) -> 展示獨立 Loading
    await new Promise(resolve => setTimeout(resolve, 3000));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Last 7 days performance</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-2 h-32 mt-4">
                    {[40, 65, 30, 80, 55, 90, 75].map((h, i) => (
                        <div
                            key={i}
                            className="bg-purple-500 w-full rounded-t-md hover:bg-purple-600 transition-colors"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Mon</span>
                    <span>Sun</span>
                </div>
            </CardContent>
        </Card>
    );
}
