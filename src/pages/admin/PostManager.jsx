import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Eye, 
  Lock, 
  Pin,
  Clock,
  Search
} from 'lucide-react';

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'notice',
    is_private: false,
    is_fixed: false
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('is_fixed', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setPosts(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('posts').insert([formData]);
    if (error) alert('저장 실패');
    else {
      setShowForm(false);
      setFormData({ title: '', content: '', category: 'notice', is_private: false, is_fixed: false });
      fetchPosts();
    }
  };

  const deletePost = async (id) => {
    // 확인 창을 모달로 대체했으므로 여기서는 바로 삭제 로직 실행
    setDeleteConfirmId(null);
    
    try {
      // 1. 댓글 삭제 시도
      const { error: commentError } = await supabase.from('comments').delete().eq('post_id', id);
      if (commentError && commentError.code !== 'PGRST116') {
        console.warn('Comment delete warning:', commentError);
      }

      // 2. 게시글 삭제 시도
      const { data, error: postError } = await supabase.from('posts').delete().eq('id', id).select();
      
      if (postError) {
        alert('❌ 삭제 실패 (DB 에러):\n' + postError.message);
      } else if (data && data.length === 0) {
        alert('⚠️ 보안 경고: 삭제 권한이 거부되었습니다.\nSupabase 대시보드의 SQL Editor에서 [RLS 보안 해제 쿼리]를 실행하셔야 정상 삭제가 가능합니다.');
      } else {
        fetchPosts();
      }
    } catch (err) {
      alert('❌ 예상치 못한 오류 발생:\n' + err.message);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* 커스텀 삭제 확인 모달 */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-3">정말 삭제하시겠습니까?</h3>
            <p className="text-text-muted mb-8">이 작업은 되돌릴 수 없으며, 연결된 댓글도 함께 삭제됩니다.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="px-6 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition-all text-gray-700"
              >
                취소
              </button>
              <button 
                onClick={() => deletePost(deleteConfirmId)}
                className="px-6 py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 transition-all text-white shadow-lg shadow-red-500/30"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">게시글 및 공지 관리 (CMS)</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg shadow-primary/20"
        >
          {showForm ? '닫기' : <><Plus size={20} /> 새 글 작성</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-[40px] shadow-xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 ml-1">제목</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:border-primary focus:outline-none"
                placeholder="공지사항 제목을 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 ml-1">카테고리</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white"
              >
                <option value="notice">공지사항</option>
                <option value="news">센터 소식</option>
                <option value="community">커뮤니티</option>
              </select>
            </div>
            <div className="flex items-center gap-6 px-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.is_fixed}
                  onChange={(e) => setFormData({...formData, is_fixed: e.target.checked})}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-sm font-semibold">상단 고정</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.is_private}
                  onChange={(e) => setFormData({...formData, is_private: e.target.checked})}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-sm font-semibold">비밀글</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 ml-1">내용</label>
              <textarea 
                rows="8"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:border-primary focus:outline-none"
                placeholder="내용을 작성하세요"
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-8 py-4 rounded-2xl font-bold bg-gray-100 hover:bg-gray-200 transition-all">취소</button>
            <button type="submit" className="btn-primary px-12 py-4 rounded-2xl font-bold">글 저장하기</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-sm font-bold text-text-muted">상태</th>
                <th className="px-8 py-5 text-sm font-bold text-text-muted">제목</th>
                <th className="px-8 py-5 text-sm font-bold text-text-muted">카테고리</th>
                <th className="px-8 py-5 text-sm font-bold text-text-muted text-center">조회수</th>
                <th className="px-8 py-5 text-sm font-bold text-text-muted">작성일</th>
                <th className="px-8 py-5 text-sm font-bold text-text-muted text-right">관리</th>
              </tr>
            </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex gap-2">
                    {post.is_fixed && <Pin size={16} className="text-primary" />}
                    {post.is_private && <Lock size={16} className="text-gray-400" />}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="font-semibold text-gray-800">{post.title}</div>
                  <div className="text-xs text-text-muted mt-1 truncate max-w-xs">{post.content.substring(0, 50)}...</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                    {post.category === 'notice' ? '공지사항' : post.category === 'news' ? '센터 소식' : '커뮤니티(FAQ)'}
                  </span>
                </td>
                <td className="px-8 py-5 text-center text-sm">{post.view_count}</td>
                <td className="px-8 py-5 text-sm text-text-muted">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => window.open(`/notice/${post.id}`, '_blank')}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-100"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteConfirmId(post.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default PostManager;
