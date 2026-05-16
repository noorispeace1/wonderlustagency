"use client"
import { Separator } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  HiOutlineGlobe, 
  HiOutlineShieldCheck, 
  HiOutlineSupport, 
  HiOutlineLightningBolt,
  HiOutlineArrowNarrowRight
} from "react-icons/hi";

const Banner = () => {
  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      {/* --- Main Banner Section --- */}
      <section className="relative min-h-screen flex flex-col justify-between items-center text-white overflow-hidden">
        {/* Background with subtle Zoom effect */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('/assets/banner.png')] bg-cover bg-center z-0"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-0" />

        {/* Hero Content */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative z-10 p-6 md:p-10 text-center flex flex-col items-center gap-6 flex-1 justify-center w-full max-w-6xl"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-[0.3em] uppercase"
          >
            <HiOutlineGlobe className="text-cyan-400 animate-pulse" />One-tap SOS button in our app
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter"
          >
            DISCOVER YOUR <br /> <span className="text-cyan-400">NEXT</span> ADVENTURE
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl max-w-2xl opacity-90 font-light tracking-wide"
          >
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="uppercase bg-cyan-500 px-10 py-4 cursor-pointer hover:bg-cyan-400 transition-all font-black rounded-full shadow-lg shadow-cyan-500/30 active:scale-95">
              Explore Now
            </button>
            <button className="uppercase px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/30 cursor-pointer hover:bg-white/20 transition-all font-black rounded-full active:scale-95">
              View Destinations
            </button>
          </motion.div>
        </motion.div>

        {/* Glassmorphic Search Bar */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 bg-white/10 backdrop-blur-3xl border-t border-white/10 flex flex-col md:flex-row w-full items-stretch"
        >
          {['Location', 'Date/Duration', 'Budget'].map((item, index) => (
            <div key={item} className="flex flex-1 items-center">
              <div className="px-10 py-8 flex-1 group cursor-pointer hover:bg-white/5 transition-colors">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-1">{item}</h3>
                <p className="text-sm font-bold opacity-80">{index === 0 ? "Where are you going?" : index === 1 ? "Anytime / 3 Days" : "$0 - $3,000"}</p>
              </div>
              {index < 2 && <Separator orientation="vertical" className="hidden md:block h-10 bg-white/20" />}
            </div>
          ))}
          <button className="bg-cyan-500 hover:bg-cyan-400 transition-all py-8 md:py-0 px-16 flex items-center justify-center cursor-pointer group">
            <span className="font-black uppercase tracking-widest text-lg flex items-center gap-3">
              Search <HiOutlineArrowNarrowRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </motion.div>
      </section>

      {/* --- Features Section --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <HiOutlineShieldCheck size={32} />, title: "Verified Packages", color: "bg-blue-500", text: "Verified for safety and premium quality." },
            { icon: <HiOutlineLightningBolt size={32} />, title: "Instant Booking", color: "bg-amber-500", text: "Book your favorite destination instantly." },
            { icon: <HiOutlineSupport size={32} />, title: "24/7 Concierge", color: "bg-emerald-500", text: "Experts available around the clock." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all"
            >
              <div className={`w-16 h-16 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-inherit`}>
                {feature.icon}
              </div>
              <h4 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Tips & Newsletter Section --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
              <span className="px-4 py-1.5 bg-cyan-100 text-cyan-600 rounded-full text-[11px] font-black uppercase tracking-widest">Pro Travel Tips</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mt-6 tracking-tighter leading-none">PLANNING THE <br/> PERFECT ESCAPE</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { num: "01", t: "Choose Your Vibe", d: "Mountains or Deep Blue Seas, know your vibe." },
                { num: "02", t: "Light Packing", d: "Focus on essentials and high-quality gear." },
                { num: "03", t: "Local Immersion", d: "Talk to locals and try authentic street food." }
              ].map((tip, i) => (
                <div key={i} className="flex gap-6 p-6 hover:bg-white hover:shadow-xl hover:shadow-slate-100 rounded-[2rem] transition-all group">
                  <span className="text-4xl font-black text-slate-200 group-hover:text-cyan-400 transition-colors">{tip.num}</span>
                  <div>
                    <h5 className="font-bold text-slate-800 text-xl">{tip.t}</h5>
                    <p className="text-slate-500">{tip.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-4">Weekly Digest</h3>
              <p className="text-slate-400 mb-10 text-lg">Join 50k+ travelers for exclusive deals.</p>
              
              <div className="flex bg-white/10 backdrop-blur-md rounded-3xl p-2 border border-white/10">
                <input type="email" placeholder="Email address" className="bg-transparent flex-1 px-6 outline-none text-sm" />
                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-cyan-400 hover:text-white transition-all">Join</button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Banner;