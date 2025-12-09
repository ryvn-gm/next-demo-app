import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';

/**
 * [Course-08] Dynamic Routes (Detail Page)
 * 
 * 目標：
 * 1. 學習如何讀取 URL 參數 (params)。
 * 2. 理解在 Server Component 中，params 是從 props 傳入的 Promise (Next.js 15+) 或 Object。
 *    注意：Next.js 15 開始 params 是一個 Promise。但在此範例為了相容性，我們先當作 Object 處理，
 *    或者依據實際 Next.js 版本宣告型別。假設是 Next.js 14/15 混合環境，最標準的寫法如下。
 */

// 定義 Props 型別
// 在 Next.js 13+ App Router，params 預設即為物件 (Next.js 15 可能改為 Promise，這邊採用通用寫法)
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    // 讀取動態參數 ID
    const { id } = await params;

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <Link href="/tutorials/course-08-routing">
                    <Button variant="ghost" size="sm" className="pl-0 gap-1 text-muted-foreground hover:text-primary">
                        <ChevronLeft className="h-4 w-4" />
                        Back to List
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">[Course 08] Blog Detail</h1>
                <p className="text-muted-foreground">你現在位於一個動態路由頁面。</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl">Post ID: {id}</CardTitle>
                        <Badge>Dynamic Route</Badge>
                    </div>
                    <CardDescription>
                        This content maps to `app/tutorials/course-08-routing/blog/[id]/page.tsx`
                    </CardDescription>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>
                        因為這是一個教學 Demo，我們沒有真的去資料庫抓取文章內容。
                        但你可以看到 URL 上的 <code>/blog/{id}</code> 成功對應到了這個頁面，並且我們讀取到了 ID 為 <strong>{id}</strong>。
                    </p>
                    <div className="p-4 bg-muted rounded-lg not-prose">
                        <h4 className="font-semibold mb-2">How to access params?</h4>
                        <code className="text-sm bg-background p-1 rounded border">
                            const {'{ id }'} = await params;
                        </code>
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Try changing the URL ID manually to verify different values!
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
