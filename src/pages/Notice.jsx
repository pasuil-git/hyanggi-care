import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Megaphone, 
  Search, 
  Calendar, 
  ChevronRight, 
  MessageSquare,
  Lock,
  Pin,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notice = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    author_name: '',
    password: '',
    content: '',
    category: 'community'
  });

  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from('posts')
      .select('*, comments(count)')
      .order('is_fixed', { ascending: false })
      .order('created_at', { ascending: false });

    if (activeCategory !== 'all') {
      query = query.eq('category', activeCategory);
    }

    const { data, error } = await query;
    if (!error) setPosts(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('posts').insert([newPost]);
    if (error) {
      alert('글 저장에 실패했습니다. 다시 시도해 주세요.');
    } else {
      alert('성공적으로 등록되었습니다.');
      setIsWriteModalOpen(false);
      setNewPost({ title: '', author_name: '', password: '', content: '', category: 'community' });
      fetchPosts();
    }
    setLoading(false);
  };

  const categories = [
    { id: 'all', name: '전체보기' },
    { id: 'notice', name: '공지사항' },
    { id: 'news', name: '센터 소식' },
    { id: 'community', name: '커뮤니티(FAQ)' },
  ];

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-4"
          >
            센터 소식 및 게시판
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            향기 <span className="text-gradient">커뮤니티</span>
          </motion.h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            향기재가센터의 새로운 소식과 유용한 정보를 전해드립니다. <br />
            어르신 돌봄에 관한 다양한 이야기를 함께 나누어 보세요.
          </p>
        </div>

        {/* Filter & Search & Write Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-text-muted hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="검색어를 입력하세요"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
              />
            </div>
            {activeCategory === 'community' && (
              <button 
                onClick={() => setIsWriteModalOpen(true)}
                className="bg-primary text-white px-8 py-3.5 rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2 whitespace-nowrap"
              >
                <Plus size={20} /> 글쓰기
              </button>
            )}
          </div>
        </div>

        {/* Post List */}
        <div className="grid gap-6">
          {loading && posts.length === 0 ? (
            <div className="text-center p-20 text-text-muted">불러오는 중...</div>
          ) : posts.length === 0 ? (
            <div className="glass p-20 text-center text-text-muted rounded-[40px]">
              <Megaphone className="mx-auto mb-4 opacity-20" size={60} />
              <p>등록된 게시글이 없습니다.</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div 
                layout
                key={post.id}
                onClick={() => navigate(`/notice/${post.id}`)}
                className={`glass p-6 md:p-8 rounded-[32px] shadow-sm hover:shadow-md transition-all group cursor-pointer ${post.is_fixed ? 'border-primary/20 bg-primary/[0.02]' : 'border-transparent'}`}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      {post.is_fixed && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full">
                          <Pin size={10} /> 필독
                        </span>
                      )}
                      <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                        {post.category === 'notice' ? '공지사항' : post.category === 'news' ? '센터 소식' : '커뮤니티(FAQ)'}
                      </span>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Calendar size={12} /> {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      {post.author_name && (
                        <span className="text-xs text-text-muted">| {post.author_name}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                      {post.title}
                      {post.is_private && <Lock size={16} className="text-gray-400" />}
                    </h3>
                    <p className="text-text-muted line-clamp-2 leading-relaxed mb-4">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-6 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare size={14}/> 댓글 {post.comments?.[0]?.count || 0}
                      </span>
                      <span className="flex items-center gap-1.5">조회수 {post.view_count || 0}</span>
                      <span className="ml-auto font-bold text-primary flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        자세히 보기 <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Write Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white p-8 rounded-[40px] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold mb-8">글 작성하기</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 ml-1">제목</label>
                    <input 
                      type="text" 
                      required
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary focus:outline-none"
                      placeholder="제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1">작성자</label>
                    <input 
                      type="text" 
                      required
                      value={newPost.author_name}
                      onChange={(e) => setNewPost({...newPost, author_name: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary focus:outline-none"
                      placeholder="이름"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1">비밀번호 (수정/삭제용)</label>
                    <input 
                      type="password" 
                      required
                      value={newPost.password}
                      onChange={(e) => setNewPost({...newPost, password: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary focus:outline-none"
                      placeholder="비밀번호"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 ml-1">내용</label>
                    <textarea 
                      rows="6"
                      required
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary focus:outline-none"
                      placeholder="내용을 입력하세요"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-8 py-4 rounded-2xl font-bold bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    취소
                  </button>
                  <button 
                    type="submit" 
                    className="bg-primary text-white px-12 py-4 rounded-2xl font-bold"
                    disabled={loading}
                  >
                    {loading ? '저장 중...' : '등록하기'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notice;
