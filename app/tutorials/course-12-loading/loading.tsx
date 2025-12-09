import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * [Course-12] Loading UI
 * 
 * 目標：
 * 1. 學習 `loading.tsx` 檔案規則。
 * 2. 當 page.tsx 還在載入 (Promise Pending) 時，Next.js 會自動顯示這個畫面。
 */

export default function Loading() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <Skeleton className="h-10 w-[300px]" />
                <Skeleton className="h-4 w-[500px]" />
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-[200px] mb-2" />
                    <Skeleton className="h-4 w-[300px]" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[90%]" />
                    </div>
                    <div className="flex gap-2 pt-4">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
