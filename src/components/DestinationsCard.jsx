import Image from "next/image";
import * as motion from "framer-motion/client";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

// SVG Icons
const LocationIcon = () => (
  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C2.686 0 0 2.686 0 6C0 10.5 6 15 6 15C6 15 12 10.5 12 6C12 2.686 9.314 0 6 0ZM6 8.25C4.758 8.25 3.75 7.242 3.75 6C3.75 4.758 4.758 3.75 6 3.75C7.242 3.75 8.25 4.758 8.25 6C8.25 7.242 7.242 8.25 6 8.25Z" fill="#9CA3AF"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.25 1.75H10.5V0H8.75V1.75H5.25V0H3.5V1.75H1.75C0.784 1.75 0.007 2.534 0.007 3.5L0 12.25C0 13.216 0.784 14 1.75 14H12.25C13.216 14 14 13.216 14 12.25V3.5C14 2.534 13.216 1.75 12.25 1.75ZM12.25 12.25H1.75V5.25H12.25V12.25ZM10.5 7.875H8.75V9.625H10.5V7.875ZM7 7.875H5.25V9.625H7 7.875Z" fill="#9CA3AF"/>
  </svg>
);

const DestinationsCard = ({ destination, index }) => {
  const { imageUrl, price, destinationName, duration, country, rating, isFeatured, _id } = destination;
  const accentColor = "#06B6D4"; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }} // Delay komanu hoyeche mobile-e fast load er jonno
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden bg-slate-100">
        <Image 
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs md:text-sm font-bold text-slate-800 backdrop-blur-md">
          <span>{rating}</span>
          <svg width="12" height="12" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L8.57 4.83H13.65L9.54 7.82L11.11 12.65L7 9.66L2.89 12.65L4.46 7.82L0.35 4.83H5.43L7 0Z" fill="#111827"/>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 md:p-5 space-y-3">
        {/* Location Label */}
        <div className="flex items-center gap-1.5 text-slate-500">
          <LocationIcon />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{country}</span>
        </div>
        
        {/* Title & Price Row */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 line-clamp-2 leading-tight">
            {destinationName}
          </h2>
        
          <div className="flex flex-row sm:flex-col items-baseline sm:items-end gap-1 whitespace-nowrap">
            <span className="text-lg md:text-xl font-black text-cyan-600">${Number(price).toLocaleString()}</span>
            <span className="text-[10px] md:text-xs text-slate-400 font-bold sm:-mt-1">/Person</span>
          </div>
        </div>

        {/* Duration Meta */}
        <div className="flex items-center gap-1.5 text-slate-500 pt-2 border-t border-slate-100">
          <CalendarIcon />
          <span className="text-xs md:text-sm font-medium">{duration}</span>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
          <Link href={`/destinations/${_id}`} className="flex items-center gap-2 text-xs md:text-sm font-black uppercase transition-all hover:gap-3 active:scale-95" style={{ color: accentColor }}>
            BOOK NOW
            <FiExternalLink className="stroke-[3px]" />
          </Link>

          {isFeatured && (
            <span className="text-[10px] font-bold text-slate-300 uppercase italic tracking-tighter">Featured</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const DestinationsGrid = ({ destinations }) => {
  return (
    <section className="bg-slate-50/50 py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <span className="text-cyan-600 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 block">Featured spots</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Recommended <br className="hidden sm:block" /> destinations
            </h2>
          </div>
          <button className="self-start md:self-auto text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors flex items-center gap-2">
            Browse All <span className="text-xl">→</span>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {destinations?.map((item, idx) => (
            <DestinationsCard key={item._id || idx} destination={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsCard;