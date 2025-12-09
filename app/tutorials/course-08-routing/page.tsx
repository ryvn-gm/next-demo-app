import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-08] Next.js Routing (List Page)
 * 
 * 目標：
 * 1. 理解 Next.js 的檔案路由 (File-system Routing)。
 * 2. 學習如何定義 Dynamic Routes (動態路由)，例如 `[id]`。
 */

// 模擬一些 Blog 資料
const BLOG_POSTS = [
    { id: '1', title: 'Why Next.js is Awesome', category: 'Tech' },
    { id: '2', title: 'Understanding React Server Components', category: 'React' },
    { id: '3', title: 'The Future of Web Development', category: 'Opinion' },
];

export default function Course08Routing() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 08] Routing & Dynamic Routes</h1>
                <p className="text-muted-foreground">
                    Next.js 使用資料夾結構來定義路由。任何資料夾下的 <code>page.tsx</code> 都會變成一個公開頁面。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Blog Posts List</CardTitle>
                    <CardDescription>
                        點擊以下標題，會跳轉到動態路徑 <code>/tutorials/course-08-routing/blog/[id]</code>
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {BLOG_POSTS.map((post) => (
                        <Link
                            key={post.id}
                            href={`/tutorials/course-08-routing/blog/${post.id}`}
                            className="block group"
                        >
                            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors">
                                <div>
                                    <h3 className="font-semibold group-hover:underline decoration-primary underline-offset-4">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Read more about {post.category}</p>
                                </div>
                                <Badge variant="secondary">ID: {post.id}</Badge>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Folder Structure</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`app/
  tutorials/
    course-08-routing/
      page.tsx          <-- 目前頁面 (List)
      blog/
        [id]/           <-- 動態片段 (Dynamic Segment)
          page.tsx      <-- 詳細頁 (Detail)`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
