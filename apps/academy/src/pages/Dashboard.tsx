import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../mockData';
import { Post, Course, Event } from '../../types';
import { CreatePost, PostCard } from '../components/Feed';
import { useAuth } from "../../../../packages";
import { Card, Button } from '../components/UI';
import { 
  BarChart3, Users, MessageSquare, AlertTriangle, 
  CheckCircle2, Target, Calendar, ArrowRight, 
  BookOpen, Sparkles, TrendingUp 
} from 'lucide-react';

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.getPosts().then(setPosts);
    api.getCourses().then(setCourses);
    api.getEvents().then(setEvents);
  }, []);

  const activeCourse = courses.find(c => c.progress > 0 && c.progress < 100) || courses[0];

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Hero / Welcome Section */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1E40] to-[#1a3b6e] text-white p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
             <h1 className="text-3xl font-bold mb-2">
               Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {user?.first_name}!
             </h1>
             <p className="text-indigo-100 max-w-xl text-lg opacity-90">
               Ready to expand your knowledge today? You're <span className="font-bold text-yellow-300">120 XP</span> away from Level 4.
             </p>
          </div>
          <div className="hidden md:block text-right">
             <div className="text-sm text-indigo-200 uppercase tracking-wider font-bold mb-1">Daily Streak</div>
             <div className="flex items-center justify-end gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400 fill-current animate-pulse" />
                <span className="text-3xl font-black">12 Days</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Feed */}
        <div className="lg:col-span-2 space-y-6">
           {/* Mobile Streak (visible only on small screens) */}
           <div className="md:hidden bg-white p-4 rounded-xl border border-indigo-100 flex items-center justify-between shadow-sm">
              <div>
                 <p className="text-xs text-gray-500 uppercase font-bold">Daily Streak</p>
                 <p className="text-xl font-black text-indigo-900">12 Days</p>
              </div>
              <Sparkles className="w-8 h-8 text-yellow-400 fill-current" />
           </div>

           <CreatePost />

           {/* Feed Filters */}
           <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium shadow-sm whitespace-nowrap">For You</button>
              <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-full text-sm font-medium whitespace-nowrap">Following</button>
              <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
                 <TrendingUp className="w-4 h-4" /> Trending
              </button>
              <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-full text-sm font-medium whitespace-nowrap">Announcements</button>
           </div>

           <div className="space-y-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
           </div>

           <div className="py-8 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                 <CheckCircle2 className="w-4 h-4" />
                 <span>You're all caught up!</span>
              </div>
           </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6">
           
           {/* Daily Quests Widget */}
           <Card className="border-l-4 border-l-indigo-500">
              <div className="flex items-center gap-3 mb-4">
                 <Target className="w-5 h-5 text-indigo-600" />
                 <h3 className="font-bold text-gray-900">Daily Quests</h3>
              </div>
              <div className="space-y-4">
                 {[
                    { label: 'Post a reply', progress: 1, total: 1, xp: 20 },
                    { label: 'Complete 1 Lesson', progress: 0, total: 1, xp: 50 },
                    { label: 'Help a peer', progress: 1, total: 3, xp: 30 },
                 ].map((quest, i) => (
                    <div key={i} className="group">
                       <div className="flex justify-between items-center text-sm mb-1.5">
                          <span className={`font-medium ${quest.progress === quest.total ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                             {quest.label}
                          </span>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">+{quest.xp} XP</span>
                       </div>
                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                             className={`h-full rounded-full transition-all duration-500 ${quest.progress === quest.total ? 'bg-green-500' : 'bg-indigo-500'}`} 
                             style={{ width: `${(quest.progress / quest.total) * 100}%` }} 
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </Card>

           {/* Continue Learning Widget */}
           {activeCourse && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/learn/${activeCourse.id}`)}>
                 <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                       <BookOpen className="w-4 h-4 text-gray-500" />
                       Continue Learning
                    </h3>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                 </div>
                 <div className="p-4">
                    <div className="flex gap-4 mb-3">
                       <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={activeCourse.thumbnail} alt="" className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-indigo-600 mb-0.5">{activeCourse.code}</p>
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-2">{activeCourse.title}</h4>
                       </div>
                    </div>
                    <div className="space-y-1">
                       <div className="flex justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{activeCourse.progress}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${activeCourse.progress}%` }} />
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {/* Upcoming Events Widget */}
           <Card>
              <div className="flex items-center gap-3 mb-4">
                 <Calendar className="w-5 h-5 text-indigo-600" />
                 <h3 className="font-bold text-gray-900">Upcoming Events</h3>
              </div>
              <div className="space-y-4">
                 {events.slice(0, 3).map(event => (
                    <div key={event.id} className="flex gap-3 items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                       <div className="w-12 h-12 bg-indigo-50 rounded-lg flex flex-col items-center justify-center text-indigo-700 shrink-0">
                          <span className="text-[10px] font-bold uppercase">Oct</span>
                          <span className="text-lg font-bold leading-none">24</span>
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-gray-900 hover:text-indigo-600 cursor-pointer line-clamp-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{event.startTime} • {event.location}</p>
                          <div className="flex -space-x-1.5 mt-2">
                             {[1,2,3].map(i => (
                                <div key={i} className="w-5 h-5 rounded-full border border-white bg-gray-200"></div>
                             ))}
                             <div className="w-5 h-5 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">+{event.attendees}</div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2 text-indigo-600">View Calendar</Button>
           </Card>

           {/* Suggested Connections */}
           <Card>
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Suggested for you</h3>
              <div className="space-y-4">
                 {[1, 2].map(i => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <div>
                             <p className="text-sm font-bold text-gray-900">Jane Doe</p>
                             <p className="text-[10px] text-gray-500">Physics Student</p>
                          </div>
                       </div>
                       <button className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded">Follow</button>
                    </div>
                 ))}
              </div>
           </Card>

        </div>
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Generate Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard label="Total Members" value="1,245" icon={Users} trend="+12%" />
        <StatsCard label="Active Posts (Today)" value="86" icon={MessageSquare} trend="+5%" />
        <StatsCard label="Pending Reports" value="3" icon={AlertTriangle} trend="-2%" negative />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Membership Growth</h3>
          <div className="h-64 flex items-end gap-2 px-2 pb-2">
            {[40, 55, 45, 70, 85, 95, 120].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-100 rounded-t hover:bg-indigo-200 transition-colors relative group">
                 <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t transition-all duration-700" style={{ height: `${h}%` }}></div>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 10}
                 </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400 uppercase font-medium">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </Card>

        <Card>
           <h3 className="font-semibold text-gray-900 mb-4">Moderation Queue</h3>
           <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                   <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-red-700">
                         <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-gray-900">Reported Content #{1000 + i}</p>
                         <p className="text-xs text-red-600">Offensive language</p>
                      </div>
                   </div>
                   <button className="text-sm text-gray-600 underline hover:text-gray-900">Review</button>
                </div>
              ))}
              {Array.from({ length: 2 }).map((_, i) => (
                 <div key={i} className="h-14 bg-gray-50 rounded-lg border border-gray-100 animate-pulse"></div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, icon: Icon, trend, negative = false }: any) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h4 className="text-2xl font-bold text-gray-900 mt-1">{value}</h4>
      </div>
      <div className={`p-3 rounded-lg ${negative ? 'bg-red-100 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className={`mt-4 text-xs font-medium ${negative ? 'text-red-600' : 'text-green-600'}`}>
      {trend} <span className="text-gray-400 font-normal">from last week</span>
    </div>
  </Card>
);