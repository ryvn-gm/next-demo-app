import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Next.js Demo App</CardTitle>
          <CardDescription>
            Explore the interactive tutorials to learn Next.js features.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
            <Link href="/tutorials">
              <Button size="lg">Go to Tutorials</Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  )
}
