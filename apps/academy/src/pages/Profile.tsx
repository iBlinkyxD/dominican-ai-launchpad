import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../packages/src/auth";
import { useAcademyUser } from "../hooks/users";
import { Card } from "../components/UI";
import { Trophy, Award, Star, Zap, Lock } from "lucide-react";
import { getMyBadges } from "../api/badges";
import ai101 from "../assets/badges/ai101.jpeg";
import com101 from "../assets/badges/com101.jpeg";
import dbs101 from "../assets/badges/dbs101.jpeg";
import dr101 from "../assets/badges/dr101.jpeg";
import eng101 from "../assets/badges/eng101.jpeg";
import esp101 from "../assets/badges/esp101.jpeg";
import sci101 from "../assets/badges/sci101.jpeg";

const ALL_BADGES = [
  { key: "ai101",  name: "AI 101",                image: ai101  },
  { key: "com101", name: "Communications 101",     image: com101 },
  { key: "dbs101", name: "Databases 101",          image: dbs101 },
  { key: "dr101",  name: "Dominican Republic 101", image: dr101  },
  { key: "eng101", name: "English 101",            image: eng101 },
  { key: "esp101", name: "Spanish 101",            image: esp101 },
  { key: "sci101", name: "Science 101",            image: sci101 },
];

export const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { academyUser, loading: academyLoading } = useAcademyUser();
  const [earnedKeys, setEarnedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    getMyBadges().then((mine) => {
      setEarnedKeys(new Set(mine.map((b) => b.icon_url ?? "")));
    });
  }, []);

  if (authLoading || academyLoading) {
    return (
      <div className="animate-pulse space-y-4 p-8">
        <div className="h-48 bg-gray-200 rounded-2xl" />
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
      </div>
    );
  }

  if (!user) return null;

  const totalXp = academyUser?.total_xp ?? 0;
  const level = academyUser?.level ?? 1;
  const xpForNextLevel = Math.pow(level + 1, 2) * 100;
  const xpForCurrentLevel = Math.pow(level, 2) * 100;
  const progress = Math.min(
    100,
    Math.round(((totalXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100)
  );

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";
  const fullName = `${user.first_name} ${user.last_name}`.trim();

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      {/* Banner */}
      <div className="relative mb-24">
        <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -mb-20 -ml-10 blur-2xl" />
        </div>

        <div className="absolute -bottom-20 left-6 right-6 flex flex-col md:flex-row items-end justify-between gap-4">
          <div className="flex items-end gap-5">
            <div className="p-1.5 bg-white rounded-2xl shadow-lg">
              {user.profile_picture_url ? (
                <img
                  src={user.profile_picture_url}
                  alt={fullName}
                  className="w-20 h-20 rounded-xl object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                  {firstInitial}
                </div>
              )}
            </div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="font-medium">Student</span>
                <span>•</span>
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <div className="mb-4 flex gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* XP / Level Card */}
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
                <span className="text-4xl font-bold">{totalXp.toLocaleString()}</span>
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
                  <Zap className="w-3 h-3" /> {xpForCurrentLevel.toLocaleString()} XP
                </span>
                <span>{xpForNextLevel.toLocaleString()} XP</span>
              </div>
            </div>
          </Card>

          {/* Badges */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Badges
              <span className="ml-auto text-xs font-normal text-gray-400">
                {earnedKeys.size}/{ALL_BADGES.length}
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {ALL_BADGES.map((badge) => {
                const earned = earnedKeys.has(badge.key);
                return (
                  <div key={badge.key} className="relative flex flex-col items-center gap-1">
                    <div className="relative w-16 h-16">
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className={`w-full h-full object-contain transition ${!earned ? "opacity-25 grayscale" : "hover:scale-110"}`}
                      />
                      {!earned && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center text-gray-500 leading-tight">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium text-gray-800">Email:</span> {user.email}</p>
              {user.phone && (
                <p><span className="font-medium text-gray-800">Phone:</span> {user.phone}</p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-900">Recent Activity</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-900">{totalXp.toLocaleString()} XP earned</span>
            </div>
          </div>

          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Activity feed coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};
