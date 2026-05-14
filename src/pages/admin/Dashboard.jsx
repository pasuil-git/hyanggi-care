import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Users, 
  FileText, 
  Calendar, 
  ArrowUpRight, 
  MessageSquare,
  Clock,
  CheckCircle2
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingConsultations: 0,
    totalConsultations: 0,
    totalPosts: 0,
    completedConsultations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    
    // 1. 신규(대기) 상담 수
    const { count: pendingCount } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // 2. 전체 상담 수
    const { count: totalCount } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true });

    // 3. 완료된 상담 수
    const { count: completedCount } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // 4. 전체 게시글 수
    const { count: postCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });

    setStats({
      pendingConsultations: pendingCount || 0,
      totalConsultations: totalCount || 0,
      totalPosts: postCount || 0,
      completedConsultations: completedCount || 0
    });
    setLoading(false);
  };

  const statCards = [
    { 
      label: '신규 상담 (대기)', 
      value: stats.pendingConsultations, 
      unit: '건', 
      icon: <Clock className="text-yellow-500" />, 
      color: 'bg-yellow-50',
      desc: '확인이 필요한 새 상담'
    },
    { 
      label: '누적 상담건수', 
      value: stats.totalConsultations, 
      unit: '건', 
      icon: <Users className="text-primary" />, 
      color: 'bg-primary/5',
      desc: '총 상담 신청 내역'
    },
    { 
      label: '전체 게시글', 
      value: stats.totalPosts, 
      unit: '개', 
      icon: <FileText className="text-green-500" />, 
      color: 'bg-green-50',
      desc: '공지 및 소식글'
    },
    { 
      label: '상담 완료', 
      value: stats.completedConsultations, 
      unit: '건', 
      icon: <CheckCircle2 className="text-blue-500" />, 
      color: 'bg-blue-50',
      desc: '상담이 종료된 사례'
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">통합 대시보드</h1>
          <p className="text-text-muted">향기재가센터 운영 현황을 한눈에 확인하세요.</p>
        </div>
        <button 
          onClick={fetchStats}
          className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
        >
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="glass p-8 rounded-[32px] shadow-sm border border-transparent hover:border-primary/10 transition-all">
            <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
              {card.icon}
            </div>
            <div className="text-sm text-text-muted mb-1">{card.label}</div>
            <div className="flex items-baseline gap-1">
              <div className="text-4xl font-bold">{loading ? '...' : card.value}</div>
              <div className="text-lg font-semibold text-text-muted">{card.unit}</div>
            </div>
            <div className="mt-4 text-xs text-text-muted">{card.desc}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-[40px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare size={20} className="text-primary" /> 실시간 알림 센터
          </h3>
          <div className="space-y-4">
            {stats.pendingConsultations > 0 ? (
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="text-sm">
                  <span className="font-bold text-yellow-700">{stats.pendingConsultations}건</span>의 새로운 상담 신청이 대기 중입니다.
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-2xl text-sm text-text-muted text-center py-10">
                새로운 알림이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="glass p-8 rounded-[40px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-primary" /> 운영 요약
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <span className="text-sm text-text-muted">상담 완료율</span>
              <span className="font-bold">{stats.totalConsultations > 0 ? Math.round((stats.completedConsultations / stats.totalConsultations) * 100) : 0}%</span>
            </div>
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <span className="text-sm text-text-muted">이번 달 신규 게시글</span>
              <span className="font-bold">{stats.totalPosts}개</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
