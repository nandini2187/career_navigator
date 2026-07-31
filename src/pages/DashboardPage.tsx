import { useEffect, useState } from 'react';
import {
  TrendingUp,
  BookOpen,
  FolderGit2,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  Bell,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Enrollment, Notification, Project } from '@/types/database';
import { navigate } from '@/lib/router';

const skillData = [
  { label: 'DSA', value: 85, color: 'from-primary-500 to-primary-600' },
  { label: 'System Design', value: 64, color: 'from-accent-500 to-accent-600' },
  { label: 'Web Dev', value: 78, color: 'from-warning-500 to-warning-600' },
  { label: 'DBMS', value: 72, color: 'from-success-500 to-success-600' },
  { label: 'Aptitude', value: 58, color: 'from-primary-400 to-accent-500' },
];

const weeklyActivity = [42, 58, 35, 70, 65, 88, 54];

const statCards = [
  { label: 'Placement Readiness', value: 78, suffix: '/100', icon: Award, trend: '+12%', up: true, accent: 'from-primary-500 to-primary-700' },
  { label: 'Courses Enrolled', value: 6, suffix: '', icon: BookOpen, trend: '+2', up: true, accent: 'from-accent-500 to-accent-700' },
  { label: 'Projects Built', value: 4, suffix: '', icon: FolderGit2, trend: '+1', up: true, accent: 'from-warning-500 to-warning-700' },
  { label: 'Mock Interviews', value: 9, suffix: '', icon: Target, trend: '+3', up: true, accent: 'from-success-500 to-success-700' },
];

const mockActivity = [
  { icon: CheckCircle2, text: 'Completed "Advanced DSA" module', time: '2 hours ago', color: 'text-success-600' },
  { icon: Award, text: 'Placement readiness increased to 78', time: '5 hours ago', color: 'text-primary-600' },
  { icon: FolderGit2, text: 'Added project "E-Commerce API"', time: 'Yesterday', color: 'text-warning-600' },
  { icon: BookOpen, text: 'Enrolled in "System Design Basics"', time: '2 days ago', color: 'text-accent-600' },
  { icon: Sparkles, text: 'AI Mentor suggested 3 new topics', time: '3 days ago', color: 'text-primary-600' },
];

