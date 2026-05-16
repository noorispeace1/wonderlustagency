"use client";

import React, { useState } from "react";
import { Button, Card, DateField, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { 
  HiOutlineCalendar, 
  HiOutlineShieldCheck, 
  HiOutlineLocationMarker, 
  HiArrowRight 
} from "react-icons/hi";

const BookingCard = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [departureDate, setDepartureDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { price, _id, destinationName, imageUrl, country } = destination;

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please log in to book a trip!");
      return;
    }

    if (!departureDate) {
      toast.error("Please select a travel date!");
      return;
    }

    setIsSubmitting(true);

    // HeroUI uses Calendar Date models; safely parse them into a standardized Native JS Date object
    let calculatedDate;
    try {
      if (departureDate && typeof departureDate.toDate === "function") {
        calculatedDate = departureDate.toDate("UTC"); 
      } else {
        calculatedDate = new Date(departureDate);
      }
    } catch (e) {
      calculatedDate = new Date();
    }

    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: calculatedDate,
    };

    try {
      const { data: tokenData } = await authClient.token();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        // FIX: The authorization property MUST live inside your headers block
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData?.token || ""}`
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success("Spot reserved successfully!");
        router.push("/my-bookings");
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData?.message || "Booking rejected by server.");
      }
    } catch (err) {
      console.error("Booking API Client Error:", err);
      toast.error("Booking failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-0 border-none bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden max-w-sm sticky top-10">
      {/* Top Banner Section */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">
          Best package Deal
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-light">$</span>
          <h2 className="text-5xl font-black tracking-tighter">{price}</h2>
          <span className="text-sm font-medium opacity-90 ml-2">/ person</span>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Destination Info Badge */}
        <div className="flex items-center gap-3 text-slate-600">
          <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
            <HiOutlineLocationMarker size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Location</p>
            <p className="font-bold text-slate-800">{destinationName}, {country}</p>
          </div>
        </div>

        {/* Improved Date Selection */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
            <HiOutlineCalendar className="text-cyan-500" size={16} />
            Preferred Departure
          </Label>
          <div className="relative group">
            <DateField 
              onChange={setDepartureDate} 
              className="w-full" 
              variant="bordered"
              radius="xl"
            >
              <DateField.Group className="bg-slate-50/50 border-slate-200 py-3 px-4 group-hover:border-cyan-400 transition-colors">
                <DateField.Input className="text-base font-bold text-slate-700">
                  {(segment) => (
                    <DateField.Segment 
                      segment={segment} 
                      className="focus:bg-cyan-500 focus:text-white rounded px-0.5"
                    />
                  )}
                </DateField.Input>
              </DateField.Group>
            </DateField>
          </div>
        </div>

        {/* Trust Factors */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
            <HiOutlineShieldCheck className="text-emerald-500" size={18} />
            Secure Payment & Instant Ticket
          </div>
          <p className="text-[10px] text-slate-400 italic leading-relaxed">
            *No hidden fees. Cancellation available up to 48 hours before departure.
          </p>
        </div>

        {/* Premium Action Button */}
        <Button 
          onClick={handleBooking}
          isLoading={isSubmitting}
          className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-cyan-600 text-white font-black text-lg transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-cyan-200 group"
        >
          {!isSubmitting && (
            <span className="flex items-center gap-3">
              Book Your Trip
              <HiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default BookingCard;