"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
export function Nav() {
  const pathname = usePathname();
  const universe = pathname === "/research";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);
  const openSearch = () => window.dispatchEvent(new CustomEvent("open-search"));
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={`site-nav${universe ? " universe-nav" : ""}`}>
        <div className="nav-inner">
          {universe ? (
            <Link href="/" className="universe-wordmark" aria-label="Zawwar Sami — home">
              <span className="universe-star" aria-hidden="true">✦</span>
              <span>Zawwar Sami<small>Research · Systems · Ideas · Humanity</small></span>
            </Link>
          ) : <Logo />}
          <nav aria-label="Main navigation" className="desktop-nav">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "page"
                    : undefined
                }
              >
                {item.label === "Writing" ? "Research" : item.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="nav-icon" onClick={openSearch} aria-label="Search the website">
              <Search size={18} />
            </button>
            <Link href="/contact" className="nav-contact">
              Let’s talk <ArrowUpRight size={15} />
            </Link>
            <button
              ref={triggerRef}
              className="nav-icon menu-trigger"
              aria-label="Open menu"
              aria-haspopup="dialog"
              onClick={() => dialogRef.current?.showModal()}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialogRef}
        className="mobile-menu"
        aria-label="Site navigation"
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="mobile-menu-top">
          <span className="eyebrow">Zawwar Sami / Navigation</span>
          <button
            className="nav-icon"
            aria-label="Close menu"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <nav>
          {site.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => dialogRef.current?.close()}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              <span>0{i + 1}</span>
              {item.label === "Writing" ? "Writing & Research" : item.label}
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </nav>
        <a href={`mailto:${site.email}`} className="text-link">
          {site.email}
        </a>
      </dialog>
    </>
  );
}
