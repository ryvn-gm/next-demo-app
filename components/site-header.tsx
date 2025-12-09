import Link from 'next/link'

export async function SiteHeader() {
    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    
                    <nav className="flex items-center gap-6 text-sm">
                        <Link href="/tutorials" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                            Tutorials
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                </div>
            </div>
        </header>
    )
}
