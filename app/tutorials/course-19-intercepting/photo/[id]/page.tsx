import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PHOTOS } from '../../data';

/**
 * [Course-19] 獨立頁面 (Hard Navigation / Refresh)
 * 
 * 當使用者直接訪問 URL 或刷新頁面時，會渲染這個頁面 (而不是 Modal)。
 */

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const photo = PHOTOS.find((p) => p.id === id);

    if (!photo) return <div>Photo not found</div>;

    return (
        <div className="container mx-auto py-10 max-w-2xl text-center space-y-6">
            <div className="flex justify-start">
                <Link href="/tutorials/course-19-intercepting">
                    <Button variant="ghost">← Back to Gallery</Button>
                </Link>
            </div>

            <div className="border rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm">
                <img src={photo.src} alt={photo.title} className="w-full rounded-lg" />
            </div>

            <h1 className="text-3xl font-bold">{photo.title}</h1>
            <p className="text-muted-foreground">ID: {id}</p>

            <div className="p-4 bg-yellow-50 text-yellow-800 rounded text-sm text-left">
                <strong>提示：</strong> 你現在看到的是完整的 Page。如果你是從列表頁點擊進來的，你應該要看到 Modal 並且背景是暗的。如果你刷新了頁面，就會看到這裡。
            </div>
        </div>
    );
}
