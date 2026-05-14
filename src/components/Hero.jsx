import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary opacity-10 rounded-l-[100px] -z-10" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary opacity-5 blur-3xl rounded-full -z-10" />

      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 bg-secondary rounded-full text-primary font-semibold text-sm mb-6">
            품격 있는 프리미엄 재가복지
          </div>
          <h1 className="text-4xl md:text-6xl leading-[1.2] mb-6">
            내 부모님을 모시는 마음으로, <br />
            <span className="text-gradient">품격 있는 돌봄</span>을 더합니다.
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-lg">
            향기재가센터는 어르신의 자존감을 존중하며, 가정처럼 편안하고 전문적인 케어를 제공합니다. 향기로운 일상을 선물해 드립니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
            <img src={heroImage} alt="Professional Caregiver" className="w-full h-auto object-cover" />
          </div>
          {/* Floating Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl shadow-xl z-20 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                1:1
              </div>
              <div>
                <div className="font-bold">맞춤 케어 시스템</div>
                <div className="text-sm text-text-muted">어르신 특성에 맞춘 전문 돌봄</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
