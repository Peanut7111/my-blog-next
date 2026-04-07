"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileCard } from "@/components/ui/profile-card";
import { UserCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <h1 className="scrapbook-title mb-12">👤 About Me</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-16 px-8 text-lg rounded-full border-2 border-amber-500/50 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            <UserCircle className="mr-2 h-5 w-5" />
            About Me
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl border">
          <ProfileCard />
        </DialogContent>
      </Dialog>
    </div>
  );
}
