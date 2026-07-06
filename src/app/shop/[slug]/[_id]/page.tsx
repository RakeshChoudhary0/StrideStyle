import React from "react";
import { notFound } from "next/navigation";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";
import ProductView from "@/Features/Shop/SectionsProduct/ProductView";

interface ProductPageProp {
  params: Promise<{
    slug: string;
    _id: string;
  }>;
  searchParams: Promise<{
    c: string;
    [key: string]: string | string[] | undefined;
  }>;
}

const Page = async ({ params, searchParams }: ProductPageProp) => {
  const { slug } = await params;

  // 1. Resolve exact product payload matching route slug
  const targetProduct = Product.find((p) => p.slug === slug);
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
