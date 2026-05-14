import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  MessageSquare, 
  Send,
  Trash2,
  Lock,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newComment, setNewComment] = useState({
    author_name: '관리자',
    content: ''
  });

  useEffect(() => {
    fetchPost();
    fetchComments();
    incrementViewCount();
    checkAdmin();
  }, [id]);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);
  };

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      alert('게시글을 찾을 수 없습니다.');
      navigate('/notice');
    } else {
      setPost(data);
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    
    if (!error) setComments(data);
    setLoading(false);
  };

  const incrementViewCount = async () => {
    const { data: currentPost } = await supabase.from('posts').select('view_count').eq('id', id).single();
    if (currentPost) {
      await supabase.from('posts').update({ view_count: (currentPost.view_count || 0) + 1 }).eq('id', id);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.content) return;

    const { error } = await supabase
      .from('comments')
      .insert([{ 
        post_id: id, 
        content: newComment.content,
        author_name: '관리자' 
      }]);

    if (error) {
      alert('댓글 등록에 실패했습니다.');
    } else {
      setNewComment({ author_name: '관리자', content: '' });
      fetchComments();
    }
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const deleteComment = async (commentId) => {
    // 확인 창을 모달로 대체했으므로 여기서는 바로 삭제 로직 실행
    setDeleteConfirmId(null);

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      alert('삭제 중 오류가 발생했습니다.');
    } else {
      fetchComments();
    }
  };

  if (loading || !post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen relative">
      {/* 커스텀 삭제 확인 모달 */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-3">정말 삭제하시겠습니까?</h3>
            <p className="text-text-muted mb-8">이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="px-6 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition-all text-gray-700"
              >
                취소
              </button>
              <button 
                onClick={() => deleteComment(deleteConfirmId)}
                className="px-6 py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 transition-all text-white shadow-lg shadow-red-500/30"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-4xl">
        <button 
          onClick={() => navigate('/notice')}
          className="flex items-center gap-2 text-text-muted hover:text-primary mb-8 transition-colors font-semibold"
        >
          <ChevronLeft size={20} /> 목록으로 돌아가기
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden mb-10"
        >
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-primary/10 text-primary font-bold text-xs rounded-full">
                {post.category === 'notice' ? '공지사항' : post.category === 'news' ? '센터 소식' : '커뮤니티(FAQ)'}
              </span>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span className="flex items-center gap-1.5"><Calendar size={14}/> {new Date(post.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><User size={14}/> {post.author_name || '관리자'}</span>
                <span>조회수 {post.view_count}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {post.title}
              {post.is_private && <Lock size={24} className="inline ml-2 text-gray-400" />}
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 min-h-[300px]">
            <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold flex items-center gap-2 px-2">
            <MessageSquare size={24} className="text-primary" /> 
            댓글 <span className="text-primary">{comments.length}</span>
          </h3>

          {/* Comment Form - Only for Admin */}
          {isAdmin && (
            <form onSubmit={handleCommentSubmit} className="glass p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">관리자 답변 작성</span>
              </div>
              <div className="relative">
                <textarea 
                  rows="3"
                  placeholder="답변 내용을 입력하세요."
                  value={newComment.content}
                  onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white resize-none"
                  required
                ></textarea>
                <button 
                  type="submit"
                  className="absolute right-3 bottom-3 p-3 bg-primary text-white rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/20"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          )}

          {/* Comment List */}
          <div className="space-y-4 px-2">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 group">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold shrink-0">
                  {comment.author_name[0]}
                </div>
                <div className="flex-grow bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-primary">{comment.author_name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-muted">{new Date(comment.created_at).toLocaleString()}</span>
                      {isAdmin && (
                        <button 
                          onClick={() => setDeleteConfirmId(comment.id)}
                          className="p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center py-10 text-text-muted text-sm">아직 등록된 답변이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
