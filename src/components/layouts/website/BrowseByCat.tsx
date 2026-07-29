import React from "react";
import { CatData } from "./data/CatData,";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const BrowseByCat = () => {
  return (
    <>
      <div className="pt-4 md:pt-6 max-w-[1280px] m-auto">
        {/* catogory hed dev */}
        <div className="flex flex-row justify-between ">
          {" "}
          <h3 className="font-bold text-2xl ">Browse by Category</h3>
          <Link href="/Cat">
            <div className="flex flex-row gap-2">
              <p className="text-[#F97316] text-[20px] font-light">
                All categories
              </p>
              <MoveRight className="text-[#F97316]" />
            </div>
          </Link>
        </div>
        {/* catogory card dev */}
        <div className="flex flex-row justify-between gap-6 ">
          {CatData.slice(0, 5).map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group flex w-[104px] shrink-0 snap-start flex-col items-center gap-2 sm:w-[128px]"
            >
              <span className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-[#FBF7F7] p-4">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </span>

              <span className="text-center text-sm font-medium leading-tight text-foreground">
                {category.title}
              </span>

              <span className="text-xs text-muted-foreground">
                {category.itemCount} items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseByCat;
