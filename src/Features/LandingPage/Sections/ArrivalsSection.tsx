import MainProductCard from "@/Components/Products/MainProductCard";
import { Product, Parent } from "../Data/ArrivalsData";

const ArrivalsSection = () => {
  return (
    <section className="w-full  bg-white h-auto text-black py-10 md:py-18 md:px-5 px-1 select-none border-t border-zinc-100">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-15">
          <h2 className="text-3xl md:text-5xl font-streethead font-extrabold uppercase tracking-tight text-primary">
            NEW ARRIVALS
          </h2>
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mt-2">
            Fresh Seasonal Drop / Premium Heavyweight Silhouettes
          </p>
        </div>

        {/* Full-width Responsive Grid */}
        <div className="w-full grid grid-cols-2 gap-x-1 md:gap-y-10 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 md:gap-x-2">
          {Product.map((prod) => {
            // Find parent information to pass down available option colors
            const parentData = Parent.find((p) => p._id === prod.parent);
            const colors = parentData ? parentData.totalColors : [];

            return (
              <MainProductCard
                key={prod._id}
                product={prod}
                availableColors={colors}
              />
            );
          })}
        </div>

        {/* Centered Explore More Action Button */}
        <div className="mt-14 text-center">
          <a
            href="/new-arrivals"
            className="inline-flex items-center justify-center border border-zinc-900 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all duration-300 hover:bg-zinc-950 hover:text-white sm:text-sm"
          >
            Explore More
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArrivalsSection;
