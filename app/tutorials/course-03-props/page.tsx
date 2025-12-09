'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * [Course-03] Props 組件構通
 * 
 * 目標：
 * 1. 理解 Props 是父組件傳遞給子組件的數據。
 * 2. 理解 Props 是 "唯讀" (Read-only) 的，子組件不可修改。
 * 3. 理解 Child -> Parent 的溝通方式 (透過 Callback Function)。
 */

// ----------------------------------------------------------------------------
// 子組件 (Child Component)
// [教學重點] 定義 Props 的型別 (TypeScript Interface)
// ----------------------------------------------------------------------------
interface UserProfileCardProps {
    name: string;          // 基本資料
    role: 'admin' | 'user'; // 限定字串
    isActive: boolean;     // 布林值
    onStatusChange: () => void; // [教學重點] Callback Function，用來通知父組件
}

function UserProfileCard({ name, role, isActive, onStatusChange }: UserProfileCardProps) {
    // [教學重點] 這裡接收到的 props 是 "唯讀" 的。
    // 我們不能寫 props.name = "New Name" 來修改它。

    return (
        <Card className="w-[350px] border-2 border-primary/20">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{name || "Unknown User"}</CardTitle>
                        <CardDescription>{role === 'admin' ? 'Administrator' : 'Standard User'}</CardDescription>
                    </div>
                    <Badge variant={isActive ? "default" : "destructive"}>
                        {isActive ? "Active" : "Inactive"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    這是一個子組件。它只負責 "顯示" 資料，並不擁有資料。資料是由父組件 (Page) 傳進來的。
                </div>
            </CardContent>
            <CardFooter>
                {/* [教學重點] 點擊按鈕時，呼叫父組件傳下來的 function */}
                <Button onClick={onStatusChange} className="w-full" variant="outline">
                    {isActive ? "停用帳號 (Deactivate)" : "啟用帳號 (Activate)"}
                </Button>
            </CardFooter>
        </Card>
    );
}

// ----------------------------------------------------------------------------
// 父組件 (Parent Component / Page)
// ----------------------------------------------------------------------------
export default function Course03Props() {
    // 父組件擁有 "狀態" (Truth of Source)
    const [username, setUsername] = useState("Alice");
    const [role, setRole] = useState<'admin' | 'user'>("admin");
    const [isActive, setIsActive] = useState(true);

    const handleToggleStatus = () => {
        setIsActive((prev) => !prev);
        // 這裡可以加入更多邏輯，例如打 API 更新後端
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 03] Props 組件溝通</h1>
                <p className="text-muted-foreground">React 中的資料流是 "單向" 的 (Top-Down)。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* 左側：控制面板 (父組件控制區) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Parent Component (Controller)</CardTitle>
                        <CardDescription>在這裡修改 State，觀察右側子組件的變化。</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>User Name</Label>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Type a name..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Role</Label>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={role === 'admin' ? 'default' : 'outline'}
                                    onClick={() => setRole('admin')}
                                >
                                    Admin
                                </Button>
                                <Button
                                    size="sm"
                                    variant={role === 'user' ? 'default' : 'outline'}
                                    onClick={() => setRole('user')}
                                >
                                    User
                                </Button>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground mb-2">Current State in Parent:</p>
                            <pre className="text-xs bg-slate-100 p-2 rounded">
                                {JSON.stringify({ username, role, isActive }, null, 2)}
                            </pre>
                        </div>
                    </CardContent>
                </Card>

                {/* 右側：子組件展示 */}
                <div className="flex flex-col gap-4">
                    <div className="font-medium text-center text-muted-foreground">▼ Passing Props ▼</div>

                    <div className="flex justify-center">
                        {/* [教學重點] 將 Parent 的 State 作為 Props 傳遞給 Child */}
                        <UserProfileCard
                            name={username}
                            role={role}
                            isActive={isActive}
                            onStatusChange={handleToggleStatus} // 傳遞 function
                        />
                    </div>

                    <div className="font-medium text-center text-muted-foreground">▲ Callback Event ▲</div>
                </div>

            </div>

            <Card className="bg-slate-950 text-slate-50 mt-8">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Code Snippets</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 1. 父組件傳遞 Props
<UserProfileCard 
  name={username}        // String
  isActive={isActive}    // Boolean
  onAction={handleAction} // Function
/>

// 2. 子組件接收 Props (解構賦值)
function UserProfileCard({ name, onAction }) {
  return (
    <div>
      <h1>{name}</h1>
      <button onClick={onAction}>Click Me</button>
    </div>
  );
}`}
                    </pre>
                </CardContent>
            </Card>
        </div>
    );
}
