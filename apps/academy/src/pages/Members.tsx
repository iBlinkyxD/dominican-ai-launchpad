import React, { useState, useEffect } from 'react';
import { api } from '../../mockData';
import { User, UserRole } from '../../types';
import { 
  Search, 
  User as UserIcon, 
  MessageCircle, 
  Trophy, 
  Award, 
  Star, 
  Zap, 
  ThumbsUp, 
  Shield,
  Briefcase,
  ArrowRight,
  X,
  FileText
} from 'lucide-react';
import { Avatar } from '../components/UI';

interface Executive {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  location?: string;
}

// Mock Data for Executive Team
const EXECUTIVES: Executive[] = [
  {
    id: 'e1',
    name: 'Steve Solomon',
    role: 'President & chief steward',
    location: 'Santo Domingo',
    bio: 'Steve Solomon serves as the President and Chief Steward of the Dominican AI Association. A visionary leader with decades of experience in high-stakes technology management and educational advocacy, Steve oversees the strategic direction of DAIA, ensuring that the Dominican Republic remains at the forefront of the Caribbean AI revolution. His commitment to ethical AI and community empowerment is the heartbeat of our organization.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'e2',
    name: 'Luis Dorismon',
    role: 'Vice President',
    location: 'Santiago de los Caballeros',
    bio: 'Luis Dorismon brings a wealth of operational expertise to his role as Vice President. Specializing in organizational scaling and international relations, Luis is responsible for the execution of DAIA’s most ambitious infrastructure projects. He is a key architect of our regional growth strategy, bridging the gap between local talent and global technological standards.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'e3',
    name: 'Lic. Maria Vargas',
    role: 'Chief Legal Officer',
    location: 'Santo Domingo',
    bio: 'Lic. Maria Vargas leads the legal and regulatory division of DAIA. With a distinguished background in technology law and corporate governance, she ensures that all community initiatives are built on a foundation of integrity and compliance. Maria is a tireless advocate for data privacy and ethical standards, protecting both the organization and its diverse members.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'e4',
    name: 'Emelys Rivera',
    role: 'Chief Financial Officer',
    location: 'La Romana',
    bio: 'Emelys Rivera oversees the financial health and strategic investment portfolios of DAIA. Her rigorous approach to fiscal responsibility and impact-driven funding ensures that every resource within the association is optimized for maximum educational benefit. Emelys is dedicated to building a sustainable economic engine that supports Dominican learners for generations to come.',
    image: 'https://images.unsplash.com/photo-1598550832236-81f27e36592d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'e5',
    name: 'Roberto Mendez',
    role: 'Chief Technical Officer',
    location: 'Boca Chica',
    bio: 'Roberto Mendez is the lead technologist driving the DAIA platform’s core architecture. An expert in Large Language Models (LLMs) and neural networking, Roberto ensures that our digital tools are as powerful and innovative as the curriculum we teach. He is dedicated to creating accessible, high-performance technology for all.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'e6',
    name: 'Isabella Santo',
    role: 'VP of Community Affairs',
    location: 'Punta Cana',
    bio: 'Isabella Santo is the guardian of the DAIA community spirit. She focuses on inclusivity, member engagement, and the social learning programs that make our platform unique. Isabella’s work ensures that every student, parent, and teacher feels a profound sense of belonging and support within our ecosystem.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80'
  }
];

