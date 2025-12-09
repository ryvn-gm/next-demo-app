'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { COURSES, PHASES } from './data';

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        // [Fix] Ensure height is exactly viewport height
        <div className="h-screen bg-background isolate">
            <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">

                {/* Sidebar Panel */}
                <ResizablePanel
                    defaultSize={20}
                    minSize={15}
                    maxSize={30}
                    className="hidden md:flex flex-col border-r bg-muted/20"
                >
                    <div className="p-4 border-b h-16 flex items-center shrink-0">
                        <Link href="/tutorials" className="font-bold text-lg tracking-tight hover:text-primary transition-colors leading-tight">
                            React / Next.js <br />
                            <span className="text-xs font-normal text-muted-foreground">Interactive Course</span>
                        </Link>
                    </div>

                    {/* [Fix] ScrollArea needs flex-1 AND overflow-hidden on parent to scroll correctly */}
                    <div className="flex-1 overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-6">
                                {PHASES.map((phase) => (
                                    <div key={phase} className="space-y-2">
                                        <h4 className="text-sm font-semibold text-muted-foreground px-2">
                                            {phase}
                                        </h4>
                                        <div className="space-y-1">
                                            {COURSES.filter(c => c.phase === phase).map(course => (
                                                <Link key={course.id} href={course.path} className="block">
                                                    <Button
                                                        variant={pathname === course.path ? "secondary" : "ghost"}
                                                        className={cn(
                                                            "w-full justify-start text-xs h-8 text-left truncate",
                                                            pathname === course.path && "bg-slate-200 dark:bg-slate-800"
                                                        )}
                                                        title={course.title}
                                                    >
                                                        <span className="mr-2 text-muted-foreground shrink-0">{course.id}.</span>
                                                        <span className="truncate">{course.title}</span>
                                                    </Button>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="h-8"></div> {/* Bottom padding */}
                            </div>
                        </ScrollArea>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Main Content Panel */}
                <ResizablePanel defaultSize={80}>
                    <ScrollArea className="h-full">
                        <div className="p-4 md:p-8 max-w-5xl mx-auto">
                            {children}
                        </div>
                    </ScrollArea>
                </ResizablePanel>

            </ResizablePanelGroup>
        </div>
    );
}
