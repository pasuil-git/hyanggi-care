import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Consultation = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="consultation" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary opacity-10 blur-3xl -z-10" />
      
      <div className="container">
        <div className="max-w-5xl mx-auto glass rounded-[40px] p-8 md:p-16 shadow-2xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl mb-6">전문 상담사와 <br /><span className="text-gradient">무료 상담 신청</span></h2>
            <p className="text-text-muted mb-8">
              어르신의 상황에 맞는 가장 적합한 서비스를 안내해 드립니다. <br />
              궁금하신 내용을 남겨주시면 24시간 이내에 전문 상담사가 연락드리겠습니다.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="font-bold">국가보조금 안내</div>
                  <div className="text-sm text-text-muted">장기요양등급 신청 및 국비 지원 혜택 상세 안내</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">신청자 성함</label>
              <input 
                type="text" 
                placeholder="성함을 입력해 주세요" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">연락처</label>
              <input 
                type="tel" 
                placeholder="010-0000-0000" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">상담 희망 서비스</label>
              <select className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white">
                <option>주야간보호 (데이케어)</option>
                <option>방문요양</option>
                <option>방문목욕</option>
                <option>등급 신청 문의</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">문의 내용 (선택사항)</label>
              <textarea 
                rows="4" 
                placeholder="궁금하신 점을 자유롭게 적어주세요" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary transition-all bg-white"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${submitted ? 'bg-green-500 text-white' : 'btn-primary'}`}
            >
              {submitted ? (
                <>전송 완료! 곧 연락드리겠습니다.</>
              ) : (
                <>
                  <Send size={18} />
                  상담 신청하기
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
