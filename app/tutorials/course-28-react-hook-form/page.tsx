'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { submitComplexForm } from '@/actions/course-28-actions';

/**
 * [Course-28] Advanced Forms (React Hook Form + Zod)
 * 
 * 目標：
 * 1. 使用 `react-hook-form` 建立高效能表單 (Uncontrolled)。
 * 2. 整合 `zod` 進行 Schema Validation。
 * 3. 處理複雜邏輯 (例如 "Confirm Password" 比對)。
 */

// 1. 定義 Zod Schema
const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 chars"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    confirmPassword: z.string(),
    terms: z.boolean().refine(val => val === true, "You must accept terms"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // 錯誤顯示在 confirmPassword 欄位
});

// 推導 TypeScript 類型
type FormData = z.infer<typeof formSchema>;

export default function Course28ReactHookForm() {
    const [serverMsg, setServerMsg] = useState('');

    // 2. 初始化 Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue // 用於手動設定 checkbox 等第三方組件的值
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        }
    });

    // 3. 提交處理函數
    const onSubmit = async (data: FormData) => {
        setServerMsg('');
        const res = await submitComplexForm(data);
        if (res.success) {
            setServerMsg(`✅ ${res.message}`);
            reset(); // 清空表單
        } else {
            setServerMsg(`❌ ${res.message}`);
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-lg">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 28] React Hook Form</h1>
                <p className="text-muted-foreground">
                    高效能、易於驗證的表單解決方案。比傳統 Controlled Component 少非常多 Re-render。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Client-side validation with Zod</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Username */}
                        <div className="space-y-2">
                            <Label>Username</Label>
                            {/* [教學重點] register() 會回傳 onChange, onBlur, name, ref 等屬性 */}
                            <Input {...register('username')} placeholder="JohnDoe" />
                            {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input {...register('email')} placeholder="john@example.com" />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input type="password" {...register('password')} />
                                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Confirm</Label>
                                <Input type="password" {...register('confirmPassword')} />
                                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        {/* Checkbox (Controlled by RHF manually for UI lib integration) */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                onCheckedChange={(checked) => setValue('terms', checked === true, { shouldValidate: true })}
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                        </div>
                        {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Create Account'}
                        </Button>

                        {serverMsg && (
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded text-sm text-center">
                                {serverMsg}
                            </div>
                        )}

                        <div className="text-xs text-muted-foreground mt-4 border-t pt-2">
                            <p>💡 觀察 RHF DevTools 或 Console，你會發現輸入文字時，整個 Form 幾乎不會 Re-render。</p>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    );
}
