"use client";
import React, { useState } from "react";
import Image from "next/image";
import img1 from "../../public/images/img1.jpg";
import img2 from "../../public/images/img2.jpg";
import img3 from "../../public/images/img3.jpg";
import img4 from "../../public/images/img4.jpg";
import img5 from "../../public/images/img5.jpg";
import img6 from "../../public/images/img6.jpg";
import img7 from "../../public/images/img7.jpg";
import img8 from "../../public/images/img8.jpg";

const CATEGORIES = [
  "All Photos",
  "Conferences",
  "School Events",
  "Awards",
  "Workshops",
  "Trainings",
];

const photos = [
  { id: 1, src: img1, alt: "Conference hall", category: "Conferences" },
  { id: 2, src: img2, alt: "Teachers and staff", category: "School Events" },
  { id: 3, src: img3, alt: "Audience listening", category: "School Events" },
  { id: 4, src: img4, alt: "Award recipients", category: "Awards" },
  { id: 5, src: img5, alt: "Seminar group", category: "Conferences" },
  { id: 6, src: img6, alt: "Panel discussion", category: "School Events" },
  { id: 7, src: img7, alt: "Training session", category: "Trainings" },
  { id: 8, src: img8, alt: "Workshop participants", category: "Workshops" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Photos");

  const filteredPhotos =
    activeCategory === "All Photos"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      <div className="text-center py-24 bg-[url('../public/images/tealbg.png')] bg-no-repeat bg-bottom bg-cover">
        <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-4">Gallery</h1>
        <p className="max-w-4xl mx-auto text-lg md:text-2xl text-gray-700">Explore the vibrant moments and achievements from our member schools, conferences, and educational events that showcase the excellence in private education.</p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-shadow focus:outline-none border ${
                  isActive
                    ? "bg-green-700 text-white border-transparent shadow-md"
                    : "bg-white text-green-700 border-green-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo, id) => (
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white" key={id}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={800}
                loading="lazy"
                className="w-full h-48 sm:h-40 md:h-44 object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-center">
        <button className="px-6 py-2 rounded-full bg-green-700 text-white font-medium shadow cursor-pointer">Load More Photos</button>
      </div>

      {/* CTA Section */}
      <section className="bg-green-50">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-800">Ready to Join Our Next Event?</h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest events and never miss an opportunity to grow your
            educational network.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 rounded-full bg-green-700 text-white font-medium shadow cursor-pointer">Become a Member</button>
            <button className="px-6 py-3 rounded-full border border-green-300 text-green-700 font-medium bg-white cursor-pointer">Subscribe to Updates</button>
          </div>
        </div>
      </section>
    </main>
  );
}
