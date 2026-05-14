import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Menu,
  X,
  Loader2
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
    } else {
      setUser(user);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-50"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  if (!user) return null;

  const menuItems = [
    { name: '대시보드', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: '상담 관리', path: '/admin/consultations', icon: <Users size={20} /> },
    { name: '게시글 관리', path: '/admin/posts', icon: <FileText size={20} /> },
    { name: '갤러리 관리', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: '사이트 설정', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
          ${isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl text-primary">관리자 모드</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-xl">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                // 모바일에서는 메뉴 클릭 시 사이드바 닫기
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-text-muted hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-semibold whitespace-nowrap">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-semibold whitespace-nowrap">로그아웃</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto w-full">
        {/* 모바일용 헤더 햄버거 버튼 */}
        <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl">
            <Menu size={24} className="text-primary" />
          </button>
          <span className="font-bold text-lg text-primary ml-4">향기재가센터 관리자</span>
        </div>
        
        <div className="p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
