import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Phone, 
  User, 
  Calendar, 
  MessageSquare, 
  Tag, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const ConsultationManager = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching:', error);
    else setConsultations(data);
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('consultations')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) alert('상태 업데이트 실패');
    else fetchConsultations();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'contacted': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return '대기 중';
      case 'contacted': return '상담 진행';
      case 'completed': return '완료';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">상담 및 고객 관리 (CRM)</h1>
        <button 
          onClick={fetchConsultations}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
        >
          새로고침
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <Clock className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="grid gap-6">
          {consultations.length === 0 ? (
            <div className="glass p-20 text-center text-text-muted rounded-[40px]">
              <AlertCircle className="mx-auto mb-4 opacity-20" size={60} />
              <p>아직 접수된 상담 신청이 없습니다.</p>
            </div>
          ) : (
            consultations.map((item) => (
              <div key={item.id} className="glass p-8 rounded-[32px] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="text-xl font-bold flex items-center gap-2">
                        {item.name} 
                        <span className="text-sm font-normal text-text-muted">({item.age || '?'}세)</span>
                      </div>
                      <div className="text-sm text-text-muted flex items-center gap-1 mt-1">
                        <Phone size={14} /> {item.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                    <select 
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      value={item.status}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                    >
                      <option value="pending">대기 중</option>
                      <option value="contacted">상담 진행</option>
                      <option value="completed">완료</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 bg-gray-50/50 p-6 rounded-2xl">
                  <div>
                    <div className="text-xs text-text-muted mb-1 flex items-center gap-1"><Tag size={12}/> 서비스</div>
                    <div className="font-semibold text-sm">{item.service_type}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1 flex items-center gap-1"><Calendar size={12}/> 희망 날짜</div>
                    <div className="font-semibold text-sm">{item.preferred_date || '미지정'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1 flex items-center gap-1"><Clock size={12}/> 희망 시간</div>
                    <div className="font-semibold text-sm">{item.preferred_time}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1 flex items-center gap-1"><User size={12}/> 장기요양등급</div>
                    <div className="font-semibold text-sm">{item.grade}</div>
                  </div>
                </div>

                {item.message && (
                  <div className="mt-6 flex gap-3 items-start p-4 bg-primary/5 rounded-2xl">
                    <MessageSquare className="text-primary shrink-0 mt-1" size={18} />
                    <p className="text-sm leading-relaxed">{item.message}</p>
                  </div>
                )}
                
                <div className="mt-6 text-xs text-text-muted text-right">
                  신청 일시: {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ConsultationManager;
