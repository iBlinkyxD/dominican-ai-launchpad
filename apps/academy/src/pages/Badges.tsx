import { Award } from "lucide-react";
import certificate from "@/assets/certificate/certificate.png";
import ai101 from "@/assets/badges/ai101.jpeg";
import dr101 from "@/assets/badges/dr101.jpeg";
import eng101 from "@/assets/badges/eng101.jpeg";
import com101 from "@/assets/badges/com101.jpeg";
import dbs101 from "@/assets/badges/dbs101.jpeg";
import esp101 from "@/assets/badges/esp101.jpeg";
import sci101 from "@/assets/badges/sci101.jpeg";

export function BadgesPage() {
  const earnedCertificates = [
    { id: 1, image: certificate, locked: false },
    { id: 2, image: certificate, locked: true },
  ];
  const earnedBadges = [
    { id: 1, image: ai101, locked: false },
    { id: 2, image: eng101, locked: false },
    { id: 3, image: ai101, locked: true },
    { id: 4, image: dr101, locked: false },
    { id: 5, image: dr101, locked: true },
    { id: 6, image: eng101, locked: false },
    { id: 7, image: eng101, locked: true },
    { id: 8, image: sci101, locked: false },
    { id: 9, image: dr101, locked: true },
    { id: 10, image: dbs101, locked: false },
    { id: 11, image: sci101, locked: true },
    { id: 12, image: dr101, locked: false },
    { id: 13, image: dbs101, locked: true },
    { id: 14, image: com101, locked: false },
    { id: 15, image: dbs101, locked: true },
    { id: 16, image: eng101, locked: false },
    { id: 17, image: esp101, locked: true },
    { id: 18, image: eng101, locked: false },
    { id: 19, image: esp101, locked: true },
    { id: 20, image: esp101, locked: false },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">
            Award Wall
          </h1>
          <p className="text-gray-600">
            Earn certifications and badges by completing courses.
          </p>
        </div>
        {/* Certificates Section - White Container */}
        {/* Certificates Section - White Container */}{" "}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Certificates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {earnedCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-4 relative group"
              >
                <img
                  src={cert.image}
                  alt={`Certificate ${cert.id}`}
                  className={`w-full h-full object-contain ${
                    cert.locked
                      ? "opacity-30 grayscale"
                      : "group-hover:scale-105 transition"
                  }`}
                />

                {/* Locked overlay */}
                {cert.locked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/60 text-white text-sm px-3 py-1 rounded">
                      Locked
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Badges Section - White Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 justify-items-center">
            {/* Earned Badges */}
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="w-32 h-36 flex items-center justify-center group cursor-pointer transition-transform duration-200 relative"
              >
                <img
                  src={badge.image}
                  alt={`Badge ${badge.id}`}
                  className={`w-full h-full object-contain ${
                    badge.locked
                      ? "opacity-30 grayscale"
                      : "hover:scale-105 transition"
                  }`}
                />

                {/* Locked overlay */}
                {badge.locked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                      Locked
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
