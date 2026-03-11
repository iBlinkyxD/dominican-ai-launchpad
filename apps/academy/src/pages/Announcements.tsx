import React, { useState } from 'react';
import { 
  ArrowRight, 
  Award, 
  FileText,
  Star,
  Megaphone,
  ChevronRight,
  Download
} from 'lucide-react';
import { Avatar, Button, Card, Badge } from '../components/UI';

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Strategic Partnership with Ministry of Education",
    category: "Partnership",
    date: "Oct 24, 2023",
    summary: "DAIA is proud to announce a landmark agreement to integrate AI curriculum into 50 public high schools across the Dominican Republic starting Spring 2024.",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=60",
    featured: true
  },
  {
    id: 2,
    title: "Launch of the 'Future Founders' Initiative",
    category: "Initiative",
    date: "Oct 10, 2023",
    summary: "A new incubator program designed to support student-led AI startups with seed funding and mentorship from industry leaders.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
    featured: false
  },
  {
    id: 3,
    title: "Global AI Ethics Summit hosted in Santo Domingo",
    category: "Event",
    date: "Sep 28, 2023",
    summary: "DAIA will host international delegates to discuss the framework for responsible AI development in the Caribbean region.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&auto=format&fit=crop&q=60",
    featured: false
  }
];

const GRADUATES = [
  {
    id: 1,
    name: "Ana Martinez",
    role: "Valedictorian '23",
    achievement: "Accepted to MIT for Robotics",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Luis Rivera",
    role: "DAIA Scholar",
    achievement: "Developed crop-disease detection AI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Community Lead",
    achievement: "Founded 'Girls inside AI' Chapter",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60"
  }
];

export const Announcements = () => {
  const featured = ANNOUNCEMENTS.find(a => a.featured);
  const others = ANNOUNCEMENTS.filter(a => !a.featured);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8 px-4 md:px-0">
         <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-500 mt-1">Strategic updates and community highlights.</p>
         </div>
         {/* Optional Action Button */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* Main Content (8 cols) */}
         <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Hero Card */}
            {featured && (
               <div className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer h-[400px]">
                  <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E40] via-[#0B1E40]/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 text-white max-w-2xl">
                     <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                           Featured
                        </span>
                        <span className="text-gray-300 text-sm font-medium">{featured.date}</span>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-indigo-200 transition-colors">
                        {featured.title}
                     </h2>
                     <p className="text-gray-200 text-lg line-clamp-2 mb-6">
                        {featured.summary}
                     </p>
                     <Button className="bg-white text-[#0B1E40] hover:bg-gray-100 border-none font-bold">
                        Read Full Story
                     </Button>
                  </div>
               </div>
            )}

            {/* Recent Updates List */}
            <div>
               <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-[#E63946]" /> 
                  Latest News
               </h3>
               <div className="space-y-4">
                  {others.map(item => (
                     <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 group cursor-pointer">
                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-2">
                              <span className="text-indigo-600 text-xs font-bold uppercase">{item.category}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-gray-400 text-xs">{item.date}</span>
                           </div>
                           <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                              {item.title}
                           </h4>
                           <p className="text-sm text-gray-600 line-clamp-2">
                              {item.summary}
                           </p>
                        </div>
                        <div className="hidden md:flex items-center justify-center pr-2">
                           <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#0B1E40] group-hover:text-white transition-all">
                              <ArrowRight className="w-5 h-5" />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar (4 cols) */}
         <div className="lg:col-span-4 space-y-6">
            
            {/* Superstar Widget */}
            <Card className="bg-gradient-to-br from-[#0B1E40] to-[#1a3b6e] text-white border-none p-6">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                     <Award className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                     <h3 className="font-bold text-lg">Superstar Graduates</h3>
                     <p className="text-xs text-indigo-200">Hall of Fame</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  {GRADUATES.map(student => (
                     <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/5">
                        <Avatar src={student.avatar} alt={student.name} size="md" className="ring-2 ring-white/20" />
                        <div>
                           <h4 className="font-bold text-sm">{student.name}</h4>
                           <p className="text-xs text-yellow-400 font-medium mb-0.5">{student.role}</p>
                           <p className="text-[10px] text-gray-300 opacity-80">{student.achievement}</p>
                        </div>
                     </div>
                  ))}
               </div>
               
               <Button variant="ghost" className="w-full mt-4 text-white hover:bg-white/10 justify-between group px-2">
                  <span className="text-xs font-bold uppercase tracking-wider">View All Alumni</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Button>
            </Card>

            {/* Resources Widget */}
            <Card>
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#E63946]" />
                  Executive Resources
               </h3>
               <div className="space-y-2">
                  {['Annual Strategic Plan', 'Partnership Guidelines', 'Brand Assets', 'Q3 Financial Report'].map((doc, i) => (
                     <a key={i} href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition-colors border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                              <Download className="w-4 h-4" />
                           </div>
                           <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{doc}</span>
                        </div>
                     </a>
                  ))}
               </div>
            </Card>
         </div>

      </div>
    </div>
  );
};