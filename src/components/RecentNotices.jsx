import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bell, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentNotices = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentNotices();
  }, []);

  const fetchRecentNotices = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, created_at, category')
      .order('is_fixed', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(3);

    if (!error && data) {
      setNotices(data);
    }
  };

  if (notices.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-4xl">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Bell className="text-primary" size={24} /> 
            새로운 소식
          </h2>
          <button 
            onClick={() => navigate('/notice')}
            className="text-sm font-semibold text-text-muted hover:text-primary flex items-center gap-1 transition-colors"
          >
            더보기 <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <ul className="divide-y divide-gray-100">
            {notices.map((notice, index) => (
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={notice.id}
              >
                <button
                  onClick={() => navigate(`/notice/${notice.id}`)}
                  className="w-full text-left p-5 md:px-8 hover:bg-white transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                      notice.category === 'notice' ? 'bg-primary/10 text-primary' : 
                      notice.category === 'news' ? 'bg-blue-100 text-blue-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {notice.category === 'notice' ? '공지사항' : notice.category === 'news' ? '센터 소식' : '커뮤니티(FAQ)'}
                    </span>
                    <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                      {notice.title}
                    </span>
                  </div>
                  <span className="text-sm text-text-muted flex items-center gap-1.5 ml-1 md:ml-0 shrink-0">
                    <Calendar size={14} />
                    {new Date(notice.created_at).toLocaleDateString()}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RecentNotices;
