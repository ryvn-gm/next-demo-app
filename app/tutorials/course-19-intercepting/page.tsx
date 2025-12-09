import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

/**
 * [Course-19] Intercepting Routes (Context Modal)
 * 
 * 目標：
 * 1. 實作 "Gallery" 模式：列表頁點擊 -> 網址變更 -> 顯示 Modal (不刷新背景)。
 * 2. 刷新頁面 -> 網址不變 -> 顯示完整獨立頁面。
 * 3. 必須搭配 Parallel Routes (@modal) 與 Intercepting Routes ((.)photo) 使用。
 */

// 模擬照片資料
import { PHOTOS } from './data';

export default function Course19Intercepting() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 19] Intercepting Routes</h1>
                <p className="text-muted-foreground">
                    點擊圖片以打開 Modal。請留意網址列會變成 <code>/photo/id</code>，但背景列表依然存在。
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PHOTOS.map((photo) => (
                    <Link key={photo.id} href={`/tutorials/course-19-intercepting/photo/${photo.id}`}>
                        <Card className="hover:opacity-80 transition-opacity cursor-pointer">
                            <CardContent className="p-2">
                                <div className="relative aspect-square rounded overflow-hidden bg-muted">
                                    {/* 使用 Next/Image 或 img */}
                                    <img
                                        src={photo.src}
                                        alt={photo.title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="text-xs text-center mt-2 font-medium">{photo.title}</div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
