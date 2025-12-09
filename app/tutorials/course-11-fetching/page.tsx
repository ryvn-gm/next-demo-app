import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * [Course-11] Server-side Data Fetching
 * 
 * 目標：
 * 1. 學習在 Server Component 直接使用 async/await。
 * 2. 學習 fetch 在 Next.js 中的增強特性 (Caching/Revalidating)。
 */

// 定義資料型別
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// 模擬資料獲取 (這裡 fetch 公開 API)
async function getData(): Promise<Todo[]> {
    // [教學重點] 這是 Server-side Fetching。
    // 請求是從 "伺服器" 發出，不會暴露 API Key，也不會受 CORS 限制。
    // Next.js 預設會 Cache 這個請求的結果 (Static Generation)。
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Course11Fetching() {
    // [教學重點] 直接 await 資料。
    // 因為這是 Server Component，所以可以用 async function。
    // 當這行執行時，頁面還不會回傳給瀏覽器，直到 Promise 解決。
    const posts = await getData();

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 11] Data Fetching</h1>
                <p className="text-muted-foreground">
                    在 App Router 中，你可以像寫後端代碼一樣直接讀取資料。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Todos fetched from Server</CardTitle>
                    <CardDescription>
                        資料來源：jsonplaceholder (Fetched on Server)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {posts.map((todo) => (
                        <div key={todo.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-xs text-muted-foreground">#{todo.id}</span>
                                <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                                    {todo.title}
                                </span>
                            </div>
                            <Badge variant={todo.completed ? 'secondary' : 'default'}>
                                {todo.completed ? 'Done' : 'Pending'}
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Async Server Component</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 1. 定義 async Component
export default async function Page() {
  
  // 2. 直接 await fetch 或 DB 查詢
  const data = await fetch('https://api...');

  return <div>{JSON.stringify(data)}</div>;
}`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
