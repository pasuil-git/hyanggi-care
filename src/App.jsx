import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Consultation from './components/Consultation';
import Footer from './components/Footer';
import './index.css';

import aboutCenterImg from './assets/about_center.jpg';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <section id="about" className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-gray-100">
                  <img 
                    src={aboutCenterImg} 
                    alt="향기재가센터 내부" 
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Decorative background element */}
                <div className="absolute -top-6 -left-6 w-full h-full bg-secondary/20 rounded-[40px] -z-10"></div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-1.5 bg-white rounded-full text-primary font-semibold text-sm mb-6 shadow-sm">
                  센터 소개
                </div>
                <h2 className="text-3xl md:text-4xl mb-6 font-bold">인천 서구의 자랑, <br /><span className="text-gradient">향기재가노인복지센터</span>입니다.</h2>
                <p className="text-text-muted mb-8 leading-relaxed text-lg">
                  인천 서구 당하동에 위치한 저희 센터는 96명의 전문 요양보호사와 사회복지사가 함께하는 대규모 재가복지 시설입니다. 
                  2021년 설립 이래, 지역 어르신들에게 가족 같은 따뜻함과 전문가의 세심한 손길을 전해드리고 있습니다.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                      👥
                    </div>
                    <div>
                      <div className="font-bold">96명의 돌봄 전문가</div>
                      <div className="text-sm text-text-muted">숙련된 요양보호사 및 사회복지사 상주</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                      📍
                    </div>
                    <div>
                      <div className="font-bold">인천 서구 당하동</div>
                      <div className="text-sm text-text-muted">서곶로 816, 가동 205호 위치</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Services />
        <Consultation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
