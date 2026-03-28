import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@packages/auth";
import { useAcademyUser } from "@/hooks/users";
import { Card } from "@/components/UI";
import {
  Trophy,
  Award,
  Zap,
  Lock,
  CheckCircle,
  Medal,
  BarChart2,
  BookOpen,
  Package,
  Heart,
  MessageCircle,
  UserPlus,
  FileText,
} from "lucide-react";
import { getMyBadges } from "@/api/badges";
import { getPublicProfile, PublicProfile } from "@/api/users";
import { getMyActivities, getUserActivities, Activity, ActivityType } from "@/api/activities";
import ai101 from "@/assets/badges/ai101.jpeg";
import com101 from "@/assets/badges/com101.jpeg";
import dbs101 from "@/assets/badges/dbs101.jpeg";
import dr101 from "@/assets/badges/dr101.jpeg";
import eng101 from "@/assets/badges/eng101.jpeg";
import esp101 from "@/assets/badges/esp101.jpeg";
import sci101 from "@/assets/badges/sci101.jpeg";

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString();
}

function getActivityConfig(type: ActivityType) {
  switch (type) {
    case "lesson_completed":
      return { Icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200/50", xpBg: "bg-emerald-50", xpText: "text-emerald-700", xpBorder: "border-emerald-100" };
    case "badge_earned":
      return { Icon: Medal, bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200/50", xpBg: "bg-amber-50", xpText: "text-amber-700", xpBorder: "border-amber-100" };
    case "course_enrolled":
      return { Icon: BookOpen, bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200/50", xpBg: "bg-indigo-50", xpText: "text-indigo-700", xpBorder: "border-indigo-100" };
    case "package_enrolled":
      return { Icon: Package, bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200/50", xpBg: "bg-purple-50", xpText: "text-purple-700", xpBorder: "border-purple-100" };
    case "post_created":
      return { Icon: FileText, bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200/50", xpBg: "bg-blue-50", xpText: "text-blue-700", xpBorder: "border-blue-100" };
    case "post_liked":
      return { Icon: Heart, bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200/50", xpBg: "bg-rose-50", xpText: "text-rose-700", xpBorder: "border-rose-100" };
    case "post_commented":
      return { Icon: MessageCircle, bg: "bg-sky-100", text: "text-sky-600", border: "border-sky-200/50", xpBg: "bg-sky-50", xpText: "text-sky-700", xpBorder: "border-sky-100" };
    case "user_followed":
      return { Icon: UserPlus, bg: "bg-green-100", text: "text-green-600", border: "border-green-200/50", xpBg: "bg-green-50", xpText: "text-green-700", xpBorder: "border-green-100" };
    default:
      return { Icon: BarChart2, bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200/50", xpBg: "bg-gray-100", xpText: "text-gray-700", xpBorder: "border-gray-200" };
  }
}

const ALL_BADGES = [
  { key: "ai101", name: "AI 101", image: ai101 },
  { key: "com101", name: "Communications 101", image: com101 },
  { key: "dbs101", name: "Databases 101", image: dbs101 },
  { key: "dr101", name: "Dominican Republic 101", image: dr101 },
  { key: "eng101", name: "English 101", image: eng101 },
  { key: "esp101", name: "Spanish 101", image: esp101 },
  { key: "sci101", name: "Science 101", image: sci101 },
];

export const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { user, loading: authLoading } = useAuth();
  const { academyUser, loading: academyLoading } = useAcademyUser();
  const [earnedKeys, setEarnedKeys] = useState<Set<string>>(new Set());
  const [publicProfile, setPublicProfile] = useState<PublicProfile | null>(
    null,
  );
  const [publicLoading, setPublicLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  const isOwnProfile = !username || user?.username === username;

  // Load own badges when viewing own profile
  useEffect(() => {
    if (isOwnProfile) {
      getMyBadges().then((mine) => {
        setEarnedKeys(new Set(mine.map((b) => b.icon_url ?? "")));
      });
    }
  }, [isOwnProfile]);

  // Load public profile when viewing someone else's
  useEffect(() => {
    if (!isOwnProfile && username) {
      setPublicLoading(true);
      getPublicProfile(username)
        .then(setPublicProfile)
        .catch(() => setNotFound(true))
        .finally(() => setPublicLoading(false));
    }
  }, [isOwnProfile, username]);

  // Load activities — own or public
  useEffect(() => {
    if (isOwnProfile) {
      setActivitiesLoading(true);
      getMyActivities(10).then(setActivities).finally(() => setActivitiesLoading(false));
    } else if (!isOwnProfile && publicProfile === null && !notFound) {
      // wait for publicProfile to load first — handled below
    }
  }, [isOwnProfile]);

  useEffect(() => {
    if (!isOwnProfile && publicProfile) {
      // We don't have daia_user_id on public profile yet — skip for now
      setActivities([]);
    }
  }, [publicProfile, isOwnProfile]);

  const loading = authLoading || academyLoading || publicLoading;

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 p-8">
        <div className="h-48 bg-gray-200 rounded-2xl" />
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Award className="w-16 h-16 text-gray-300" />
        <h1 className="text-2xl font-bold text-gray-700">Profile not found</h1>
        <p className="text-gray-500">@{username} doesn't exist.</p>
      </div>
    );
  }

  if (!isOwnProfile && !publicProfile) return null;
  if (isOwnProfile && !user) return null;

  // Resolved display data
  const firstName = isOwnProfile ? user!.first_name : publicProfile!.first_name;
  const lastName = isOwnProfile ? user!.last_name : publicProfile!.last_name;
  const avatarUrl = isOwnProfile
    ? user!.profile_picture_url
    : publicProfile!.profile_picture_url;
  const fullName = `${firstName} ${lastName}`.trim();
  const firstInitial = firstName.charAt(0).toUpperCase();

  const totalXp = academyUser?.total_xp ?? 0;
  const level = academyUser?.level ?? 1;
  const xpForNextLevel = Math.pow(level + 1, 2) * 100;
  const xpForCurrentLevel = Math.pow(level, 2) * 100;
  const progress = Math.min(
    100,
    Math.round(
      ((totalXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) *
        100,
    ),
  );

  return (
    <>
      <Toaster position="top-center" />
      <div className="animate-in fade-in duration-500 pb-10 space-y-8">
        {/* Hero Section */}
        <section className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#5300b7] to-[#6d24de] p-10 shadow-2xl shadow-purple-500/20">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg
              className="w-full h-full scale-150"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.7,-64.1C60.1,-55.8,67.3,-40.4,72.4,-24.8C77.4,-9.1,80.3,6.8,75.9,21C71.5,35.2,59.8,47.8,46,57.1C32.2,66.5,16.1,72.6,0.3,72.2C-15.5,71.8,-31,64.8,-45.5,54.9C-60,45,-73.4,32.2,-79.3,16.7C-85.1,1.2,-83.4,-17,-74.6,-31.6C-65.7,-46.2,-49.6,-57.1,-34.5,-64.3C-19.4,-71.4,-5.2,-74.8,10.1,-70.3C25.4,-65.8,35.3,-72.4,47.7,-64.1Z"
                fill="white"
                transform="translate(200 200)"
              />
            </svg>
          </div>

          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-white/20 rounded-full blur group-hover:blur-md transition-all" />
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                  {firstInitial}
                </div>
              )}
            </div>

            {/* Name & tags */}
            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  AI Pioneer
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Level {level} Scholar
                </span>
              </div>
              <h2 className="font-extrabold text-4xl text-white tracking-tight">
                {fullName}
              </h2>
              {username && (
                <p className="text-purple-200/80 mt-1 font-medium">
                  @{username}
                </p>
              )}
            </div>

            {/* Buttons — only on own profile */}
            {isOwnProfile && (
              <div className="mb-2 flex gap-3">
                <button
                  onClick={() => navigate("/settings")}
                  className="bg-white text-[#5300b7] font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </button>
                {user?.username && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/profile/${user.username}`,
                      );
                      toast.success("Link copied to clipboard!");
                    }}
                    className="bg-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Level Card */}
            <Card className="p-6 bg-gradient-to-br from-gray-900 to-indigo-900 text-white border-none shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Current Level</h3>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold border border-white/20">
                    Lvl {level}
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold">
                    {totalXp.toLocaleString()}
                  </span>
                  <span className="text-indigo-200 mb-1.5">XP</span>
                </div>
                <div className="w-full bg-black/30 h-2 rounded-full mb-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-indigo-200">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />{" "}
                    {xpForCurrentLevel.toLocaleString()} XP
                  </span>
                  <span>{xpForNextLevel.toLocaleString()} XP</span>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-4 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#5300b7]" />
                  Badges
                </h3>
                <span className="bg-purple-100 text-[#5300b7] font-bold text-xs px-3 py-1 rounded-full">
                  {earnedKeys.size} / {ALL_BADGES.length} Collected
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {ALL_BADGES.map((badge) => {
                  const earned = earnedKeys.has(badge.key);
                  return (
                    <div
                      key={badge.key}
                      className={`flex flex-col items-center gap-2 group cursor-pointer ${!earned ? "opacity-30 grayscale" : ""}`}
                    >
                      <div className="w-full aspect-square rounded-2xl shadow-sm overflow-hidden relative">
                        <img
                          src={badge.image}
                          alt={badge.name}
                          className={`w-full h-full object-cover transition ${!earned ? "grayscale opacity-30" : "hover:scale-110"}`}
                        />
                        {!earned && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Lock className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-center text-gray-600 leading-tight">
                        {badge.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column — Recent Activity */}
          <div className="lg:col-span-7">
            <Card className="p-4 lg:p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-xl text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-[#5300b7] font-bold text-sm hover:underline flex items-center gap-1">
                  View All
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 space-y-4">
                {activitiesLoading && (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-3 bg-gray-200 rounded w-1/4" />
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!activitiesLoading && activities.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                    <BarChart2 className="w-10 h-10 opacity-30" />
                    <p className="text-sm font-medium">No activity yet</p>
                  </div>
                )}

                {!activitiesLoading && activities.map((activity, index) => {
                  const { Icon, bg, text, border, xpBg, xpText, xpBorder } = getActivityConfig(activity.type);
                  const isLast = index === activities.length - 1;
                  return (
                    <div key={activity.id} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${text} border ${border} flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {!isLast && <div className="w-0.5 flex-1 bg-gray-100 my-1" />}
                      </div>
                      <div className={`flex-1 ${!isLast ? "pb-6" : ""}`}>
                        <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5 hover:bg-white hover:shadow-md hover:border-transparent transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              {relativeTime(activity.created_at)}
                            </p>
                            {activity.xp_earned > 0 && (
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${xpBg} ${xpText} border ${xpBorder}`}>
                                <Zap className="w-3 h-3" />
                                +{activity.xp_earned} XP
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-800 text-base">{activity.title}</h4>
                          {activity.description && (
                            <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Prompt Banner — only on own profile */}
              {isOwnProfile && (
                <div className="mt-8 p-5 bg-purple-50 rounded-2xl flex items-center gap-4 border border-purple-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5300b7] to-[#6d24de] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"
                      />
                    </svg>
                  </div>
                  <p className="flex-1 text-sm text-gray-700 font-medium leading-relaxed">
                    "You're doing great, {firstName}! Ready to start the next
                    module?"
                  </p>
                  <button
                    onClick={() => navigate("/chat-daia")}
                    className="bg-[#5300b7] text-white text-xs font-bold px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all duration-150 shadow-md shadow-purple-500/20 flex-shrink-0"
                  >
                    Chat
                  </button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
