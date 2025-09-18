"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/NPSlogo.png";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "idle" | "ok" | "error">(null);

  function validateEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }
    // Here you'd call an API to save the email. For now we show success.
    setStatus("ok");
    setEmail("");
    setTimeout(() => setStatus(null), 4000);
  }

  return (
    <footer className="bg-green-900 text-white mt-0 px-6 md:px-24">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-6 gap-24">
        {/* Brand */}
        <div className="md:col-span-3 col-span-1">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <Image src={logo} alt="logo" width={80} height={80} />
                <div className="flex flex-col">
                    <p className="text-white font-bold text-2xl mb-0">NAPPS </p>
                    <p className="text-[#FEF547] text-sm uppercase">Alimosho Chapter</p>
                </div>
            </Link>
          </div>

          <p className="text-sm md:text-lg text-white/70 mt-4 md:mt-2 md:w-[65%]">
            We support private school proprietors with training, advocacy and resources — and help parents find trusted schools.
          </p>

          <div className="flex gap-3 mt-4">
            <SocialIcon ariaLabel="Facebook" href="#" svgPath={<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.95v-7.05H8.09v-2.9h2.35V9.41c0-2.33 1.38-3.61 3.49-3.61.99 0 2.03.17 2.03.17v2.24h-1.15c-1.13 0-1.48.7-1.48 1.42v1.7h2.5l-.4 2.9h-2.1V22C18.34 21.2 22 17.06 22 12.07z"/></svg>} />
            <SocialIcon ariaLabel="Twitter" href="#" svgPath={<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 .5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.17 0-.34-.02-.5A7.72 7.72 0 0023 3z"/></svg>} />
            <SocialIcon ariaLabel="Instagram" href="#" svgPath={<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A3.8 3.8 0 1015.8 12 3.8 3.8 0 0012 8.2zM18.5 6.1a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>} />
          </div>
        </div>

        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0">
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-[#FEF547]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/zones" className="hover:underline">Zones</a></li>
              <li><a href="/events" className="hover:underline">Events</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-[#FEF547]">Resources</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="/blog" className="hover:underline">Blog</a></li>
              <li><a href="/gallery" className="hover:underline">Gallery</a></li>
              <li><a href="#" className="hover:underline">Join NAPPS Alimosho</a></li>
              <li><a href="#" className="hover:underline">Sponsorship</a></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 text-[#FEF547]">Contact & Newsletter</h4>
            <div className="text-sm text-white/80">
              <span className="flex items-start gap-3 justify-start"><MapPinIcon className="text-sm w-10 h-10" /> 69, Akowonjo road, Combine plaza, Micom bus stop, Egbeda, Lagos.</span>
              <div className="flex items-start gap-3 justify-start"><PhoneIcon className="text-sm w-8 h-8" />0803 678 9605, 0802 312 4449, 0802 329 4261, 0802 336 6082.</div>
              <div className="flex items-start gap-3 justify-start"><EnvelopeIcon className="text-sm w-4 h-4" /> nappsalimosho1@gmail.com</div>
            </div>

            <form onSubmit={handleSubscribe} className="mt-4">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  className="w-full px-3 py-2 rounded-lg text-green-900 bg-white outline-none"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  required
                />
                <button type="submit" className="bg-green-700 px-3 py-2 rounded-lg text-white hover:bg-green-800">Subscribe</button>
              </div>

              {status === "ok" && <p className="text-sm text-green-200 mt-2">Thanks — you're subscribed!</p>}
              {status === "error" && <p className="text-sm text-red-200 mt-2">Please enter a valid email.</p>}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
          <span>© {new Date().getFullYear()} NAPPS Alimosho. All rights reserved.</span>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <a href="https://schoolwave.ng/" className="hover:underline">Powered by Schoolwave</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Tiny Social Icon wrapper */
function SocialIcon({ ariaLabel, href, svgPath }: { ariaLabel: string; href: string; svgPath: React.ReactNode; }) {
  return (
    <a aria-label={ariaLabel} href={href} className="p-2 flex items-center justify-center rounded-md bg-white/8 hover:bg-white/12">
      <span className="sr-only">{ariaLabel}</span>
      <div className="w-6 h-6 text-white">{svgPath}</div>
    </a>
  );
}
