import React from 'react';
import { revalidatePath } from 'next/cache';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * [Course-14] Server Actions
 * 
 * 目標：
 * 1. 學習如何定義 Server Action (use server)。
 * 2. 學習如何在 form action 中調用 Server Action。
 * 3. 學習 revalidatePath 來更新 Cache。
 */

// 模擬資料庫 (在真實 Server 環境下，這會是 DB)
let TODOS_DB = ['Buy Milk', 'Learn Next.js', 'Walk the dog'];

export default function Course14ServerActions() {

    // [教學重點] 定義 Server Action
    // 必須標註 'use server'，這個函數只會在伺服器端執行。
    async function addTodo(formData: FormData) {
        'use server'; // 關鍵指令

        const newTodo = formData.get('todo') as string;
        if (!newTodo) return;

        // 1. 操作資料庫
        console.log('[Server Action] Adding todo:', newTodo);
        TODOS_DB.push(newTodo);

        // 2. 清除 Cache，讓頁面重整顯示最新資料
        revalidatePath('/tutorials/course-14-server-actions');
    }

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 14] Server Actions</h1>
                <p className="text-muted-foreground">
                    不再需要 API Route！直接在組件內定義後端邏輯。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Form 區域 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Add Todo Form</CardTitle>
                        <CardDescription>
                            這個表單直接提交給 Server Action (No Client JS required for basic func).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* [教學重點] action 屬性直接綁定 async function */}
                        <form action={addTodo} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="todo">New Todo</Label>
                                <Input id="todo" name="todo" placeholder="Type something..." required />
                            </div>
                            <Button type="submit" className="w-full">
                                Add Todo (Server Action)
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* List 區域 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Todo List (Server Side Rendered)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {TODOS_DB.map((todo, index) => (
                                <li key={index} className="p-3 bg-slate-100 rounded flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                    {todo}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-muted-foreground mt-4">
                            每次新增後，Server Action 會呼叫 <code>revalidatePath</code>，頁面會自動更新這裡的列表。
                        </p>
                    </CardContent>
                </Card>

            </div>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 在組件內部定義 Server Action
async function create(formData) {
  'use server'; // 標記為 Server Action
  
  await db.insert(...);
  revalidatePath('/path'); // 更新畫面
}

// 在 Form 中使用
<form action={create}>
  ...
</form>`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
