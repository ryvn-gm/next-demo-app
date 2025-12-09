'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

export async function revalidateProduct() {
    // [教學重點] On-Demand Revalidation
    // 清除帶有 'product-data' tag 的所有 fetch cache
    revalidateTag('product-data', 'default');

    // 確保頁面重新渲染以顯示新資料
    // 有時候只用 revalidateTag 在某些 Client Router Cache 情況下不一定馬上更新 UI
    // 加上 revalidatePath 是雙重保險
    revalidatePath('/tutorials/course-26-revalidation');
}
