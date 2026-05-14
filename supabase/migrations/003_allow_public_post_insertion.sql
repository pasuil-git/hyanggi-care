-- 003_allow_public_post_insertion.sql
-- 사용자가 게시판에 직접 글을 쓸 수 있도록 권한 조정

-- 1. posts 테이블에 비밀번호 필드 추가 (나중에 본인 확인용)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS password TEXT;

-- 2. 누구나 게시글을 작성할 수 있도록 정책 추가
-- (기존에는 인증된 관리자만 가능했으나, 이제 일반 사용자도 가능하게 변경)
DROP POLICY IF EXISTS "Admin full access for posts" ON posts;
CREATE POLICY "Admin full access for posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public insert access for community posts" ON posts FOR INSERT WITH CHECK (true);

-- 3. 본인이 쓴 글만 비밀번호로 수정/삭제할 수 있는 로직은 애플리케이션 단에서 처리하거나 
-- RLS를 고도화할 수 있으나, 우선은 삽입 권한만 오픈합니다.
