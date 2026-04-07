"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Mail, Sparkles, Mountain, Footprints, Globe } from "lucide-react";

const PROFILE_DATA = {
  name: "Peanut",
  role: "Vibe Coder",
  location: "冒险大陆",
  email: "peanut@blog.dev",
  github: "github.com/Peanut7111",
  mbti: "INFJ",
  mbtiDescription: "倡导者人格 - 富有想象力且理想主义",
  purpose: "记录学习和使用 Claude Code 进行编程的博客，通过 Vibe Coding 提高开发效率，创造更多有趣的项目。",
  motto: "山高万仞，直登一步",
  mottoMeaning: "无论山多高，只要迈出第一步，就能到达顶峰。",
};

export function ProfileCard() {
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Card */}
      <div className="rounded-2xl border bg-white dark:bg-neutral-900 overflow-hidden shadow-xl">
        {/* Header Background */}
        <div
          className="h-32"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          }}
        />

        {/* Avatar & Name */}
        <div className="-mt-14 flex justify-center">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-lg rounded-full">
              <AvatarFallback className="text-4xl bg-gradient-to-br from-amber-400 to-orange-500">
                🥕
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Name & Role */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{PROFILE_DATA.name}</h2>
            <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <Sparkles className="h-3 w-3" />
              {PROFILE_DATA.role}
            </p>
          </div>

          {/* MBTI Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {PROFILE_DATA.mbti}
              </span>
              <span className="text-xs text-muted-foreground">
                {PROFILE_DATA.mbtiDescription}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{PROFILE_DATA.location}</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm truncate">{PROFILE_DATA.email}</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 col-span-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{PROFILE_DATA.github}</span>
            </div>
          </div>

          {/* Purpose */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              博客目的
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {PROFILE_DATA.purpose}
            </p>
          </div>

          {/* Motto */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mountain className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-lg font-bold text-green-700 dark:text-green-300">
                {PROFILE_DATA.motto}
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Footprints className="h-3 w-3" />
              {PROFILE_DATA.mottoMeaning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
