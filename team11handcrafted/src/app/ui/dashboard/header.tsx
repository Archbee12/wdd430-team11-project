"use client";

import { poppins } from "@/app/ui/fonts";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import {
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

type User = {
  id: string;
  name: string;
  role: string; // 'artisan' | 'buyer' | 'admin'
};

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className={`${poppins.className} text-2xl font-bold`}>
        Handcrafted Haven
      </h1>

      <div className="flex items-center gap-4">
        {user.role === "artisan" ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-lg font-medium"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <UserCircleIcon className="profile-icon" />
            </button>
            {dropdownOpen && (
              <div className="profile-panel">
                <div className="profile-header">
                  <UserCircleIcon className="profile-avatar" />
                  <span>{user.name}</span>
                </div>

                <Link
                  href={`/dashboard/artisans/${user.id}`}
                  className="profile-link"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Profile
                </Link>

                <Link
                  href="/dashboard/artisans/products"
                  className="profile-link"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Products
                </Link>
              </div>
            )}

          </div>
        ) : (
          <Link href="/dashboard/cart" className="cart-link">
            <ShoppingCartIcon className="cart-icon" />
          </Link>
        )}
      </div>
    </header>
  );
}
