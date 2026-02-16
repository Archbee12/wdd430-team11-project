"use client";

import { poppins } from "@/app/ui/fonts";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { getCart } from "@/app/lib/cart";

type User = {
  id: string;
  name: string;
  role: string;
};

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [count, setCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load cart count
  useEffect(() => {
    function updateCart() {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCount(total);
    }

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => window.removeEventListener("storage", updateCart);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className={`${poppins.className} text-2xl font-bold`}>
        <Link href="/dashboard">Handcrafted Haven</Link>
      </h1>

      <div className="flex items-center gap-4">
        {user.role === "artisan" ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <UserCircleIcon className="h-7 w-7" />
            </button>
          </div>
        ) : (
          <Link href="/dashboard/cart" className="relative">
            <ShoppingCartIcon className="h-7 w-7" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
