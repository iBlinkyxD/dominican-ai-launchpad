
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User as UserIcon, Loader2, Plus, MessageSquare, Trash2, Menu, X, Bot, History } from 'lucide-react';
import { useAuth } from "../../../../packages";
import { Avatar, Button } from '../components/UI';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

interface Session {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

const STORAGE_KEY = 'daia_chat_sessions';

export const AIChat = () => {
  const { user } = useAuth();
  
  // State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
    const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";

  // Load sessions from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessions(parsed);
        if (parsed.length > 0) {
          setCurrentSessionId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to load chat sessions", e);
      }
    }
  }, []);

  // Save sessions to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, currentSessionId, isLoading]);

  const activeSession = sessions.find(s => s.id === currentSessionId);

  const createNewSession = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      updatedAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setIsHistoryOpen(false); // Close drawer on mobile/desktop selection
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  };

  const selectSession = (id: string) => {
      setCurrentSessionId(id);
      setIsHistoryOpen(false);
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;
    
    let sessionId = currentSessionId;
    let currentSessions = sessions;
    
    if (!sessionId) {
      const newSession: Session = {
        id: Date.now().toString(),
        title: text.slice(0, 30) + (text.length > 30 ? '...' : ''),
        messages: [],
        updatedAt: Date.now(),
      };
      sessionId = newSession.id;
      currentSessions = [newSession, ...sessions];
      setSessions(currentSessions);
      setCurrentSessionId(sessionId);
    } else {
        if (activeSession?.title === 'New Conversation') {
            const updatedSessions = sessions.map(s => 
                s.id === sessionId 
                ? { ...s, title: text.slice(0, 30) + (text.length > 30 ? '...' : '') }
                : s
            );
            setSessions(updatedSessions);
            currentSessions = updatedSessions;
        }
    }

    setInput('');
    setIsLoading(true);

    const userMsg: Message = { role: 'user', text, timestamp: Date.now() };
    const updatedSessionsWithUser = currentSessions.map(s => 
        s.id === sessionId ? { ...s, messages: [...s.messages, userMsg], updatedAt: Date.now() } : s
    );
    setSessions(updatedSessionsWithUser);

    // try {
    //   // Create a new GoogleGenAI instance right before making an API call to ensure it uses the correct context
    //   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    //   const history = activeSession?.messages.map(m => ({
    //       role: m.role,
    //       parts: [{ text: m.text }]
    //   })) || [];

    //   // Use the 'gemini-3-flash-preview' model as recommended for standard text tasks
    //   const chat = ai.chats.create({
    //     model: 'gemini-3-flash-preview',
    //     config: {
    //       systemInstruction: "You are DAIA, a helpful, encouraging, and knowledgeable AI assistant for the Dominican AI Association. Your goal is to help students, parents, and teachers with educational topics, community information, and AI concepts. Be concise, friendly, and use formatting like bolding for key terms.",
    //     },
    //     history: history
    //   });

    //   const result = await chat.sendMessageStream({ message: text });
      
    //   let fullText = '';
    //   setSessions(prev => prev.map(s => 
    //       s.id === sessionId 
    //       ? { ...s, messages: [...s.messages, { role: 'model', text: '', timestamp: Date.now() }] } 
    //       : s
    //   ));

    //   for await (const chunk of result) {
    //     // Correctly accessing .text property on response chunk
    //     const chunkText = chunk.text;
    //     if (chunkText) {
    //       fullText += chunkText;
    //       setSessions(prev => prev.map(s => {
    //           if (s.id !== sessionId) return s;
    //           const newMsgs = [...s.messages];
    //           newMsgs[newMsgs.length - 1].text = fullText;
    //           return { ...s, messages: newMsgs };
    //       }));
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getRelativeDate = (timestamp: number) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays <= 1) return 'Today';
      if (diffDays === 2) return 'Yesterday';
      if (diffDays <= 7) return 'Previous 7 Days';
      return 'Older';
  };

  return (
    <div className="h-full flex relative overflow-hidden bg-white">
      
      {/* Drawer Overlay (Backdrop) */}
      {isHistoryOpen && (
        <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 transition-opacity"
            onClick={() => setIsHistoryOpen(false)}
        />
      )}

      {/* History Slide-over Drawer */}
      <div className={`absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-30 transform transition-transform duration-300 ease-in-out border-r border-gray-100 ${isHistoryOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">History</h3>
            <button onClick={() => setIsHistoryOpen(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                <X className="w-5 h-5" />
            </button>
        </div>
        
        <div className="p-4">
            <Button onClick={createNewSession} className="w-full gap-2 justify-start bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100 shadow-sm">
                <Plus className="w-4 h-4" />
                <span>New Chat</span>
            </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-6 pb-4 h-[calc(100%-140px)]">
            {['Today', 'Yesterday', 'Previous 7 Days', 'Older'].map(label => {
                const group = sessions.filter(s => getRelativeDate(s.updatedAt) === label);
                if (group.length === 0) return null;
                return (
                    <div key={label}>
                        <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</h4>
                        <div className="space-y-1">
                            {group.map(session => (
                                <div 
                                    key={session.id}
                                    onClick={() => selectSession(session.id)}
                                    className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                                        currentSessionId === session.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="truncate flex-1 pr-2 flex items-center gap-2">
                                        <MessageSquare className="w-3.5 h-3.5 opacity-70" />
                                        <span className="truncate">{session.title}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => deleteSession(e, session.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-500 rounded transition-all"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full">
        {/* Chat Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0 bg-white">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsHistoryOpen(true)} 
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors flex items-center gap-2 group"
                >
                    <History className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 hidden sm:inline">History</span>
                </button>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 p-1.5 rounded-lg">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="font-bold text-gray-900">DAIA Assistant</span>
                </div>
            </div>
            
            <button onClick={createNewSession} className="text-gray-400 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-colors" title="New Chat">
                <Plus className="w-5 h-5" />
            </button>
        </div>

        {/* Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-white scroll-smooth">
            {!activeSession || activeSession.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards pb-20">
                     <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
                        <Bot className="w-10 h-10 text-white" />
                     </div>
                     <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">How can I help you today?</h2>
                     <p className="text-gray-500 mb-10 max-w-md text-center leading-relaxed">I'm here to help with your studies, answer questions about the community, or discuss AI topics.</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                        {[
                            "Explain how Neural Networks work",
                            "Help me study for my English exam",
                            "What events are happening this week?",
                            "Draft a post for the Robotics Club"
                        ].map((suggestion, i) => (
                            <button 
                                key={i}
                                onClick={() => handleSend(suggestion)}
                                className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-left text-sm text-gray-700 hover:border-indigo-300 hover:shadow-md hover:bg-white transition-all duration-200 group"
                            >
                                <span className="font-medium group-hover:text-indigo-700">{suggestion}</span>
                            </button>
                        ))}
                     </div>
                </div>
            ) : (
                activeSession.messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         {msg.role === 'model' && (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200 mt-1 shadow-sm">
                               <Sparkles className="w-4 h-4 text-indigo-600" />
                            </div>
                         )}
                         
                         <div className={`max-w-[85%] rounded-2xl px-6 py-4 text-sm leading-7 shadow-sm ${
                            msg.role === 'user' 
                              ? 'bg-[#0B1E40] text-white rounded-br-sm' 
                              : 'bg-white border border-gray-100 rounded-bl-sm prose prose-sm prose-indigo shadow-md shadow-gray-100'
                         }`}>
                            {msg.role === 'model' ? (
                               <div dangerouslySetInnerHTML={{ 
                                  __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>') 
                               }} />
                            ) : (
                               msg.text
                            )}
                         </div>
        
                         {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden mt-1 shadow-sm border border-gray-100">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {firstInitial}
              </div>                            </div>
                         )}
                    </div>
                ))
            )}
            {isLoading && (
               <div className="flex gap-4 max-w-3xl mx-auto animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                     <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-bl-none px-6 py-4 text-gray-400 text-sm italic">
                     Thinking...
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/90 backdrop-blur border-t border-gray-100 sticky bottom-0 z-10">
             <div className="max-w-3xl mx-auto relative">
                <div className="relative flex items-end gap-2 bg-white rounded-2xl border border-gray-200 p-2 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all shadow-sm hover:shadow-md hover:border-gray-300">
                   <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Send a message to DAIA..."
                      className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-2.5 px-3 text-sm text-gray-800 placeholder-gray-400"
                      rows={1}
                      style={{ minHeight: '44px' }}
                   />
                   <button 
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="p-2.5 bg-[#0B1E40] text-white rounded-xl hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-0.5 shadow-sm"
                   >
                      <Send className="w-4 h-4" />
                   </button>
                </div>
                <div className="text-center mt-2">
                   <p className="text-[10px] text-gray-400">DAIA can make mistakes. Consider checking important information.</p>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};
