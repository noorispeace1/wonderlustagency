import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
const {token} = await auth.api.getToken({
  headers:await headers(),
})

  const user = session?.user;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
    headers:{
authorization:`Bearer ${token}`
    }
  
  });
  
  const bookings = await res.json();

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-white p-8 rounded-[2.5rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] border border-slate-100">
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent tracking-tight">
              My Bookings
            </h1>
            <p className="text-slate-500 mt-3 text-lg font-medium italic">
              Ready for your next adventure, <span className="text-indigo-600 font-bold capitalize">{user?.name || 'Traveler'}</span>?
            </p>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 font-bold tracking-tight">
              {bookings.length} active plans
            </span>
          </div>
        </div>

        {/* Bookings List */}
        <div className="grid gap-12">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="group relative bg-white border border-slate-200 rounded-[3rem] overflow-hidden hover:border-indigo-400/50 transition-all duration-500 flex flex-col md:flex-row hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)]"
              >
                {/* Image Section with Confirmation Tag */}
                <div className="relative w-full md:w-[420px] h-72 md:h-auto overflow-hidden">
                  <Image
                    src={booking.imageUrl}
                    alt={booking.destinationName}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  
                  {/* Status Badge on Image */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 bg-emerald-500 text-white text-[11px] font-black px-4 py-2 rounded-full shadow-xl shadow-emerald-500/30 uppercase tracking-[0.15em]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Confirmed
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 text-white">
                     <p className="text-sm font-medium opacity-80 mb-1 leading-none uppercase tracking-widest">Destination</p>
                     <h3 className="text-3xl font-black tracking-tight">{booking.destinationName}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-10 md:p-14 flex flex-col justify-between relative">
                  {/* Decorative Background Icon */}
                  <div className="absolute top-10 right-10 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity hidden lg:block">
                    <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24"><path d="M10.18 9L15.3 4.22c.28-.26.68-.31 1.02-.13l1.14.63c.34.18.49.59.36.95L15.65 11H19c.55 0 1 .45 1 1s-.45 1-1 1h-4.35l2.17 5.35c.13.36-.02.77-.36.95l-1.14.63c-.34.18-.74.13-1.02-.13L10.18 15H6c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h4.18z"/></svg>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 block">Booking Status</span>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold ring-1 ring-inset ring-indigo-200">
                           Reserved Successfully
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Cost</p>
                        <p className="text-4xl font-black text-slate-900 leading-none">
                          <span className="text-2xl text-slate-400 font-medium mr-1">$</span>{booking.price}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Departure</p>
                          <p className="text-lg font-extrabold text-slate-800">
                            {new Date(booking.departureDate).toLocaleDateString("en-US", {
                              month: "short", day: "2-digit", year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-[1.25rem] bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200">
                           <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Reference ID</p>
                          <p className="text-sm font-mono font-bold text-slate-600">#{booking._id.slice(-10).toUpperCase()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-3 text-amber-600 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <p className="text-xs font-bold tracking-tight">Cancellable 48 hours before trip</p>
                     </div>
                     <div className="w-full sm:w-auto transform active:scale-95 transition-transform">
                        <BookingCancelAlert bookingId={booking._id} />
                     </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-200 shadow-inner">
              <div className="w-32 h-32 bg-slate-50 text-slate-300 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 transform -rotate-12 border border-slate-100">
                 <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">No adventures found!</h3>
              <p className="text-slate-500 mt-3 text-lg max-w-sm mx-auto">Your booking history is currently empty. Ready to fill it with memories?</p>
              <button className="mt-10 px-10 py-4 bg-indigo-600 text-white font-black rounded-[1.5rem] hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1">
                 Discover New Places
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingPage;