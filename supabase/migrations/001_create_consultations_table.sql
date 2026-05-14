-- 상담 신청 내역을 저장하는 테이블 생성
-- 파일명: 001_create_consultations_table.sql

CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' NOT NULL -- pending, contacted, completed 등 상태 관리 가능
);

-- 보안 설정: 익명 사용자가 데이터를 삽입(Insert)할 수 있도록 허용
-- 실제 서비스 운영 시에는 보안을 위해 RLS(Row Level Security) 설정을 검토해야 합니다.
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON consultations
  FOR SELECT USING (auth.role() = 'authenticated');
