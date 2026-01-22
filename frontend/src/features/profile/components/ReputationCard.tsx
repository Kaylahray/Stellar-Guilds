import React from "react";
import { UserProfile } from "../types";
import { Trophy, Star, Shield, Gem } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ReputationCardProps {
  user: UserProfile;
}

const tierStyles = {
  Bronze: "border-stone-400 bg-gradient-to-br from-stone-50 to-stone-100",
  Silver: "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100",
  Gold: "border-yellow-400 bg-gradient-to-r from-yellow-300/20 to-yellow-100/50 shadow-yellow-200/50 shadow-lg",
  Platinum: "border-cyan-400 bg-gradient-to-r from-cyan-300/20 to-cyan-100/50 shadow-cyan-200/50 shadow-lg",
  Diamond: "border-fuchsia-500 bg-gradient-to-r from-fuchsia-300/20 to-fuchsia-100/50 shadow-fuchsia-200/50 shadow-lg animate-pulse-slow",
};

const tierIcons = {
  Bronze: Shield,
  Silver: Shield,
  Gold: Star,
  Platinum: Trophy,
  Diamond: Gem,
};

export const ReputationCard: React.FC<ReputationCardProps> = ({ user }) => {
  const TierIcon = tierIcons[user.tier] || Shield;
  const progressPercentage = Math.min(
    (user.reputationScore / user.nextTierScore) * 100,
    100
  );

  return (
    <div
      className={twMerge(
        "relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1",
        tierStyles[user.tier]
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Current Tier
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <TierIcon className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-gray-900">
              {user.tier}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">
            {user.reputationScore}
          </p>
          <p className="text-xs text-gray-500">Reputation Score</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-gray-600">
          <span>Progress to next tier</span>
          <span>
            {user.reputationScore} / {user.nextTierScore}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200/50">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
