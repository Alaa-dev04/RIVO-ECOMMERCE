"use client";


import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/shared/websiteshared/productcard";
import {Chiccos  } from "./data/chiccopicks";
import { Button } from "@/components/ui/button";

const TrendingGlasses = () => {
  return (
    <div className="w-full">
      {/* Brand banner */}
  

      {/* Header row: title + filter/sort/view controls */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trending Glasses</h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:bg-gray-50"
          >
            <SlidersHorizontal size={32} />
            Filter
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md border px-3 py-3 text-sm text-muted-foreground hover:bg-gray-50"
          >
            Sort: Relevance
          </button>

          <div className="flex items-center rounded-md border overflow-hidden">
            <button
              type="button"
              className="p-1.5"
              aria-label="Grid view"
            >
              <Grid2X2 size={32}  />
            </button>
            <button
              type="button"
              className="p-1.5"
              aria-label="List view"
            >
              <List size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Chiccos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All */}
      <div className="mt-6 flex justify-center">
       <Button
       variant={"pill"}
       size={"pill"}>
        View ALL
        </Button>
      </div>
    </div>
  );
};

export default TrendingGlasses;