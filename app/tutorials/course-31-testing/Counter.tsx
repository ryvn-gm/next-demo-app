'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded">
            <h3 className="text-xl font-bold">Count: <span data-testid="count-value">{count}</span></h3>
            <div className="flex gap-2">
                <Button onClick={() => setCount(c => c + 1)}>Increment</Button>
                <Button onClick={() => setCount(c => c - 1)} variant="outline">Decrement</Button>
            </div>
        </div>
    );
}
