'use server';

import { redirect } from 'next/navigation';

export async function loginAndRedirect(formData: FormData) {
    // 模擬驗證過程
    const email = formData.get('email');
    await new Promise(resolve => setTimeout(resolve, 1000)); // 延遲 1 秒

    console.log(`User ${email} logged in.`);

    // [教學重點] redirect 內部會拋出一個特殊的 Error (NEXT_REDIRECT)
    // 所以它 "必須" 在 try-catch 外面呼叫，或者是把 catch 中的這個 Error 拋出去。
    // 在 Server Actions 中，通常放在函式最後一行。

    redirect('/tutorials');
}