export const MembersDirectory = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<UserRole | 'all' | 'executive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null);

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const leaderboard = [...users].sort((a, b) => b.reputation - a.reputation).slice(0, 3);

  const getRoleColor = (role: UserRole) => {
    switch(role) {
      case 'teacher': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'student': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'parent': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto h-full animate-in fade-in duration-500 relative">
      
      {/* Bio Modal - Prestigious Briefing Style */}
      {selectedExecutive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B1E40]/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-4xl w-full flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedExecutive(null)}
              className="absolute top-6 right-6 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all hover:rotate-90"
            >
              <X className="w-6 h-6 text-[#0B1E40]" />
            </button>
            
            {/* Modal Image Section */}
            <div className="w-full md:w-2/5 h-80 md:h-auto relative bg-[#0B1E40]">
              <img 
                src={selectedExecutive.image} 
                alt={selectedExecutive.name} 
                className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E40] via-transparent to-transparent opacity-40"></div>
              
              {/* Floating Shield Badge in Modal */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                <Shield className="w-5 h-5 text-[#C5A059]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Official Delegate</span>
              </div>
            </div>
            
            {/* Modal Content Section */}
            <div className="flex-1 p-8 md:p-12 flex flex-col bg-white">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-[#C5A059] fill-[#C5A059]" />
                <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-[0.25em]">Dominican AI Association Leadership</span>
              </div>
              
              <h2 className="text-5xl font-serif font-bold text-[#0B1E40] mb-3 leading-tight tracking-tight">
                {selectedExecutive.name}
              </h2>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-[#C5A059]"></div>
                <p className="text-[#C5A059] font-bold uppercase tracking-[0.15em] text-sm">{selectedExecutive.role}</p>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
                <p className="text-gray-600 leading-relaxed text-lg font-light mb-8">
                  {selectedExecutive.bio}
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Base of Operations</span>
                    <span className="text-sm font-bold text-[#0B1E40]">{selectedExecutive.location}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Clearance</span>
                    <span className="text-sm font-bold text-green-600">Executive Lvl 10</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Stewardship</span>
                </div>
                <button 
                  onClick={() => setSelectedExecutive(null)}
                  className="bg-[#0B1E40] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#C5A059] hover:text-white transition-all shadow-lg hover:shadow-[#C5A059]/30"
                >
                  Close Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Directory Area */}
      <div className="flex-1">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Members</h1>
              <p className="text-gray-500 text-lg">Connecting the pioneers of the Dominican AI ecosystem.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative group w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                      type="text" 
                      placeholder="Search member directory..." 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
            </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 scrollbar-hide">
            <button
                onClick={() => setFilterRole('executive')}
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                filterRole === 'executive'
                    ? 'bg-[#0B1E40] text-white border-[#C5A059] ring-2 ring-[#C5A059] ring-offset-2 shadow-xl scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-[#C5A059]'
                }`}
            >
                <Shield className={`w-4 h-4 ${filterRole === 'executive' ? 'text-[#C5A059]' : 'text-gray-400'}`} />
                Executive Leadership
            </button>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {['all', 'student', 'teacher', 'parent', 'learner'].map((role) => (
                <button
                key={role}
                onClick={() => setFilterRole(role as any)}
                className={`px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    filterRole === role 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                >
                {role.charAt(0).toUpperCase() + role.slice(1)}s
                </button>
            ))}
        </div>

        {/* Executive View (3 Per Row) */}
        {filterRole === 'executive' ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-700">
              {EXECUTIVES.map(exec => (
                 <div key={exec.id} className="group relative bg-[#0B1E40] rounded-[1.5rem] overflow-hidden shadow-2xl border border-[#0B1E40] hover:transform hover:-translate-y-3 transition-all duration-500">
                    {/* Prestigious Gold Frame Overlay */}
                    <div className="absolute inset-0 border-2 border-[#C5A059]/20 rounded-[1.5rem] z-20 pointer-events-none group-hover:border-[#C5A059]/60 transition-colors"></div>
                    
                    {/* Headshot Section */}
                    <div className="h-72 overflow-hidden relative">
                       <img 
                        src={exec.image} 
                        alt={exec.name} 
                        className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E40] via-transparent to-transparent opacity-70"></div>
                       
                       {/* Floating Official Mark */}
                       <div className="absolute top-4 right-4 z-30 flex flex-col items-center">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                            <Shield className="w-5 h-5 text-[#C5A059]" />
                          </div>
                       </div>
                    </div>
                    
                    {/* Text Section */}
                    <div className="p-6 relative z-10 text-center flex flex-col items-center">
                       <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight group-hover:text-[#C5A059] transition-colors">
                        {exec.name}
                       </h3>
                       <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-6 h-10 flex items-center justify-center border-y border-white/5 w-full">
                          {exec.role}
                       </p>
                       
                       <button 
                         onClick={() => setSelectedExecutive(exec)}
                         className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#0B1E40] hover:border-[#C5A059] transition-all flex items-center justify-center gap-2 group/btn shadow-inner"
                       >
                          Open Bio Briefing <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        ) : (
            /* Standard Member Grid */
            filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                    <div key={user.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col relative">
                        <div className="h-20 bg-gradient-to-r from-slate-50 to-indigo-50/30 flex items-start justify-between p-4">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/60 backdrop-blur rounded-lg border border-white/50 shadow-sm">
                            <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-gray-700">Lvl {user.level}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/60 backdrop-blur rounded-lg border border-white/50 shadow-sm" title="Reputation Points">
                            <ThumbsUp className="w-3 h-3 text-indigo-500" />
                            <span className="text-xs font-bold text-gray-700">{user.reputation}</span>
                            </div>
                        </div>
                        <div className="px-5 pb-5 flex-1 flex flex-col -mt-10">
                        <div className="flex justify-between items-end mb-3">
                            <div className="relative">
                                <Avatar 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    size="lg" 
                                    className="w-20 h-20 border-4 border-white shadow-sm"
                                />
                                <span className={`absolute -bottom-2 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${getRoleColor(user.role)}`}>
                                    {user.role}
                                </span>
                            </div>
                        </div>
                        <div className="mb-4 mt-2">
                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{user.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed h-10 mb-2">{user.bio}</p>
                            {user.badges && user.badges.length > 0 && (
                                <div className="flex gap-2 mb-3">
                                    {user.badges.slice(0, 3).map(badge => (
                                        <div key={badge.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm border border-white cursor-help ${badge.color}`} title={badge.name}>
                                            {badge.icon}
                                        </div>
                                    ))}
                                    {user.badges.length > 3 && (
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500 border border-white">
                                            +{user.badges.length - 3}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-auto grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors">
                                <Trophy className="w-3.5 h-3.5" />
                                Give Kudos
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors">
                                <MessageCircle className="w-3.5 h-3.5" />
                                Message
                            </button>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <UserIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No members found</h3>
                <button onClick={() => {setSearchTerm(''); setFilterRole('all');}} className="mt-4 text-indigo-600 font-medium hover:underline">Clear all filters</button>
                </div>
            )
        )}
      </div>

      {/* Leaderboard Sidebar */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
         <div className="bg-gradient-to-b from-[#0B1E40] to-[#1a3b6e] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="flex items-center gap-2 mb-8 relative z-10">
                <Trophy className="w-7 h-7 text-[#C5A059]" />
                <h2 className="text-xl font-bold">Community Champions</h2>
            </div>
            <div className="space-y-5 relative z-10">
                {leaderboard.map((user, index) => (
                    <div key={user.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm transition-transform hover:scale-105 group cursor-pointer">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2
                            ${index === 0 ? 'bg-[#C5A059] text-[#0B1E40] border-white/30 ring-4 ring-[#C5A059]/20' : 
                              index === 1 ? 'bg-gray-400 text-gray-900 border-white/20' : 
                              'bg-orange-600 text-white border-white/20'}`}>
                            {index + 1}
                        </div>
                        <Avatar src={user.avatar} alt={user.name} size="md" className="border-2 border-white/20 shadow-md" />
                        <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-sm truncate group-hover:text-[#C5A059] transition-colors">{user.name}</h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-white/50 uppercase tracking-widest">
                                <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                                <span>{user.reputation} Kudos</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-xs text-white/40 mb-4 leading-relaxed italic">The leaders are chosen by the community based on contribution quality and mentorship impact.</p>
                <button className="text-xs font-bold text-[#C5A059] hover:text-white uppercase tracking-[0.2em] transition-all">Full Leaderboard View</button>
            </div>
         </div>
         <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-[#0B1E40]" />
                <h3 className="font-bold text-[#0B1E40]">Ascend the Ranks</h3>
             </div>
             <ul className="space-y-3 text-sm text-gray-600 font-medium">
                <li className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
                   Complete certified paths (+100 XP)
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
                   Mentor active learners (+50 XP)
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
                   Collaborate on projects (+25 XP)
                </li>
             </ul>
         </div>
      </div>
    </div>
  );
};