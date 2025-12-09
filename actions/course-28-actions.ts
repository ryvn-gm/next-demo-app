'use server';

export async function submitComplexForm(data: any) {
    // 模擬伺服器處理
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Server received:', data);

    if (data.email.includes('error')) {
        return { success: false, message: 'Simulated server error' };
    }

    return { success: true, message: 'Form submitted successfully!' };
}
