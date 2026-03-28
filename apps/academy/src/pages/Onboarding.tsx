import React, { useState } from 'react';
import { useAuth } from "@packages/auth";
import { Button } from '../components/UI';
import { Check } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('alex@daia.edu');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">D-A-I-A</h1>
        <p className="text-gray-400 text-sm tracking-wide">pronounced "die-ah"</p>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="password" readOnly />
              </div>
            </div>

            <Button className="w-full" onClick={login}>Sign In</Button>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
               <button className="flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Google</button>
               <button className="flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Microsoft</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="mb-8 flex justify-center space-x-2">
           {[1, 2, 3].map(i => (
             <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-200'}`}></div>
           ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
             <h2 className="text-3xl font-bold text-center text-gray-900">How will you use D-A-I-A?</h2>
             <div className="grid grid-cols-2 gap-4">
                {['Student', 'Parent', 'Teacher', 'Lifelong Learner'].map(r => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${role === r ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}`}
                  >
                    <span className="block font-bold text-lg mb-1">{r}</span>
                  </button>
                ))}
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
             <h2 className="text-3xl font-bold text-center text-gray-900">What are you interested in?</h2>
             <div className="flex flex-wrap gap-3 justify-center">
                {['AI & Robotics', 'English', 'Mathematics', 'Art History', 'Parenting', 'Coding', 'Music'].map(topic => (
                   <button
                     key={topic}
                     onClick={() => setInterests(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic])}
                     className={`px-6 py-3 rounded-full border transition-all ${interests.includes(topic) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'}`}
                   >
                     {topic}
                   </button>
                ))}
             </div>
          </div>
        )}
        
        {step === 3 && (
           <div className="space-y-6 animate-in slide-in-from-right-8 duration-500 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                 <Check className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">You're all set!</h2>
              <p className="text-gray-500">We've customized your feed and suggested some spaces based on your profile.</p>
           </div>
        )}

        <div className="mt-8">
           <Button className="w-full h-12 text-lg" onClick={handleNext} disabled={step === 1 && !role}>
              {step === 3 ? 'Get Started' : 'Next'}
           </Button>
        </div>
      </div>
    </div>
  );
};