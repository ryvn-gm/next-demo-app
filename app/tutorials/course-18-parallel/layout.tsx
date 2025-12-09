import React, { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

/**
 * [Course-18] Parallel Routes (Slots) - Layout
 * 
 * 目標：
 * 1. 理解 Slot 的概念：透過 `@folder` 命名約定建立。
 * 2. Layout 會接收這些 Slot 作為 props (就像 children 一樣)。
 * 3. 可以實現並排顯示、獨立 Loading、獨立 Error Handling。
 */

export default function Course18Layout({
    children,
    team,
    analytics,
}: {
    children: ReactNode;
    team: ReactNode;
    analytics: ReactNode;
}) {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-6xl">
            <div className="space-y-2">
                <Link href="/tutorials" className="text-sm text-primary hover:underline mb-4 block">
                    ← Start Over
                </Link>
                <h1 className="text-3xl font-bold">[Course 18] Parallel Routes</h1>
                <p className="text-muted-foreground">
                    這是一個 Layout，它同時接收並渲染了三個頁面：Main Page, @team, @analytics。
                </p>
            </div>

            {/* Main Page Content */}
            <section className="border p-4 rounded-lg bg-background">
                <div className="mb-2">
                    <Badge variant="outline">props.children</Badge>
                </div>
                {children}
            </section>

            {/* Slots Grid */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Team Slot */}
                <section className="border p-4 rounded-lg bg-blue-50/50 border-blue-100">
                    <div className="mb-2">
                        <Badge className="bg-blue-600">props.team (@team)</Badge>
                    </div>
                    {team}
                </section>

                {/* Analytics Slot */}
                <section className="border p-4 rounded-lg bg-purple-50/50 border-purple-100">
                    <div className="mb-2">
                        <Badge className="bg-purple-600">props.analytics (@analytics)</Badge>
                    </div>
                    {analytics}
                </section>

            </div>
        </div>
    );
}
