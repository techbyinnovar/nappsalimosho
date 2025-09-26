import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhoWeAre from "@/components/WhoWeAre";
import CoreValues from "@/components/CoreValues";
import WhatWeDo from "@/components/WhatWeDo";
import Testimonials from "@/components/Testimonials";
import SchoolFinder from "@/components/SchoolFinder";
import Blog from "@/components/Blog";
import Adverts from "@/components/Adverts";
import { trpc } from "@/src/utils/trpc";

export default function Home() {
  return (
    <div className="">
      <main className="bg-white">
        <Hero />
        <WhoWeAre />
        <CoreValues />
        <WhatWeDo />
        <Stats />
        <SchoolFinder />
        <Testimonials />
        <Blog />
        <Adverts />
      </main>
    </div>
  );
}
