import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Coffee } from 'lucide-react';

const services = [
  {
    title: '방문요양 서비스',
    description: '전문 요양보호사가 어르신의 댁으로 방문하여 신체 활동 지원, 가사 지원 등 맞춤형 돌봄을 제공합니다.',
    icon: <Home size={32} className="text-primary" />,
    features: ['신체 수발 서비스', '정서 지원 상담', '개인 활동 보조'],
    color: 'bg-pink-50'
  },
  {
    title: '방문목욕 서비스',
    description: '어르신의 청결과 건강을 위해 전문 장비를 갖춘 요양보호사가 정성껏 목욕 서비스를 도와드립니다.',
    icon: <Heart size={32} className="text-primary" />,
    features: ['위생 관리 지원', '피부 건강 체크', '심신 안정 도움'],
    color: 'bg-purple-50'
  }
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">향기재가센터만의 <span className="text-gradient">특별한 서비스</span></h2>
          <p className="text-text-muted max-w-2xl mx-auto">어르신의 건강한 노후와 가족의 행복을 위해 정성을 다하는 향기재가센터의 맞춤형 돌봄 서비스를 확인해 보세요.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="p-8 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              style={{ backgroundColor: '#fff' }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`} style={{ backgroundColor: index === 1 ? 'var(--secondary)' : 'var(--background)' }}>
                {service.icon}
              </div>
              <h3 className="text-xl mb-4">{service.title}</h3>
              <p className="text-text-muted mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
