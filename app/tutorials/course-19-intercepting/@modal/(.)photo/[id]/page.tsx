'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PHOTOS } from '../../../data'; // 引用上層的資料 (data.ts)

export default function PhotoModal() {
    const router = useRouter();

    // [Fix] 使用 useParams Hook 是 Client Component 取得參數的標準做法
    const params = useParams();
    const photoId = params.id as string;
    const photo = PHOTOS.find((p) => p.id === photoId);

    if (!photo) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={() => router.back()} />

            <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden max-w-3xl w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
                <button
                    onClick={() => router.back()}
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 z-50 pointer-events-auto"
                >
                    ✕
                </button>

                <div className="grid md:grid-cols-[1.5fr_1fr]">
                    <div className="bg-black flex items-center justify-center relative">
                        <img src={photo.src} alt={photo.title} className="max-h-[60vh] md:max-h-[500px] object-contain" />
                    </div>
                    <div className="p-6 flex flex-col justify-center space-y-4">
                        <h2 className="text-2xl font-bold">{photo.title}</h2>
                        <p className="text-muted-foreground">
                            這是一個 Intercepted Route Modal (`(.)photo/[id]`).
                        </p>
                        <div className="text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded">
                            <p>URL: <code>/photo/{photoId}</code></p>
                            <p className="mt-2 text-xs text-muted-foreground">
                                按下重新整理 (F5)，你將會進入完整的獨立頁面，背景列表將消失。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
