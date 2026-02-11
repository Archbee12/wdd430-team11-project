"use client";

import { poppins } from "@/app/ui/fonts";

type HeaderProps = {
  userName?: string; // Optional: passed from dashboard page server component
};

export default function Header({ userName }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className={poppins.className}>Handcrafted Haven</h1>

      {userName && (
        <span className="text-lg font-medium">Welcome, {userName}</span>
      )}
    </header>
  );
}
