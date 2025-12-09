import React from 'react';

export default function Course18Page() {
    return (
        <div className="prose dark:prose-invert">
            <h3>Main Dashboard Area</h3>
            <p>
                這是主要的 <code>page.tsx</code>。它對應到 Layout 中的 <code>props.children</code>。
                Parallel Routes 允許你在同一個 Layout 中定義多個 Slot，這對於 Dashboard 非常有用。
            </p>
        </div>
    );
}
