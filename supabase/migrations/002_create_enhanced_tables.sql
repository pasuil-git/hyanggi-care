-- 002_create_enhanced_tables.sql
-- 재가노인복지센터 리뉴얼을 위한 확장 테이블 설계

-- 1. 상담 테이블 확장 (기존 테이블에 필드 추가 및 수정)
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS grade TEXT; -- 장기요양등급
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS location TEXT; -- 거주지
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS admin_notes TEXT; -- 관리자 메모
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS source TEXT; -- 유입 경로 (인터넷, 소개 등)
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS preferred_date DATE; -- 방문 희망 날짜
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS preferred_time TEXT; -- 방문 희망 시간대

-- 2. 게시글 테이블 (공지사항 및 커뮤니티)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- notice, news, faq, community
  is_private BOOLEAN DEFAULT false, -- 비밀글 설정
  author_name TEXT,
  view_count INTEGER DEFAULT 0,
  is_fixed BOOLEAN DEFAULT false -- 상단 고정 여부
);

-- 3. 활동 갤러리 테이블
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'activity'
);

-- 4. 사이트 설정 테이블 (관리자 페이지에서 실시간 수정용)
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY, -- 'hero_title', 'about_text', 'service_prices' 등
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. 보안 정책 (RLS) 설정

-- Posts 정책
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Admin full access for posts" ON posts FOR ALL USING (auth.role() = 'authenticated');

-- Gallery 정책
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admin full access for gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- Site Settings 정책
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access for settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
