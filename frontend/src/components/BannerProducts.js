import React, { useEffect, useState } from "react";

import image1 from "../public/banner/img1.webp";
import image2 from "../public/banner/img2.webp";
import image5 from "../public/banner/img5.webp";
import image3 from "../public/banner/img3.jpg";
import image4 from "../public/banner/img4.jpg";

import mobileImage1 from "../public/banner/img1_mobile.jpg";
import mobileImage2 from "../public/banner/img2_mobile.webp";
import mobileImage3 from "../public/banner/img3_mobile.jpg";
import mobileImage4 from "../public/banner/img4_mobile.jpg";
import mobileImage5 from "../public/banner/img5_mobile.png";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const BannerProducts = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    mobileImage1,
    mobileImage2,
    mobileImage3,
    mobileImage4,
    mobileImage5,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        setCurrentImage((prev) => prev + 1);
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="md:h-[380px] h-[220px] w-full md:my-1 p-3 md:px-6">
      <div className="md:flex h-full w-full overflow-hidden bg-slate-200 hidden">
        {desktopImages.map((img, i) => {
          return (
            <div
              key={img + i}
              className="min-w-full min-h-full h-full w-full relative flex items-center transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="absolute z-10 w-full text-gray-700 md:flex justify-between items-center px-2 hidden">
                <button
                  className="bg-white rounded-full p-2"
                  onClick={prevImage}
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  className="bg-white rounded-full p-2"
                  onClick={nextImage}
                >
                  <FaChevronRight className="text-xl" />
                </button>
              </div>
              <img
                src={img}
                alt="banner"
                className="h-full w-full object-fill rounded-md"
              />
            </div>
          );
        })}
      </div>
      <div className="flex h-full w-full overflow-hidden bg-slate-200 md:hidden">
        {mobileImages.map((img, i) => {
          return (
            <div
              key={img + i}
              className="min-w-full min-h-full h-full w-full relative flex items-center transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="absolute z-10 w-full text-gray-700 flex justify-between items-center px-2">
                <button
                  className="md:bg-white bg-gray-300 rounded-full md:p-2 p-1"
                  onClick={prevImage}
                >
                  <FaChevronLeft className="md:text-xl text-sm" />
                </button>
                <button
                  className="md:bg-white bg-gray-300 rounded-full p-1 md:p-2"
                  onClick={nextImage}
                >
                  <FaChevronRight className="text-sm md:text-xl" />
                </button>
              </div>
              <img
                src={img}
                alt="banner"
                className="h-full w-full object-fill rounded-md"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerProducts;
