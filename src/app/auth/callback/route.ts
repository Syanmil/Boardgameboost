// app/auth/callback/route.ts - Modern auth callback with @supabase/ssr
import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/'

  console.log('Auth callback params:', { code, error, errorDescription, next })

  // Handle errors from auth provider
  if (error) {
    console.error('Auth callback error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${error}&description=${errorDescription}`)
  }

  if (code) {
    try {
      const supabase = await createServerSupabaseClient()
      console.log('Exchanging code for session...')
      
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=exchange_failed`)
      }

      console.log('Code exchange successful, user:', data.user?.email)
      
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } catch (err) {
      console.error('Callback error:', err)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=callback_failed`)
    }
  }

  // No code parameter - invalid callback
  console.error('No code parameter in callback')
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code`)
}