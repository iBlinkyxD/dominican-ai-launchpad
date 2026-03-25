import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreatePost, FeedPostCard } from "../components/Feed";
import { useAuth } from "../../../../packages/src/auth";
import { useAcademyUser } from "../hooks/users";
import { useGetEnrolled } from "../hooks/courses";
import { getCourseBySlug } from "../api/courses";
import { usePosts } from "../hooks/posts";
import { Card } from "../components/UI";
import {
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Target,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
  TrendingUp,
  Loader2,
} from "lucide-react";

export const Home = () => {
  const { user } = useAuth();
  const { academyUser } = useAcademyUser();
  const { courses: enrolledCourses, loading: enrolledLoading } =
    useGetEnrolled();
  const [continueLessonId, setContinueLessonId] = useState<string | null>(null);
  const navigate = useNavigate();

  const totalXp = academyUser?.total_xp ?? 0;
  const level = academyUser?.level ?? 1;
  const xpForNextLevel = Math.pow(level + 1, 2) * 100;
  const xpToNextLevel = Math.max(0, xpForNextLevel - totalXp);

  const activeCourse = enrolledCourses[0] ?? null;
  const { posts, submitPost } = usePosts();
  const [activeTab, setActiveTab] = useState<"foryou" | "following" | "trending" | "announcements">("foryou");

  const displayPosts = activeTab === "trending"
    ? [...posts].sort((a, b) => b.likes_count - a.likes_count)
    : posts;

  useEffect(() => {
    if (!activeCourse) return;
    getCourseBySlug(activeCourse.slug).then((detail) => {
      const firstLesson = detail.modules[0]?.lessons[0];
      if (firstLesson) setContinueLessonId(firstLesson.id as unknown as string);
    });
  }, [activeCourse?.slug]);

  const handleContinue = () => {
    if (!activeCourse || !continueLessonId) return;
    navigate(`/courses/${activeCourse.slug}/lesson/${continueLessonId}`);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Hero / Welcome Section */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1E40] to-[#1a3b6e] text-white p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Good {new Date().getHours() < 12 ? "morning" : "afternoon"},{" "}
              {user?.first_name}!
            </h1>
            <p className="text-indigo-100 max-w-xl text-lg opacity-90">
              Ready to expand your knowledge today?{" "}
              {academyUser ? (
                <>
                  You're{" "}
                  <span className="font-bold text-yellow-300">
                    {xpToNextLevel.toLocaleString()} XP
                  </span>{" "}
                  away from Level {level + 1}.
                </>
              ) : (
                "Keep learning to level up!"
              )}
            </p>
          </div>
          {academyUser && (
            <div className="hidden md:block text-right">
              <div className="text-sm text-indigo-200 uppercase tracking-wider font-bold mb-1">
                Total XP
              </div>
              <div className="flex items-center justify-end gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400 fill-current animate-pulse" />
                <span className="text-3xl font-black">
                  {totalXp.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-indigo-300 mt-1">Level {level}</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Feed */}
        <div className="lg:col-span-2 space-y-6">
          <CreatePost onPost={submitPost} />

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {(["foryou", "following", "trending", "announcements"] as const).map((tab) => {
              const labels: Record<typeof tab, React.ReactNode> = {
                foryou: "For You",
                following: "Following",
                trending: <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Trending</span>,
                announcements: "Announcements",
              };
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {activeTab === "following" && (
            <div className="py-10 text-center text-gray-400">
              <p className="text-sm">Following feed coming soon.</p>
            </div>
          )}
          {activeTab === "announcements" && (
            <div className="py-10 text-center text-gray-400">
              <p className="text-sm">No announcements yet.</p>
            </div>
          )}
          {(activeTab === "foryou" || activeTab === "trending") && displayPosts.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No posts yet. Be the first to share something!</p>
            </div>
          ) : (activeTab === "foryou" || activeTab === "trending") && (
            displayPosts.map((post) => (
              <FeedPostCard
                key={post.id}
                post={post}
                currentUserDaiaId={user?.id}
                currentUserName={user ? `${user.first_name} ${user.last_name}` : undefined}
                currentUserAvatar={user?.profile_picture_url ?? undefined}
              />
            ))
          )}
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6">
          {/* Daily Quests */}
          <Card className="border-l-4 border-l-indigo-500">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Daily Quests</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Complete 1 Lesson", progress: 0, total: 1, xp: 50 },
                { label: "Post a reply", progress: 0, total: 1, xp: 20 },
                { label: "Help a peer", progress: 0, total: 1, xp: 30 },
              ].map((quest, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-sm mb-1.5">
                    <span className="font-medium text-gray-700">
                      {quest.label}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      +{quest.xp} XP
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{
                        width: `${(quest.progress / quest.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Continue Learning */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                Continue Learning
              </h3>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="p-4">
              {enrolledLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ) : activeCourse ? (
                <div className="group cursor-pointer" onClick={handleContinue}>
                  <div className="flex gap-3 mb-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      {activeCourse.thumbnail_url ? (
                        <img
                          src={activeCourse.thumbnail_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-600 mb-0.5">
                        {activeCourse.code ?? activeCourse.level.toUpperCase()}
                      </p>
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition">
                        {activeCourse.title}
                      </h4>
                    </div>
                  </div>
                  <button
                    disabled={!continueLessonId}
                    className="w-full py-2 bg-[#0B1E40] text-white text-sm rounded-lg hover:bg-[#162d5e] transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {continueLessonId ? (
                      "Continue"
                    ) : (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  You're not enrolled in any courses yet.
                </p>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Upcoming Events</h3>
            </div>
            <p className="text-sm text-gray-400 text-center py-4">
              No upcoming events.
            </p>
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
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="Total Members"
          value="1,245"
          icon={Users}
          trend="+12%"
        />
        <StatsCard
          label="Active Posts (Today)"
          value="86"
          icon={MessageSquare}
          trend="+5%"
        />
        <StatsCard
          label="Pending Reports"
          value="3"
          icon={AlertTriangle}
          trend="-2%"
          negative
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">
            Membership Growth
          </h3>
          <div className="h-64 flex items-end gap-2 px-2 pb-2">
            {[40, 55, 45, 70, 85, 95, 120].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-indigo-100 rounded-t hover:bg-indigo-200 transition-colors relative group"
              >
                <div
                  className="absolute bottom-0 w-full bg-indigo-500 rounded-t transition-all duration-700"
                  style={{ height: `${h}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h * 10}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400 uppercase font-medium">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Moderation Queue</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Reported Content #{1000 + i}
                    </p>
                    <p className="text-xs text-red-600">Offensive language</p>
                  </div>
                </div>
                <button className="text-sm text-gray-600 underline hover:text-gray-900">
                  Review
                </button>
              </div>
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-14 bg-gray-50 rounded-lg border border-gray-100 animate-pulse"
              ></div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({
  label,
  value,
  icon: Icon,
  trend,
  negative = false,
}: any) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h4 className="text-2xl font-bold text-gray-900 mt-1">{value}</h4>
      </div>
      <div
        className={`p-3 rounded-lg ${negative ? "bg-red-100 text-red-600" : "bg-indigo-50 text-indigo-600"}`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div
      className={`mt-4 text-xs font-medium ${negative ? "text-red-600" : "text-green-600"}`}
    >
      {trend} <span className="text-gray-400 font-normal">from last week</span>
    </div>
  </Card>
);
