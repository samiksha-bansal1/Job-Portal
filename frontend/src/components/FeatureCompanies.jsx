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
    <div className="flex items-center px-6 bg-white shadow-md">
      <h1 className="font-semibold text-xl">Trusted By</h1>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselNext />
        <CarouselPrevious />
        <CarouselContent>
          {companies.map((company, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 py-2">
                <img src={company.img} alt={company.name} className="w-64 h-16  object-contain" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeatureCompanies;
