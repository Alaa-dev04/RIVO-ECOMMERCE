import React from "react";
import ProductCard from "@/components/shared/websiteshared/productcard";
import { products } from "@/components/layouts/website/data/products";

const RecoomForU = () => {
  return (
    <section className="p-4 md:p-6 lg:p-9">
      <h2 className="mb-4 text-2xl font-bold">Recommendations For You</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecoomForU;
