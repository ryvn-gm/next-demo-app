import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { revalidateProduct } from '@/actions/revalidate';

// 為了演示 ISR，我們需要一個會變的資料源
async function getProductData() {
    // 這裡仍然打剛剛的時間 API，但這次我們要加上 Tags
    // 注意：ISR (Incremental Static Regeneration)
    const res = await fetch('http://localhost:3000/api/course-25-time', {
        next: {
            tags: ['product-data'], // 設定 Tag
            revalidate: 3600 // 或者是設定時間 (例如 1小時)，但這裡我們主要演示手動清除
        }
    });
    const data = await res.json();
    return data.time;
}

export default async function Course26ISR() {
    const time = await getProductData();

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 26] Revalidation (ISR)</h1>
                <p className="text-muted-foreground">
                    Incremental Static Regeneration: 靜態頁面也能擁有 "可更新" 的動態資料。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        Cached Data
                        <Badge>Tag: product-data</Badge>
                    </CardTitle>
                    <CardDescription>
                        這個資料被 "永久" 快取了，直到有人呼叫 <code>revalidateTag</code>。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-5xl font-mono font-bold text-center py-8 bg-slate-100 dark:bg-slate-800 rounded">
                        {time}
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <form action={revalidateProduct}>
                            <Button type="submit" size="lg" className="w-full md:w-auto">
                                Revalidate Now (Update Data)
                            </Button>
                        </form>
                        <p className="text-xs text-muted-foreground">
                            點擊後，Server 會清除快取。你可能需要重新整理頁面 (或由 Action 觸發 refresh) 才會看到新資料。
                        </p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
