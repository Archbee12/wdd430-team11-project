"use client";

import { poppins } from "@/app/ui/fonts";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { getCart } from "@/app/lib/cart";

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
  const [count, setCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ================= CART COUNT (BUYERS ONLY) ================= */
  useEffect(() => {
    if (user.role !== "buyer") return;

    function updateCart() {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCount(total);
    }

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => window.removeEventListener("storage", updateCart);
  }, [user.role]);

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container">

        <h1 className={`logo ${poppins.className}`}>
          <Link href="/dashboard">Handcrafted Haven</Link>
        </h1>

        <div className="header-actions">

          {/* ================= ARTISAN VIEW ================= */}
          {user.role === "artisan" && (
            <div className="profile-wrapper" ref={dropdownRef}>
              <button
                className="profile-button"
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
          )}

          {/* ================= BUYER VIEW ================= */}
          {user.role === "buyer" && (
            <Link href="/dashboard/cart" className="cart-link">
              <ShoppingCartIcon className="cart-icon" />
              {count > 0 && (
                <span className="cart-badge">{count}</span>
              )}
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
