import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const companies = [
  {
    name: "Google",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlZHqQcDEcqeJzchyzGnOKKJaeHqEnqu0SlAgUQxcI5Nu9MrL3HOiZbp9ywks0PF0m7-8&usqp=CAU",
  },
  {
    name: "Microsoft",
    img: "https://w7.pngwing.com/pngs/124/600/png-transparent-microsoft-logo-microsoft-thumbnail.png",
  },
  {
    name: "Wipro",
    img: "https://w7.pngwing.com/pngs/157/702/png-transparent-wipro-logo-business-corporate-identity-business-text-service-people-thumbnail.png",
  },
  {
    name: "Infosys",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIP60g6gMjIaAScN63ynve36bOcWETFk3DVA&s",
  },
  {
    name: "Amazon",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8as2muCk45kExDjRAifEppKnIayquBkf37w&s",
  },
];

const FeatureCompanies = () => {
  return (
    <div className="bg-white shadow-md py-6">
      <h1 className="text-center text-xl md:text-2xl font-semibold mb-4 text-gray-800">
        Trusted By Leading Companies
      </h1>

      <div className="relative w-full max-w-6xl mx-auto px-4">
        <Carousel className="w-full">
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
          <CarouselContent className="flex items-center justify-center">
            {companies.map((company, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5 py-2"
              >
                <div className="flex justify-center items-center">
                  <img
                    src={company.img}
                    alt={company.name}
                    className="w-36 h-16 object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default FeatureCompanies;
