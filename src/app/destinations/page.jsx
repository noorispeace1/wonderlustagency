import DestinationsCard from "@/components/DestinationsCard";

const DestinationsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
    next: { revalidate: 0 } 
  });
  const destinations = await res.json();
console.log(destinations);
  return (
    <div className="py-10 md:py-16 px-4">
      {/* Container and Title */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 border-b pb-4">
          All Destinations
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {destinations?.map((destination, index) => (
            <DestinationsCard 
              key={destination._id} 
              destination={destination} 
              index={index} 
            />
          ))}
        </div>

        {/* Data na thakle empty state */}
        {destinations?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">No destinations found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;