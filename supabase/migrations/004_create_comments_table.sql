-- 004_create_comments_table.sql
-- 게시글 댓글 기능을 위한 테이블 생성

CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  password TEXT -- 본인 삭제용 비밀번호
);

-- 보안 정책 (RLS) 설정
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 누구나 댓글 조회 가능
CREATE POLICY "Public read access for comments" ON comments FOR SELECT USING (true);

-- 누구나 댓글 작성 가능
CREATE POLICY "Public insert access for comments" ON comments FOR INSERT WITH CHECK (true);

-- 관리자는 모든 댓글 관리 가능
CREATE POLICY "Admin full access for comments" ON comments FOR ALL USING (auth.role() = 'authenticated');
