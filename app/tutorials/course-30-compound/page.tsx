'use client'; // 互動組件通常為 Client Component

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react'; // 假設有 lucide-react 或類似 icon

/**
 * [Course-30] Compound Components Pattern
 * 
 * 目標：實作 `<Accordion>` 組件。
 * 結構：
 * <Accordion>
 *   <Accordion.Item value="1">
 *     <Accordion.Trigger>Title</Accordion.Trigger>
 *     <Accordion.Content>Content</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 */

// 1. Context 定義 (共享狀態：當前展開的 Item)
type AccordionContextType = {
    openValue: string | null;
    toggle: (value: string) => void;
};
const AccordionContext = createContext<AccordionContextType | null>(null);

// 2. Main Component
function Accordion({ children, className }: { children: ReactNode, className?: string }) {
    const [openValue, setOpenValue] = useState<string | null>(null);

    const toggle = (value: string) => {
        setOpenValue((prev) => (prev === value ? null : value));
    };

    return (
        <AccordionContext.Provider value={{ openValue, toggle }}>
            <div className={cn("space-y-2", className)}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

// 3. Sub Components

// Context for Item (knows its own value)
const ItemContext = createContext<{ value: string } | null>(null);

function AccordionItem({ value, children, className }: { value: string, children: ReactNode, className?: string }) {
    return (
        <ItemContext.Provider value={{ value }}>
            <div className={cn("border rounded-lg overflow-hidden", className)}>
                {children}
            </div>
        </ItemContext.Provider>
    );
}

function AccordionTrigger({ children, className }: { children: ReactNode, className?: string }) {
    const { openValue, toggle } = useContext(AccordionContext)!;
    const { value } = useContext(ItemContext)!;
    const isOpen = openValue === value;

    return (
        <button
            onClick={() => toggle(value)}
            className={cn(
                "flex w-full items-center justify-between p-4 font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-900",
                className
            )}
        >
            {children}
            <span className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "")}>
                ▼
            </span>
        </button>
    );
}

function AccordionContent({ children, className }: { children: ReactNode, className?: string }) {
    const { openValue } = useContext(AccordionContext)!;
    const { value } = useContext(ItemContext)!;
    const isOpen = openValue === value;

    if (!isOpen) return null;

    return (
        <div className={cn("p-4 pt-0 text-sm text-muted-foreground animate-in slide-in-from-top-2 duration-200", className)}>
            <div className="pt-4 border-t">
                {children}
            </div>
        </div>
    );
}

// Attach sub-components (Dot notation)
// 注意：在 TypeScript + Server Components 環境下，有時 Dot notation 會有一些挑戰 (Tree shaking)。
// 但在 Client Component 內部是安全的。
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// --- Demo Page ---

export default function Course30Compound() {
    return (
        <div className="container mx-auto py-10 space-y-8 max-w-2xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 30] Compound Components</h1>
                <p className="text-muted-foreground">
                    一種進階 React 模式，讓父子組件透過隱式狀態共享，提供靈活且宣告式的 API。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Custom Accordion</CardTitle>
                </CardHeader>
                <CardContent>

                    <Accordion>
                        <Accordion.Item value="item-1">
                            <Accordion.Trigger>Is it styled?</Accordion.Trigger>
                            <Accordion.Content>
                                Yes. It comes with default styles that matches the other components' aesthetic.
                            </Accordion.Content>
                        </Accordion.Item>

                        <Accordion.Item value="item-2">
                            <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
                            <Accordion.Content>
                                Ideally yes. A production ready version should handle ARIA attributes (which Radix UI does for you).
                            </Accordion.Content>
                        </Accordion.Item>

                        <Accordion.Item value="item-3">
                            <Accordion.Trigger>Can I animate it?</Accordion.Trigger>
                            <Accordion.Content>
                                Yes! Check the slide-in animation implemented in the content component.
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>

                </CardContent>
            </Card>
        </div>
    );
}
