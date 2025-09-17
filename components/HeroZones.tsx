export default function HeroZones() {
    return (
        <div className="relative h-[380px] flex items-center justify-center text-center text-white bg-[url('../public/images/hero.png')] bg-cover bg-top">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-2 text-[#FFF300]">
                NAPPS Alimosho Zones
                </h1>
                <p className="mb-8 text-lg max-w-2xl mx-auto">
                Explore all Registered Private Schools across the seven zones of NAPPS Alimosho.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 transition cursor-pointer">
                        Become a Member
                    </button>
                    <button className="bg-transparent border-white border text-white px-6 py-3 rounded-lg shadow hover:bg-white hover:text-green-700 transition cursor-pointer">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}
