import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 일치하지 않습니다.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass p-10 md:p-12 rounded-[40px] shadow-2xl bg-white/80 border border-white">
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-primary/10 rounded-3xl text-primary mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-bold">관리자 로그인</h1>
            <p className="text-text-muted mt-2 text-sm">향기재가센터 관리 시스템에 접속합니다.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm flex items-center gap-2 border border-red-100">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2 ml-1">이메일 계정</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 ml-1">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all bg-white"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  로그인 중...
                </>
              ) : (
                '관리자 접속하기'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-text-muted">
            계정 정보 분실 시 관리자에게 문의해 주세요.
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-sm text-text-muted hover:text-primary transition-colors">
            ← 메인 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
