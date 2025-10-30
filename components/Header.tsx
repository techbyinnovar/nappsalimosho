"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/NPSlogo.png";
import RegisterSchoolModal from "./RegisterSchoolModal";

export default function Header() {
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Determine dashboard route dynamically
    const role = session?.user?.role?.toLowerCase();
    const dashboardRoute =
    role === "admin"
        ? "/admin/dashboard"
        : role === "owner"
        ? "/owner/dashboard"
        : "/dashboard";
    console.log("Session data:", session);
    
    // const dashboardRoute = session?.user?.role === "admin" ? "/admin/dashboard" : "/owner/dashboard";
    // const adminDashboardRoute = session?.user?.role === "admin" && "/admin/dashboard";
    // const ownerDashboardRoute = session?.user?.role === "owner" && "/owner/dashboard";    

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-0 px-6 md:px-24">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="logo" width={80} height={80} />
                    <div className="flex flex-col">
                        <p className="text-green-800 font-bold text-2xl mb-0">NAPPS </p>
                        <p className="text-yellow-500 text-sm uppercase">Alimosho Chapter</p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-gray-700">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/zones">Zones</Link>
                    <Link href="/events">Events</Link>
                    <Link href="/gallery">Gallery</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                </nav>

                {/* CTA */}
                <div className="hidden md:flex gap-8">
                    {session ? (
                        <>
                            <span>Welcome, {session.user?.email}</span>
                            <button
                                onClick={() => signOut()}
                                className="text-lg font-semibold text-green-700 hover:underline cursor-pointer"
                            >
                                Logout
                            </button>

                            {/* Go to Dashboard button (only visible when logged in) */}
                            <Link
                                href={dashboardRoute}
                                className="bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-800 cursor-pointer"
                            >
                                Go to Dashboard
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="text-lg font-semibold text-green-700 hover:underline cursor-pointer"
                        >
                            Login
                        </button>
                    )}

                    {/* Always visible Register button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-800 cursor-pointer"
                    >
                        Register Your School
                    </button>
                </div>

                {/* Modal */}
                <RegisterSchoolModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-green-800"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <nav className="md:hidden flex flex-col bg-white text-lg px-6 hover:underline text-green-800 py-4 space-y-3 text-center">
                    <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                    <Link href="/zones" onClick={() => setOpen(false)}>Zones</Link>
                    <Link href="/events" onClick={() => setOpen(false)}>Events</Link>
                    <Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
                    <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
                    <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

                    {/* Conditionally show Dashboard + Auth buttons */}
                    {session ? (
                        <>
                            <Link
                                href={dashboardRoute}
                                onClick={() => setOpen(false)}
                                className="bg-green-700 text-white w-full py-2 rounded-lg cursor-pointer"
                            >
                                Go to Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    signOut();
                                    setOpen(false);
                                }}
                                className="text-green-700 font-semibold underline"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                signIn();
                                setOpen(false);
                            }}
                            className="text-green-700 font-semibold underline"
                        >
                            Login
                        </button>
                    )}

                    {/* Always visible Register button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-700 text-white w-full py-2 rounded-lg cursor-pointer"
                    >
                        Register a School
                    </button>
                </nav>
            )}
        </header>
    );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        