import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 Anon Key를 가져옵니다.
// VITE_ 접두사는 Vite 환경에서 클라이언트 측에 노출되는 변수임을 의미합니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase 설정이 누락되었습니다! .env 파일이나 Vercel 환경 변수 설정을 확인해주세요.');
}

// Supabase 클라이언트를 초기화합니다.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
