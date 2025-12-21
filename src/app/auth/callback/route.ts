import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/setup-safety'

  if (code) {
    const supabase = createServerSupabaseClient()
    
    // Troca o código de autorização por uma sessão de usuário
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redireciona para a página de destino (setup-safety)
      return NextResponse.redirect(requestUrl.origin + next)
    }
  }

  // Retorna para a página de login em caso de erro
  return NextResponse.redirect(requestUrl.origin + '/login')
}