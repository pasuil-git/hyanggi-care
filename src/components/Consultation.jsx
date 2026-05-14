import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Consultation = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    grade: '등급 없음 (신규 신청)',
    location: '',
    service_type: '주야간보호 (데이케어)',
    preferred_date: '',
    preferred_time: '오전 (09:00~12:00)',
    message: '',
    privacy_agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.privacy_agree) {
      alert('개인정보 수집 및 활용에 동의해 주세요.');
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase
        .from('consultations')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            age: formData.age ? parseInt(formData.age) : null,
            grade: formData.grade,
            location: formData.location,
            service_type: formData.service_type,
            preferred_date: formData.preferred_date || null,
            preferred_time: formData.preferred_time,
            message: formData.message,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        age: '',
        grade: '등급 없음 (신규 신청)',
        location: '',
        service_type: '주야간보호 (데이케어)',
        preferred_date: '',
        preferred_time: '오전 (09:00~12:00)',
        message: '',
        privacy_agree: false
      });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting consultation:', error.message);
      alert('상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultation" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary opacity-10 blur-3xl -z-10" />
      
      <div className="container">
        <div className="max-w-6xl mx-auto glass rounded-[40px] p-8 md:p-16 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl md:text-4xl mb-6 font-bold">전문 상담사와 <br /><span className="text-gradient">무료 상담 신청</span></h2>
              <p className="text-text-muted mb-8">
                어르신의 상황에 맞는 가장 적합한 서비스를 안내해 드립니다. <br />
                궁금하신 내용을 남겨주시면 24시간 이내에 전문 상담사가 연락드리겠습니다.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div className="font-bold">국가보조금 안내</div>
                    <div className="text-sm text-text-muted">장기요양등급 신청 및 국비 지원 혜택 상세 안내</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div className="font-bold">맞춤 케어 플랜</div>
                    <div className="text-sm text-text-muted">어르신 개개인의 건강 상태를 고려한 전담 플랜 수립</div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="md:col-span-2 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">신청자 성함</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="성함을 입력해 주세요" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">연락처</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">어르신 연령</label>
                <input 
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="예: 85" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">장기요양등급</label>
                <select 
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                >
                  <option>등급 없음 (신규 신청)</option>
                  <option>1등급</option>
                  <option>2등급</option>
                  <option>3등급</option>
                  <option>4등급</option>
                  <option>5등급</option>
                  <option>인지지원등급</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">거주지 정보 (구/동)</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="예: 인천 서구 당하동" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">상담 희망 서비스</label>
                <select 
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                >
                  <option>주야간보호 (데이케어)</option>
                  <option>방문요양</option>
                  <option>방문목욕</option>
                  <option>등급 신청 문의</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">방문 상담 희망 날짜</label>
                <input 
                  type="date" 
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">희망 시간대</label>
                <select 
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                >
                  <option>오전 (09:00~12:00)</option>
                  <option>오후 (12:00~18:00)</option>
                  <option>저녁 (18:00 이후)</option>
                  <option>상관없음</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">문의 내용</label>
                <textarea 
                  rows="3" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="궁금하신 점을 자유롭게 적어주세요" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                ></textarea>
              </div>
              <div className="md:col-span-2 flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <input 
                  type="checkbox" 
                  name="privacy_agree"
                  id="privacy_agree"
                  checked={formData.privacy_agree}
                  onChange={handleChange}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="privacy_agree" className="text-sm text-text-muted cursor-pointer">
                  개인정보 수집 및 이용에 동의합니다. (상담 목적 외 미사용)
                </label>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  disabled={loading || submitted}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${submitted ? 'bg-green-500 text-white' : 'btn-primary'} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      전송 중...
                    </>
                  ) : submitted ? (
                    <>전송 완료! 곧 연락드리겠습니다.</>
                  ) : (
                    <>
                      <Send size={18} />
                      상담 신청하기
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Consultation;

