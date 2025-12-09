'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * [Course-23] Server Actions for Cookies
 * 
 * 透過 `next/headers` 在 Server Side 讀寫 Cookie。
 * 注意：`cookies()` 是動態函式，使用它會讓頁面變成 Dynamic Rendering。
 */

// 設定偏好設定
export async function setPreference(theme: string) {
    // [教學重點] 設定 Cookie
    // httpOnly: true (預設) -> 前端 JS 無法讀取 (安全性高)
    // secure: true (預設 in Prod) -> 只能透過 HTTPS 傳輸
    // sameSite: 'lax' (預設) -> 防止 CSRF
    // 
    // 注意：在 Next.js Server Actions 中，cookies() 是 Awaitable (Promise) 在 Next.js 15+ 預覽版中，
    // 但在穩定版 14 中是同步調用回傳 ReadonlyRequestCookies。
    // 為了相容性 & 正確性，我們直接呼叫。

    (await cookies()).set('user-preference', theme, {
        maxAge: 60 * 60 * 24 * 7, // 7 Days
        path: '/',
    });

    revalidatePath('/tutorials/course-23-headers');
}

// 清除偏好設定
export async function clearPreference() {
    (await cookies()).delete('user-preference');
    revalidatePath('/tutorials/course-23-headers');
}
