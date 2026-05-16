import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { 
  HiOutlineLocationMarker, 
  HiOutlineStar, 
  HiOutlineChevronLeft,
  HiOutlineCheckCircle,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineShieldCheck
} from "react-icons/hi";
import { EditModal } from '@/components/EditModal';
import { DeleteAlert } from '@/components/DeleteAlert';
import BookingCard from '@/components/BookingCard';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  console.log(token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
   headers:{
    authorization : `Bearer ${token}`
   }
  });
  const destination = await res.json();

  const { 
    imageUrl, 
    destinationName, 
    duration, 
    country, 
    rating, 
    description,
  } = destination;

  const highlights = [
    "Luxury beachfront accommodation",
    "Traditional Balinese spa treatment",
    "Sunrise trek to Mount Batur",
    "Visit Uluwatu Temple at sunset",
    "Private beach dinner experience"
  ];

  return (
    <main className="min-h-screen bg-[#FCFCFD] pb-32">
      
      {/* --- Sticky Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-all font-bold text-sm uppercase tracking-widest">
            <HiOutlineChevronLeft className="group-hover:-translate-x-1 transition-transform" /> 
            Back
          </Link>
          <div className="flex items-center gap-4">
            <EditModal destination={destination}/>
            <DeleteAlert destination={destination} />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* --- Hero Image Section --- */}
        <div className="relative group h-[500px] w-full overflow-hidden rounded-[3rem] shadow-2xl shadow-slate-200">
          <Image 
            src={imageUrl}
            alt={destinationName}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-white text-sm font-bold mb-4">
              <HiOutlineLocationMarker className="text-cyan-400" />
              {country}
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase">{destinationName}</h1>
          </div>
        </div>

        {/* --- Main Content Area --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8">
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-8 pb-10 border-b border-gray-100 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <HiOutlineStar size={24} className="fill-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</p>
                  <p className="text-lg font-bold text-slate-900">{rating || "4.9"} <span className="text-sm font-normal text-slate-400">(234)</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                  <HiOutlineCalendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                  <p className="text-lg font-bold text-slate-900">{duration || "7 Days"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <HiOutlineShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety</p>
                  <p className="text-lg font-bold text-slate-900">Verified</p>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-cyan-500 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Experience</h3>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {description || "Experience a journey like no other. From secret spots to iconic landmarks, we curate every detail to ensure your trip is nothing short of extraordinary."}
              </p>
            </section>

            {/* Highlights Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-amber-500 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Tour Highlights</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((point, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-gray-100 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-50 transition-all group">
                    <div className="mt-1 p-1 bg-cyan-100 rounded-full text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                      <HiOutlineCheckCircle size={18} />
                    </div>
                    <span className="text-slate-700 font-bold text-sm leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Decorative Card */}
            <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] relative overflow-hidden">
               <div className="relative z-10">
                 <HiOutlineSparkles className="text-cyan-400 mb-4" size={40} />
                 <h4 className="text-2xl font-bold text-white mb-2">Need a Custom Itinerary?</h4>
                 <p className="text-slate-400 max-w-md">Our travel experts are ready to craft a unique journey just for you and your family.</p>
               </div>
               <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 transition-all duration-500">
               <BookingCard destination={destination} />
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;