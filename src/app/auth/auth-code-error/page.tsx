// app/auth/auth-code-error/page.tsx - Error page for auth failures
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <CardTitle className="text-xl">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Sorry, we couldn't complete your authentication. This could happen if:
          </p>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li>• The authentication link expired</li>
            <li>• The link was already used</li>
            <li>• There was a network error</li>
          </ul>
          <div className="pt-4">
            <Button asChild className="w-full">
              <Link href="/">Try Again</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}