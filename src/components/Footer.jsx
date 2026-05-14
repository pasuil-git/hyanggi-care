import React from 'react';
import { Phone, MapPin, Mail, Camera, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
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
            <h4 className="text-lg font-bold mb-6">연락처</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary" />
                <span>032-563-8927 (상담 가능)</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-secondary" />
                <span>인천광역시 서구 서곶로 818, 상가동 203호(당하동, 당하탑스빌아파트)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary" />
                <span>hyanggi_care@naver.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© 2021 향기재가노인복지센터. 모든 권리 보유.</p>
            <Link to="/admin/login" className="hover:text-white transition-colors">관리자 로그인</Link>
          </div>
          <p className="mt-2 md:mt-0 font-medium">대표자: 장선영 | 사업자등록번호: 734-80-01894</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
