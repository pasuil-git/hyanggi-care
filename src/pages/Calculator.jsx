import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, Info, RefreshCw } from 'lucide-react';

const Calculator = () => {
  const [grade, setGrade] = useState('3등급');
  const [hours, setHours] = useState(3);
  const [days, setDays] = useState(20);
  const [reduction, setReduction] = useState(0.15); // 기본 15%

  const [result, setResult] = useState({
    total: 0,
    subsidy: 0,
    selfPay: 0,
    limit: 0
  });

  // 등급별 월 한도액 (2024년 기준 대략치)
  const limits = {
    '1등급': 2069900,
    '2등급': 1869600,
    '3등급': 1455800,
    '4등급': 1341700,
    '5등급': 1151600
  };

  // 시간별 단가 (방문요양 기준 대략치)
  const hourlyRates = {
    3: 54340,
    4: 63000
  };

  useEffect(() => {
    const total = hourlyRates[hours] * days;
    const limit = limits[grade];
    const finalTotal = Math.min(total, limit);
    const selfPay = Math.floor(finalTotal * reduction);
    const subsidy = finalTotal - selfPay;

    setResult({
      total: finalTotal,
      subsidy,
      selfPay,
      limit
    });
  }, [grade, hours, days, reduction]);

  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="container max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-primary/10 rounded-2xl text-primary mb-4">
            <CalcIcon size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">장기요양 본인부담금 계산기</h1>
          <p className="text-text-muted">어르신의 등급과 이용 시간을 선택하시면 예상 비용을 바로 확인하실 수 있습니다.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div className="glass p-8 rounded-[40px] shadow-xl space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">장기요양 등급</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(limits).map(g => (
                  <button 
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`py-3 rounded-xl border transition-all ${grade === g ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white border-gray-200 hover:border-primary'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">일일 이용 시간</label>
              <div className="flex gap-2">
                {[3, 4].map(h => (
                  <button 
                    key={h}
                    onClick={() => setHours(h)}
                    className={`flex-1 py-3 rounded-xl border transition-all ${hours === h ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white border-gray-200 hover:border-primary'}`}
                  >
                    {h}시간
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">월 이용 일수 (일)</label>
              <input 
                type="range" 
                min="1" 
                max="31" 
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="text-right font-bold mt-2 text-primary">{days}일</div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">본인부담 요율</label>
              <select 
                value={reduction}
                onChange={(e) => setReduction(parseFloat(e.target.value))}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white"
              >
                <option value={0.15}>일반 (15%)</option>
                <option value={0.09}>감경 대상자 (9%)</option>
                <option value={0.06}>감경 대상자 (6%)</option>
                <option value={0.0}>기초생활수급자 (0%)</option>
              </select>
            </div>
          </div>

          {/* 결과창 */}
          <div className="bg-primary text-white p-8 rounded-[40px] shadow-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Info size={20} /> 예상 월 이용료 상세
              </h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span>총 급여 비용</span>
                  <span className="text-xl font-bold">{result.total.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span>국가 지원금 (공단)</span>
                  <span className="text-xl font-bold text-secondary">{result.subsidy.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg">실제 본인부담금</span>
                  <div className="text-right">
                    <div className="text-3xl font-black text-secondary">{result.selfPay.toLocaleString()}원</div>
                    <div className="text-xs opacity-70 mt-1">*{grade} 기준 월 한도액 초과 시 전액 본인부담</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-white/10 rounded-2xl text-sm leading-relaxed">
              위 계산 결과는 방문요양 서비스를 기준으로 한 예상 금액이며, 실제 등급 인정 점수 및 서비스 제공 시간에 따라 차이가 발생할 수 있습니다. 정확한 견적은 상담을 통해 확인해 주세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
