import React from 'react';
import { Phone, MapPin, Mail, Camera, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-lg">
                香
              </div>
              <span className="text-xl font-bold">향기재가센터</span>
            </div>
            <p className="text-blue-100 text-sm mb-6">
              어르신의 향기로운 삶을 위해 <br />
              정성을 다하는 프리미엄 재가복지 센터입니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">주요 서비스</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li><a href="#daycare" className="hover:text-secondary">주야간보호 (데이케어)</a></li>
              <li><a href="#homecare" className="hover:text-secondary">방문요양 서비스</a></li>
              <li><a href="#homecare" className="hover:text-secondary">방문목욕 서비스</a></li>
              <li><a href="#consultation" className="hover:text-secondary">장기요양등급 신청 안내</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">고객 지원</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li><a href="#about" className="hover:text-secondary">센터 소개</a></li>
              <li><a href="#consultation" className="hover:text-secondary">자주 묻는 질문</a></li>
              <li><a href="#consultation" className="hover:text-secondary">공지사항</a></li>
              <li><a href="#consultation" className="hover:text-secondary">개인정보처리방침</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">연락처</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary" />
                <span>032-563-8927 (상담 가능)</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-secondary" />
                <span>인천광역시 서구 서곶로 816 가동 205호 (당하동)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary" />
                <span>hyanggi_care@naver.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:row justify-between items-center text-xs text-blue-200">
          <p>© 2024 향기재가노인복지센터. 모든 권리 보유.</p>
          <p className="mt-2 md:mt-0">대표자: 장선영 | 사업자등록번호: 617-86-14330</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
