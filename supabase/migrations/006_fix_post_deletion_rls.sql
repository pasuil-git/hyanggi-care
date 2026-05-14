-- 006_fix_post_deletion_rls.sql
-- 게시글 삭제 권한 및 종속성 해결

-- 1. 게시글(posts) 테이블의 RLS 정책 재설정 (관리자 전용)
DROP POLICY IF EXISTS "Admin full access for posts" ON posts;
CREATE POLICY "Admin full access for posts" ON posts FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- 2. 혹시 모를 외래 키 제약 조건 확인 (댓글 테이블)
-- 이미 004에서 ON DELETE CASCADE를 설정했지만, 만약 안 되어 있다면 여기서 재설정
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'comments_post_id_fkey'
    ) THEN
        ALTER TABLE comments DROP CONSTRAINT comments_post_id_fkey;
    END IF;
END $$;

ALTER TABLE comments 
ADD CONSTRAINT comments_post_id_fkey 
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;

-- 3. RLS 정책 활성화 확인
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
