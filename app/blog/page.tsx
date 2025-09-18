import FeaturedArticle from '@/components/FeaturedArticle';
import RecentPosts from '@/components/RecentPost';
import React from 'react'

export default function Blog() {
  const categories = ["All Posts", "Education", "Policy", "Events", "Seminar", "News"];
  return (
    <div className='bg-white'>
      <section className="text-center py-20 bg-[url('../public/images/tealbg.png')] bg-no-repeat bg-bottom bg-cover">
        <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-4">
          NAPPS Blog
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-700">
          Stay updated with the latest insights, updates, and educational excellence from NAPPS.
        </p>
      </section>

      <div className="flex flex-wrap justify-center gap-3 py-8">
        {categories.map((category, idx) => (
          <button
            key={idx}
            className="px-5 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition cursor-pointer"
          >
            {category}
          </button>
        ))}
      </div>

      <FeaturedArticle />
      <RecentPosts />

      {/* Newsletter */}
      <section className="bg-[#EDFBEE] py-16 text-center">
        <h2 className="text-2xl md:text-4xl text-green-800 font-medium mb-2">Stay Updated</h2>
        <p className="text-gray-600 text-sm md:text-lg mb-10">
          Subscribe to our newsletter and never miss the latest insights from NAPPS Alimosho Chapter.
        </p>
        <form className="flex justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 rounded-r-lg hover:bg-green-700 transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  )
}
