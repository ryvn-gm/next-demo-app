'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

/**
 * [Course-04] Event Handling 事件處理
 * 
 * 目標：
 * 1. 理解 React 中的 SyntheticEvent (合成事件)。
 * 2. 學習處理表單事件 (onChange, onSubmit)。
 * 3. 理解 `e.preventDefault()` 防止瀏覽器預設行為。
 */

export default function Course04Events() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [submittedData, setSubmittedData] = useState<string | null>(null);

    // [教學重點] onChange 事件處理器
    // e: React.ChangeEvent<HTMLInputElement>
    // 這是 React 封裝過的合成事件，跨瀏覽器行為一致。
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };





    // [教學重點] onSubmit 事件處理器
    // e: React.FormEvent<HTMLFormElement>
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // [觀念講解] 若不加這一行，表單提交會導致頁面刷新 (Browser Default Behavior)。
        // 在 SPA (Single Page Application) 中，我們通常不希望頁面刷新。
        e.preventDefault();

        console.log('Form Submitted:', formData);
        setSubmittedData(JSON.stringify(formData, null, 2));
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 04] Event Handling 事件處理</h1>
                <p className="text-muted-foreground">React 使用 SyntheticEvent 來統一不同瀏覽器的事件行為。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* 表單區塊 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Registration Form</CardTitle>
                        <CardDescription>
                            試著輸入資料並提交，觀察 Console 或右側結果。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Register (Submit)
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* 結果展示區塊 */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Real-time State</CardTitle>
                            <CardDescription>隨著 Input 輸入即時更新</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre className="text-xs bg-slate-100 p-4 rounded min-h-[100px] overflow-auto">
                                {JSON.stringify(formData, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>

                    {submittedData && (
                        <Alert className="bg-green-50 border-green-200">
                            <AlertTitle className="text-green-800">Form Submitted Successfully!</AlertTitle>
                            <AlertDescription className="text-green-700 text-xs mt-2 font-mono">
                                {submittedData}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>

            <Card className="bg-slate-950 text-slate-50">
                <CardHeader>
                    <CardTitle className="text-slate-200">Key Code Snippets</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="font-mono text-xs md:text-sm overflow-x-auto p-4 rounded bg-slate-900 border border-slate-800">
                        {`// 1. 防止頁面刷新
const handleSubmit = (e) => {
  e.preventDefault(); 
  // 處理提交邏輯...
};

// 2. 處理 Input 變更
const handleChange = (e) => {
  // 透過 e.target.name 來動態更新對應的欄位
  setFormData(prev => ({ 
    ...prev, 
    [e.target.name]: e.target.value 
  }));
};`}
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
