import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../mockData';
import { Course, Lesson } from '../../types';
import { Button, Badge } from '../components/UI';
import { 
  ChevronLeft, 
  CheckCircle, 
  MessageSquare, 
  Settings, 
  ChevronDown, 
  Hexagon, 
  Crown,
  HelpCircle,
  PlayCircle,
  FileText,
  Clock
} from 'lucide-react';
import { Card } from '../components/UI';

// --- Components ---

const CourseCard: React.FC<{ course: Course; onClick: () => void }> = ({ course, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full group"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-3">
           <div className="mt-0.5 relative shrink-0">
             {/* Hexagon shape using SVG for better control */}
             <svg width="42" height="42" viewBox="0 0 100 100" className="drop-shadow-sm">
                <path d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" fill="white" stroke="#E2E8F0" strokeWidth="2" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center pt-1">
                 <div className="text-[10px] font-bold text-[#0B1E40] text-center leading-none">
                    <div className="opacity-50 text-[8px] uppercase">DAIA</div>
                    <div>{course.code?.split('-')[0]}</div>
                 </div>
             </div>
           </div>
           
           <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{course.code}</div>
              <h3 className="font-bold text-gray-900 leading-snug text-[17px]">{course.title}</h3>
           </div>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-6">{course.description}</p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-500">
           <Crown className="w-4 h-4 fill-gray-400 text-gray-400" />
           <span className="text-xs font-semibold text-gray-500">Host</span>
        </div>
      </div>
    </div>
  );
};

export const Learn = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getCourses().then(setCourses);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 relative min-h-[80vh]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <div className="flex items-center gap-3">
           <button className="bg-[#0B1E40] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3b6e] transition-colors shadow-sm">
             Create
           </button>
           <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
             <Settings className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-wrap gap-3">
           <button className="flex items-center gap-2 bg-[#E2E8F0] px-4 py-2 rounded text-xs font-bold text-gray-600 uppercase tracking-wide hover:bg-gray-300 transition-colors">
             Showing... <ChevronDown className="w-3 h-3 opacity-60" />
           </button>
           <button className="flex items-center gap-2 bg-[#E2E8F0] px-4 py-2 rounded text-xs font-bold text-gray-600 uppercase tracking-wide hover:bg-gray-300 transition-colors">
             Sorted by Host Order <ChevronDown className="w-3 h-3 opacity-60" />
           </button>
        </div>

        <div className="flex items-center gap-2 border-b border-gray-200 pb-1 overflow-x-auto">
           <button className="px-5 py-2 bg-[#0B1E40] text-white rounded-lg text-sm font-medium shadow-md">All</button>
           <button className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium whitespace-nowrap">Yours</button>
           <button className="px-5 py-2 bg-[#E2E8F0] text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">Near You</button>
           <button className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium whitespace-nowrap">Inactive</button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onClick={() => navigate(`/learn/${course.id}`)} />
        ))}
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-8 z-40">
         <button className="bg-[#1a1a1a] text-white pl-2 pr-5 py-2 rounded-full shadow-xl flex items-center gap-3 hover:bg-black transition-transform hover:scale-105 active:scale-95">
            <div className="bg-white/20 p-1.5 rounded-full animate-pulse"><HelpCircle className="w-5 h-5" /></div>
            <span className="font-medium text-sm">Need Help?</span>
         </button>
      </div>
    </div>
  );
};

export const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app we'd fetch by ID
    api.getCourses().then(courses => setCourse(courses.find(c => c.id === courseId)));
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  const handleLessonSelect = (lesson: Lesson) => {
    navigate(`/learn/${courseId}/lesson/${lesson.id}`);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
       <button onClick={() => navigate('/learn')} className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4">
         <ChevronLeft className="w-4 h-4 mr-1" /> Back to Courses
       </button>
       
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
             <div className="w-full md:w-1/3">
                <img src={course.thumbnail} alt={course.title} className="w-full rounded-lg object-cover aspect-video shadow-md" />
             </div>
             <div className="flex-1">
                <Badge color="bg-indigo-100 text-indigo-700 mb-2">{course.code || 'Course'}</Badge>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                   <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">{course.progress}% Completed</p>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
             <h3 className="font-bold text-gray-900">Curriculum</h3>
          </div>
          {course.modules && course.modules.length > 0 ? (
             <div className="divide-y divide-gray-100">
                {course.modules.map(module => (
                   <div key={module.id} className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">{module.title}</h4>
                      <div className="space-y-2">
                         {module.lessons.map(lesson => (
                            <div 
                              key={lesson.id}
                              onClick={() => handleLessonSelect(lesson)}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                            >
                               <div className="flex items-center gap-3">
                                  {lesson.type === 'video' ? <PlayCircle className="w-4 h-4 text-gray-400" /> : <FileText className="w-4 h-4 text-gray-400" />}
                                  <span className="text-sm text-gray-700">{lesson.title}</span>
                               </div>
                               <span className="text-xs text-gray-400">{lesson.duration}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
          ) : (
             <div className="p-8 text-center text-gray-500">No lessons available yet.</div>
          )}
       </div>
    </div>
  );
};

export const LessonPlayer = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  // Mock finding lesson data
  const lesson = {
      id: lessonId,
      title: 'Introduction to AI',
      content: `
        <h2>Welcome to the course!</h2>
        <p>Artificial Intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans.</p>
        <p>In this lesson, we will explore:</p>
        <ul>
          <li>History of AI</li>
          <li>Key definitions</li>
          <li>Modern applications</li>
        </ul>
      `,
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Course
        </button>
        <div className="flex gap-2">
           <Button variant="outline" size="sm">Previous</Button>
           <Button size="sm">Next Lesson</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
         <div className="aspect-video bg-black flex items-center justify-center relative">
            <div className="text-white opacity-50 text-center">
               <PlayCircle className="w-16 h-16 mx-auto mb-2 opacity-80" />
               <p>Video Player Placeholder</p>
            </div>
         </div>

         <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
            <div className="prose prose-indigo max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
               <Button variant="secondary" className="gap-2">
                  <MessageSquare className="w-4 h-4" /> Discuss this Lesson
               </Button>
               <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4" /> Mark Complete
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};
