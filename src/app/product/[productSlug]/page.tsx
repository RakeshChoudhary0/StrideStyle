import React from "react";
import { notFound } from "next/navigation";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";
import ProductView from "@/Features/Shop/SectionsProduct/ProductView";

interface ProductPageProp {
  params: Promise<{
    productSlug: string;
  }>;
}

const Page = async ({ params }: ProductPageProp) => {
  const { productSlug } = await params;

  const targetProduct = Product.find((p) => p.slug === productSlug);
  if (!targetProduct) return notFound();

  const parentData = Parent.find((p) => p._id === targetProduct.parent);

  const relatedVariants = Product.filter(
    (p) => p.parent === targetProduct.parent,
  );

  return (
    <ProductView
      currentProduct={targetProduct}
      parentData={parentData}
      variants={relatedVariants}
    />
  );
};

export default Page;
