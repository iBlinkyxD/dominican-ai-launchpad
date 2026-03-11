import React from 'react';
import { PlayCircle, FileText, CheckCircle, Clock } from 'lucide-react';
import { Course, CourseModule, Lesson } from '../../types';
import { Card, Badge, Button } from './UI';

export const CourseCard: React.FC<{ course: Course; onClick: () => void }> = ({ course, onClick }) => {
  return (
    <div onClick={onClick} className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full">
      <div className="relative h-40 overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div className="h-full bg-indigo-500" style={{ width: `${course.progress}%` }} />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{course.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <Badge color="bg-indigo-50 text-indigo-700">{course.totalLessons} Lessons</Badge>
          {course.progress > 0 ? (
            <span className="text-xs font-semibold text-green-600">{course.progress}% Complete</span>
          ) : (
            <span className="text-xs font-medium text-indigo-600 group-hover:underline">Start Learning</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ModuleList: React.FC<{ modules: CourseModule[]; onLessonSelect: (lesson: Lesson) => void }> = ({ modules, onLessonSelect }) => {
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Card key={module.id} noPadding className="border-l-4 border-l-indigo-500">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <h4 className="font-semibold text-gray-900">{module.title}</h4>
          </div>
          <div className="divide-y divide-gray-100">
            {module.lessons.map((lesson) => (
              <div 
                key={lesson.id} 
                onClick={() => onLessonSelect(lesson)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {lesson.isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : lesson.type === 'video' ? (
                    <PlayCircle className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${lesson.isCompleted ? 'text-gray-500' : 'text-gray-900'}`}>{lesson.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{lesson.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
