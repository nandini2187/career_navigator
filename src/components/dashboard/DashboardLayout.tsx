import { useEffect, useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  BookOpen,
  FolderGit2,
  CreditCard,
  Target,
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { useAuth } from '@/context/AuthContext';
import { navigate, useRouter } from '@/lib/router';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Roadmap', path: '/dashboard/roadmap', icon: Target },
  { label: 'Courses', path: '/dashboard/courses', icon: BookOpen },
  { label: 'Projects', path: '/dashboard/projects', icon: FolderGit2 },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Billing', path: '/dashboard/billing', icon: CreditCard },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { profile, user, signOut } = useAuth();
  const { path } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [path]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const initials = (profile?.full_name || user?.email || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-ink-950 text-ink-300 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <button onClick={() => navigate('/')} aria-label="Home">
            <Logo textClass="text-white" showText />
          </button>
          <button
            className="rounded-lg p-1.5 text-ink-400 hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = path === item.path || (item.path !== '/dashboard' && path.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/20'
                    : 'text-ink-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Upgrade card */}
        <div className="m-4 rounded-2xl bg-gradient-to-br from-primary-600/20 to-accent-500/10 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-400" />
            <span className="text-xs font-semibold text-white">Go Premium</span>
          </div>
          <p className="mt-2 text-xs text-ink-400">Unlock unlimited AI mentorship and advanced prep.</p>
          <button onClick={() => navigate('/pricing')} className="mt-3 w-full rounded-lg bg-white/10 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
            Upgrade now
          </button>
        </div>

        <div className="border-t border-white/5 p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-400 transition-colors hover:bg-error-500/10 hover:text-error-400"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-ink-950/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-ink-100 bg-white/70 px-5 backdrop-blur-xl sm:px-8">
          <button
            className="rounded-lg p-2 text-ink-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden flex-1 sm:block">
            <div className="relative max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                className="w-full rounded-xl border border-ink-200 bg-white/60 py-2 pl-10 pr-4 text-sm placeholder-ink-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              className="relative rounded-xl p-2.5 text-ink-600 transition-colors hover:bg-ink-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-xl p-1.5 pr-3 transition-colors hover:bg-ink-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white">
                  {initials}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-ink-900">{profile?.full_name || 'Student'}</p>
                  <p className="text-xs text-ink-500 capitalize">{profile?.subscription_tier || 'free'} plan</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-ink-400 sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-glass-lg">
                  <div className="border-b border-ink-100 p-3">
                    <p className="text-sm font-semibold text-ink-900">{profile?.full_name || 'Student'}</p>
                    <p className="truncate text-xs text-ink-500">{user?.email}</p>
                  </div>
                  <button onClick={() => navigate('/profile')} className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-ink-700 hover:bg-ink-50">
                    <User className="h-4 w-4" /> Profile
                  </button>
                  <button onClick={() => navigate('/settings')} className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-ink-700 hover:bg-ink-50">
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button onClick={handleSignOut} className="flex w-full items-center gap-2.5 border-t border-ink-100 px-3 py-2.5 text-sm text-error-600 hover:bg-error-50">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-5 py-6 sm:px-8 lg:px-10">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
