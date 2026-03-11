import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../mockData';
import { Space, Post } from '../../types';
import { Card, Button, Avatar, Badge } from '../components/UI';
import { PostCard, CreatePost } from '../components/Feed';
import { Users, Lock, Globe } from 'lucide-react';

export const SpacesList = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getSpaces().then(setSpaces);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Discover Spaces</h2>
        <Button variant="outline" size="sm">Create Space</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spaces.map(space => (
          <div 
            key={space.id}
            onClick={() => navigate(`/spaces/${space.id}`)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-all hover:border-indigo-300 group"
          >
            <div className="h-32 bg-gray-200 relative">
               <img src={space.coverImage} alt={space.name} className="w-full h-full object-cover" />
               <div className="absolute top-4 right-4">
                  {space.isJoined ? (
                    <Badge color="bg-green-100 text-green-700">Member</Badge>
                  ) : (
                     <Badge color="bg-white/90 text-gray-700 backdrop-blur">Join</Badge>
                  )}
               </div>
            </div>
            <div className="p-5">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{space.name}</h3>
                 {space.visibility === 'private' ? <Lock className="w-4 h-4 text-gray-400" /> : <Globe className="w-4 h-4 text-gray-400" />}
               </div>
               <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{space.description}</p>
               <div className="flex items-center text-xs text-gray-500 gap-1">
                 <Users className="w-3 h-3" />
                 <span>{space.memberCount} members</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SpaceDetail = () => {
  const { id } = useParams();
  const [space, setSpace] = useState<Space | undefined>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('feed');

  useEffect(() => {
    if (id) {
      api.getSpace(id).then(setSpace);
      api.getPosts(id).then(setPosts);
    }
  }, [id]);

  if (!space) return <div className="p-8 text-center text-gray-400">Loading space...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
        <img src={space.coverImage} alt={space.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
          <div className="flex items-center gap-4 text-sm opacity-90">
             <span className="flex items-center gap-1"><Users className="w-4 h-4"/> {space.memberCount} Members</span>
             <span className="capitalize px-2 py-0.5 rounded-full bg-white/20 border border-white/30">{space.category}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {['Feed', 'About', 'Members', 'Events', 'Learning'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.toLowerCase()
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          <CreatePost />
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
               <p className="text-gray-500">No posts yet. Be the first to say hello!</p>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'about' && (
         <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">About this Space</h3>
            <p className="text-gray-600 leading-relaxed">{space.description}</p>
         </Card>
      )}

      {/* Other tabs would be implemented similarly */}
      {['members', 'events', 'learning'].includes(activeTab) && (
         <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon.
         </div>
      )}
    </div>
  );
};
