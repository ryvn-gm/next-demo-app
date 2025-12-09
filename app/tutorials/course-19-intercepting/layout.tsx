import React, { ReactNode } from 'react';

/**
 * 為了讓 Intercepting Route 作為 Modal 顯示並保留背景，
 * 我們需要平行路由 (Parallel Route) `@modal`。
 */
export default function Layout({
    children,
    modal,
}: {
    children: ReactNode;
    modal: ReactNode;
}) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