export function DashboardPage() {
  const { profile } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!profile) return;
      const [enrollRes, projRes, notifRes] = await Promise.all([
        supabase.from('enrollments').select('*, course:courses(*)').eq('user_id', profile.id).order('enrolled_at', { ascending: false }).limit(4),
        supabase.from('projects').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }).limit(4),
        supabase.from('notifications').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }).limit(5),
      ]);
      if (enrollRes.data) setEnrollments(enrollRes.data as Enrollment[]);
      if (projRes.data) setProjects(projRes.data as Project[]);
      if (notifRes.data) setNotifications(notifRes.data as Notification[]);
      setLoading(false);
    }
    load();
  }, [profile]);

  const firstName = (profile?.full_name || 'there').split(' ')[0];
  const maxActivity = Math.max(...weeklyActivity);

  return (
    <DashboardLayout title={`Welcome back, ${firstName}`} subtitle="Here is your career progress at a glance.">
      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="flex items-start justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} shadow-lg`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <span className={`badge ${s.up ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.trend}
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-ink-900">
              {s.value}<span className="text-lg text-ink-400">{s.suffix}</span>
            </p>
            <p className="mt-1 text-sm text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Skill progress */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-ink-900">Skill Progress</h3>
              <p className="text-sm text-ink-500">Your proficiency across key areas</p>
            </div>
            <TrendingUp className="h-5 w-5 text-primary-600" />
          </div>
          <div className="mt-6 space-y-5">
            {skillData.map((s) => (
              <div key={s.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium text-ink-700">{s.label}</span>
                  <span className="font-semibold text-ink-900">{s.value}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly activity chart */}
        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-bold text-ink-900">Weekly Activity</h3>
          <p className="text-sm text-ink-500">Learning hours this week</p>
          <div className="mt-6 flex h-40 items-end justify-between gap-2">
            {weeklyActivity.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary-600 to-accent-400 transition-all duration-500"
                    style={{ height: `${(v / maxActivity) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-ink-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-50/60 px-4 py-3">
            <span className="text-sm text-ink-600">Total this week</span>
            <span className="font-display text-lg font-bold text-primary-700">{weeklyActivity.reduce((a, b) => a + b, 0)}h</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Enrollments */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-ink-900">Current Courses</h3>
            <button onClick={() => navigate('/dashboard/courses')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </button>
          </div>
          {loading ? (
            <div className="mt-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-ink-100" />
              ))}
            </div>
          ) : enrollments.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-ink-200 p-8 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-ink-300" />
              <p className="mt-3 text-sm text-ink-500">No courses yet. Start your roadmap to enroll.</p>
              <button onClick={() => navigate('/dashboard/roadmap')} className="btn-primary mt-4">
                Explore roadmap
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {enrollments.map((e) => (
                <div key={e.id} className="flex items-center gap-4 rounded-xl border border-ink-100 bg-white/50 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100">
                    <BookOpen className="h-6 w-6 text-primary-700" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{e.course?.title || 'Untitled course'}</p>
                    <p className="text-xs text-ink-500">{e.course?.provider || 'Self-paced'}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${e.progress}%` }} />
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-ink-700">{e.progress}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary-600" />
            <h3 className="font-display text-lg font-bold text-ink-900">Notifications</h3>
          </div>
          {notifications.length === 0 ? (
            <div className="mt-6 space-y-3">
              {[
                { icon: Sparkles, text: 'Complete your career assessment to unlock your roadmap', time: 'Just now' },
                { icon: Award, text: 'Your readiness score is ready to view', time: '1 hour ago' },
                { icon: Clock, text: 'Reminder: Practice 1 mock interview today', time: '3 hours ago' },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white/50 p-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <n.icon className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink-700">{n.text}</p>
                    <p className="mt-0.5 text-[10px] text-ink-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-3 rounded-xl border p-3.5 ${n.is_read ? 'border-ink-100 bg-white/50' : 'border-primary-200 bg-primary-50/50'}`}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                    <Bell className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-900">{n.title}</p>
                    <p className="mt-0.5 text-xs text-ink-600">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent activity + projects */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-bold text-ink-900">Recent Activity</h3>
          <div className="mt-5 space-y-4">
            {mockActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <a.icon className={`mt-0.5 h-5 w-5 shrink-0 ${a.color}`} />
                <div className="flex-1">
                  <p className="text-sm text-ink-700">{a.text}</p>
                  <p className="text-xs text-ink-400">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-ink-900">Your Projects</h3>
            <button onClick={() => navigate('/dashboard/projects')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </button>
          </div>
          {projects.length === 0 ? (
            <div className="mt-6 space-y-3">
              {[
                { title: 'Portfolio Website', stack: 'React, Tailwind', status: 'In Progress' },
                { title: 'Task Manager API', stack: 'Node.js, Express', status: 'Completed' },
                { title: 'ML Sentiment Analyzer', stack: 'Python, scikit-learn', status: 'Planning' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100">
                    <FolderGit2 className="h-5 w-5 text-accent-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">{p.title}</p>
                    <p className="text-xs text-ink-500">{p.stack}</p>
                  </div>
                  <span className={`badge ${p.status === 'Completed' ? 'bg-success-100 text-success-700' : p.status === 'Planning' ? 'bg-ink-100 text-ink-600' : 'bg-warning-100 text-warning-700'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100">
                    <FolderGit2 className="h-5 w-5 text-accent-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">{p.title}</p>
                    <p className="text-xs text-ink-500">{(p.tech_stack || []).join(', ') || 'No stack'}</p>
                  </div>
                  <span className="badge bg-ink-100 text-ink-600 capitalize">{p.status.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
