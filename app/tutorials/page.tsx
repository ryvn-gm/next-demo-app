import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COURSES, PHASES } from './data';

export default function TutorialsDashboard() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-5xl">
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Next.js 14+ Masterclass
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    從 React 基礎 Hook 到 Next.js App Router 進階架構，包含 Server Actions, Intercepting Routes, Middleware 與 Testing。
                    共 32 堂實戰課程。
                </p>
            </div>

            <div className="grid gap-8">
                {PHASES.map((phase) => (
                    <div key={phase} className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
                            {phase}
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {COURSES.filter(c => c.phase === phase).map((course) => (
                                <Link key={course.id} href={course.path} className="group transition-all hover:-translate-y-1">
                                    <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all">
                                        <CardHeader>
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant="outline" className="font-mono">#{course.id}</Badge>
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                {course.title}
                                            </CardTitle>
                                            <CardDescription>
                                                {course.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
