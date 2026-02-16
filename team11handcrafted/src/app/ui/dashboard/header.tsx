"use client";

import { poppins } from "@/app/ui/fonts";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CartIcon from "@/app/ui/cart/cart-icon";
import { UserCircleIcon} from "@heroicons/react/24/outline";

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

          {/* ========== ARTISAN VIEW ============== */}
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

          {/* =========== BUYER VIEW ============= */}
          {user.role === "buyer" && (
  <CartIcon />
)}

        </div>
      </div>
    </header>
  );
}
