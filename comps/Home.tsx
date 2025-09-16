"use client";
import { useState, useMemo } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<
    "low-to-high" | "high-to-low" | "default"
  >("default");

  // Format price to Japanese Yen
  const formatToYen = (price: number) => {
    return `¥${(price * 150).toLocaleString("ja-JP")}`;
  };

  // Sort products based on selected order
  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") return products;

    return [...products].sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [products, sortOrder]);

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}

        {/* Sort Dropdown */}
        <div className="mt-4 mb-2">
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value as "low-to-high" | "high-to-low" | "default"
              )
            }
            className="px-4 py-2 border border-lightDim rounded-md bg-highLight text-secondary font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="default">Sort by Price</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((product: ProductsTypes) => {
          return (
            <Products
              key={product._id}
              products={product}
              formatToYen={formatToYen}
            />
          );
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
