import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProducts from "../components/BannerProducts";
import HorizontalProductCard from "../components/HorizontalProductCard";
import VerticalProductCard from "../components/VerticalProductCard";

const Home = () => {
  return (
    <div className="h-[90vh] w-screen">
      <div className="h-full w-full md:p-0 overflow-y-scroll scrollbar-none">
        <CategoryList />
        <BannerProducts />
        <HorizontalProductCard category={"airpods"} heading={"Top's Airpods"} />
        <HorizontalProductCard
          category={"camera"}
          heading={"Popular Camera's"}
        />
        <VerticalProductCard category={"mobiles"} heading={"Popular Mobiles"} />
        <VerticalProductCard
          category={"earphones"}
          heading={"Popular Earphones"}
        />
        <VerticalProductCard category={"mouse"} heading={"Popular Mouse"} />
        <VerticalProductCard
          category={"proccessor"}
          heading={"Most popular Proccessor"}
        />
        <VerticalProductCard
          category={"televisions"}
          heading={"Trending Televisions"}
        />
        <VerticalProductCard
          category={"printers"}
          heading={"Popular Printers"}
        />
        <VerticalProductCard
          category={"refrigerator"}
          heading={"Trending Refrigerator"}
        />
        <VerticalProductCard
          category={"speakers"}
          heading={"Popular Speakers"}
        />
        <VerticalProductCard
          category={"trimmers"}
          heading={"Popular Trimmers"}
        />
        <VerticalProductCard category={"watches"} heading={"Popular Watches"} />
      </div>
    </div>
  );
};

export default Home;
