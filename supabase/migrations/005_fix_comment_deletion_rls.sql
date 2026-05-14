-- 005_fix_comment_deletion_rls.sql
-- 댓글 삭제 권한 오류 수정 (일반 사용자도 삭제 가능하도록 허용)

-- 기존 정책 삭제 (있을 경우)
DROP POLICY IF EXISTS "Public delete access for comments" ON comments;

-- 누구나 삭제를 "시도"는 할 수 있게 오픈 (실제 삭제는 eq('password', ...) 조건으로 제어)
CREATE POLICY "Public delete access for comments" ON comments FOR DELETE USING (true);

-- 참고: 더 안전하게 하려면 USING (auth.role() = 'authenticated') 또는 
-- 특정 조건을 걸어야 하지만, 익명 게시판 특성상 모든 사용자가 
-- 삭제 요청을 보낼 수 있게 하고 쿼리문에서 비밀번호를 검증합니다.
