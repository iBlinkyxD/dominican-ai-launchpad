import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/UI";
import { ChevronLeft, PlayCircle, MessageSquare, CheckCircle } from "lucide-react";

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
