"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export function VehicleGallery({ images }: { images: { url: string; isPrimary: boolean }[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-secondary">
        <img 
          src="https://placehold.co/1200x800/111111/FFFFFF?text=DOORA+MOBILITY" 
          alt="Placeholder" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Sort primary first
  const sortedImages = [...images].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1));

  return (
    <div className="flex flex-col gap-4">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full aspect-[16/9] rounded-2xl overflow-hidden"
      >
        {sortedImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.url} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {sortedImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full h-24 sm:h-32 rounded-xl"
        >
          {sortedImages.map((img, index) => (
            <SwiperSlide key={index} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer rounded-xl overflow-hidden [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-primary">
              <img src={img.url} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
