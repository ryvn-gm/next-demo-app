'use server';

import { z } from 'zod';

// 1. 定義 Schema
const userSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.coerce.number().min(18, { message: "You must be at least 18 years old" }),
});

// 定義回傳狀態類型
export type FormState = {
    errors?: {
        username?: string[];
        email?: string[];
        age?: string[];
    };
    message?: string;
    success?: boolean;
};

export async function registerUser(prevState: FormState, formData: FormData): Promise<FormState> {
    // 模擬網路延遲
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. 解析 FormData -> Object
    const rawData = {
        username: formData.get('username'),
        email: formData.get('email'),
        age: formData.get('age'),
    };

    // 3. 執行驗證 (safeParse 不會拋出錯誤，而是回傳 success/error 物件)
    const result = userSchema.safeParse(rawData);

    if (!result.success) {
        // 驗證失敗 -> 回傳錯誤訊息給前端
        return {
            errors: result.error.flatten().fieldErrors,
            message: "Validation failed",
            success: false,
        };
    }

    // 驗證成功 -> 處理資料 (e.g., 存入 DB)
    console.log('Valid Data:', result.data);

    return {
        success: true,
        message: `User ${result.data.username} registered successfully!`,
    };
}
