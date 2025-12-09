'use client'; // [教學重點] 這裡加上 "use client" 成為 Client Component

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

// 這是一個需要互動的組件 (State, onClick)
export function InteractiveCounter() {
    const [count, setCount] = useState(0);

    console.log('[Client] InteractiveCounter rendered on client.');

    return (
        <div className="p-4 border rounded-lg bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-blue-600 dark:text-blue-400">Client Component Area</span>
                <span className="text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded">Interactive</span>
            </div>

            <p className="text-sm text-muted-foreground">
                我可以被點擊，因為我是 Client Component。<br />
                (I have <code>useState</code> and event listeners)
            </p>

            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold font-mono">{count}</div>
                <Button onClick={() => setCount(count + 1)} size="sm">
                    Try Clicking Me (+1)
                </Button>
            </div>

            <Alert>
                <AlertDescription className="text-xs text-muted-foreground">
                    我在瀏覽器端也會執行，所以可以看到 console log (Client Side)。
                </AlertDescription>
            </Alert>
        </div>
    );
}
