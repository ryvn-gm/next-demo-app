import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-4 p-4">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <div className="flex items-end gap-2 h-32 mt-4">
                <Skeleton className="h-full w-full" />
                <Skeleton className="h-[80%] w-full" />
                <Skeleton className="h-[40%] w-full" />
                <Skeleton className="h-full w-full" />
            </div>
        </div>
    );
}
