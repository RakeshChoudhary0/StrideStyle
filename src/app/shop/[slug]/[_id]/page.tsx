import React from "react";

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

const page = async ({ params, searchParams }: ProductPageProp) => {
  console.log(params);
  console.log(searchParams);
  const { slug, _id } = await params;
  const { c: color } = await searchParams;
  return (
    <div className="pt-20">
      <h1>{slug}</h1>
      <p>{_id}</p>
      <p>{color}</p>
      <h1>page</h1>
    </div>
  );
};

export default page;
