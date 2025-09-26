export default function CommunityPage() {
  return (
    <section className="min-h-screen bg-[#181A20] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F0B90B]">
          🚀 Blakdhut Community
        </h1>
        <p className="text-[#B7BDC6] text-lg sm:text-xl">
          Our global crypto community space is <span className="text-white font-semibold">coming soon</span>.  
          Traders, investors, and enthusiasts will soon be able to connect, discuss markets, and share insights right here on Blakdhut.
        </p>
        <p className="text-sm text-[#808A9D]">
          Stay tuned — we’re building something amazing for you.  
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <a
            href="/"
            className="px-6 py-3 rounded-lg font-semibold shadow-md transition bg-[#F0B90B] text-[#0B0E11] hover:opacity-90"
          >
            Back to Home
          </a>
          <a
            href="https://t.me/blakdhutexchange"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-semibold shadow-md border border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B] hover:text-[#0B0E11]"
          >
            Join Our Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
