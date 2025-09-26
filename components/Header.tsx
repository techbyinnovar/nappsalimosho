"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/NPSlogo.png";
import RegisterSchoolModal from "./RegisterSchoolModal";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <button className="text-lg font-semibold text-green-700 hover:underline cursor-pointer">Login</button>
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
            <Link href="/schools" onClick={() => setOpen(false)}>Schools</Link>
            <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <button onClick={() => setIsModalOpen(true)} className="bg-green-700 text-white w-full py-2 rounded-lg cursor-pointer">
                Register a School
            </button>
            </nav>
        )}
        </header>
    );
}
