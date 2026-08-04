"use client";

import { useState } from "react";
import { Star, Minus, Plus, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/layouts/website/data/products";


type ProductInfoProps = {
  product: Product;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [qty, setQty] = useState(1);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const inStock = product.stock > 0; // your data uses a count, not a boolean
  const savePercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">{product.title}</h1>
        {product.isNew && (
          <span className="rounded-full bg-[#1A1A1A] px-2.5 py-0.5 text-xs font-medium text-white">
            New
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-0.5 text-[#F97316]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4"
              fill={i < Math.round(product.rating) ? "#F97316" : "none"}
            />
          ))}
        </div>
        <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-[#1A1A1A]">SAR {product.price}</span>
        {product.oldPrice && (
          <span className="text-sm text-muted-foreground line-through">
            SAR {product.oldPrice}
          </span>
        )}
        {savePercent && (
          <span className="rounded-md bg-[#16A34A]/10 px-2 py-0.5 text-xs font-medium text-[#16A34A]">
            Save {savePercent}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${inStock ? "bg-[#16A34A]" : "bg-destructive"}`}
          />
          {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Truck className="h-4 w-4" />
          Free shipping
        </span>
      </div>

      {product.colors && (
        <div>
          <p className="mb-2 text-sm font-medium">Color: {selectedColor}</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                aria-label={color.name}
                className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  selectedColor === color.name ? "border-[#F97316]" : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {product.badges && product.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-[#F2F2F2] px-3 py-1 text-xs font-medium text-[#1A1A1A]"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium">Quantity</p>
        <div className="flex w-fit items-center gap-4 rounded-full border px-3 py-1.5">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-4 text-center text-sm">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {inStock ? (
        <div className="flex items-center gap-3 pt-2">
          <Button size="lg" variant="outline" className="flex-1">
            Add to Cart
          </Button>
          <Button size="lg" className="flex-1 bg-[#F97316] hover:bg-[#F97316]/90">
            Buy Now
          </Button>
          <WishlistButton productId={product.id} />
        </div>
      ) : (
        <div className="flex items-center gap-3 pt-2">
          <Button
            size="lg"
            className="flex-1 bg-[#16A34A] hover:bg-[#16A34A]/90"
            onClick={() => setNotifyOpen(true)}
          >
            Notify
          </Button>
          <WishlistButton productId={product.id} />
        </div>
      )}

      <TrustBadges />

      <StockNotifyModal
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        productTitle={product.title}
      />
    </div>
  );
};

export default ProductInfo;