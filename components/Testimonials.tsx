"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const COLORS = ["#F0B90B", "#2B3139", "#0B0E11"]; // Yellow, Grey, Dark Blue

const TESTIMONIALS = [
  {
    name: "Lucky",
    text: "Blakdhut is my go-to plug for crypto exchange. The service is fast, reliable, and legit. Looking forward to doing bigger deals with you soon.",
    avatar: "/avatars/model.jpg",
  },
  {
    name: "Micheal",
    text: "Trading with Blakdhut Exchange has been nothing short of premium. The trust, confidence, and swift responses have impressed me. Seamless and efficient every time.",
    avatar: "/avatars/micheal.jpg",
  },
  {
    name: "Ahmed",
    text: "Blakdhut has given me years of uninterrupted trust and reliability in crypto services. Buying and selling crypto is always easy and swift with them.",
    avatar: "/avatars/almedi.jpg",
  },
  {
    name: "Great Whiney",
    text: "Fast, reliable, and highly recommended! Blakdhut offers one of the best services I've experienced. Keep up the great work.",
    avatar: "/avatars/great.jpg",
  },
  {
    name: "Miracle",
    text: "Fast, reliable, and highly recommended! I’ve purchased over $75,000 worth of crypto through Blakdhut, and the experience has been seamless every time. They truly offer one of the best services I’ve ever used. Keep up the great work.",
    avatar: "/avatars/precious.jpg",
  },
  {
    name: "Silas",
    text: "I’ve been trading with Blakdhut for over 4 years, and during that time, I’ve completed transactions worth more than $200k. The trust, speed, and reliability have been consistent from day one. Blakdhut truly makes crypto trading seamless, and that’s why I keep coming back.",
    avatar: "/avatars/silas.jpg",
  },
];

// tilt styles for desktop
const STYLES = [
  { rotate: "-6deg", zIndex: 10 },
  { rotate: "3deg", zIndex: 20 },
  { rotate: "-2deg", zIndex: 30 },
  { rotate: "5deg", zIndex: 40 },
  { rotate: "-4deg", zIndex: 25 },
  { rotate: "2deg", zIndex: 35 },
];

export default function Testimonials() {
  return (
    <section  id="testimonials" className="w-full py-20 bg-[#181A20]">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F0B90B]">
          What Our Clients Say
        </h2>
        <p className="text-[#B7BDC6] max-w-2xl mx-auto">
          Real voices from traders, investors, and entrepreneurs who trust
          Blakdhut.
        </p>

        {/* Layout wrapper */}
        <div className="relative flex flex-col sm:flex-col md:flex-col lg:flex-row lg:justify-center lg:items-center lg:space-x-[-60px] xl:space-x-[-80px] flex-wrap gap-8">
          {TESTIMONIALS.map((t, i) => {
            const bgColor = COLORS[i % COLORS.length];
            const textColor =
              bgColor === "#F0B90B" ? "#0B0E11" : "#EAECEF";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.08,
                  rotate: "0deg",
                  zIndex: 999,
                  boxShadow: "0 0 25px rgba(240,185,11,0.8)",
                }}
                className="w-full sm:w-[90%] md:w-[80%] lg:w-72 xl:w-80 p-6 rounded-2xl shadow-lg text-left transition-transform cursor-pointer"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  rotate: STYLES[i % STYLES.length].rotate,
                  zIndex: STYLES[i % STYLES.length].zIndex,
                }}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-[#F0B90B]"
                  />
                  <div className="font-semibold text-sm">{t.name}</div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <span key={j}>⭐</span>
                    ))}
                </div>

                {/* Text */}
                <p className="text-sm sm:text-base leading-relaxed">
                  “{t.text}”
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
