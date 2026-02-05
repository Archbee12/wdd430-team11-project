import { StaticImageData } from "next/image";

import aminaImg from "/images/artisans/amina.jpg";
import kwameImg from "/images/artisans/kwame.jpg";
import zaraImg from "/images/artisans/zara.jpg";
import lucaImg from "/images/artisans/luca.jpg";
import sofiaImg from "/images/artisans/sofia.jpg";
import yukiImg from "/images/artisans/yuki.jpg";

import toteImg from "/images/products/leather-tote.jpg";
import bowlImg from "/images/products/ceramic-bowl.jpg";

export type Artisan = {
  id: string;
  name: string;
  craft: string;
  location: string;
  image: StaticImageData;
};

export const artisans: Artisan[] = [
  {
    id: "amina-okafor",
    name: "Amina Okafor",
    craft: "Leatherwork",
    location: "Nigeria",
    image: aminaImg,
  },
  {
    id: "kwame-mensah",
    name: "Kwame Mensah",
    craft: "Wood Carving",
    location: "Ghana",
    image: kwameImg,
  },
  {
    id: "zara-hassan",
    name: "Zara Hassan",
    craft: "Textile Weaving",
    location: "Morocco",
    image: zaraImg,
  },
  {
    id: "luca-bernardi",
    name: "Luca Bernardi",
    craft: "Ceramics",
    location: "Italy",
    image: lucaImg,
  },
  {
    id: "sofia-ramirez",
    name: "Sofia Ramirez",
    craft: "Handmade Jewelry",
    location: "Mexico",
    image: sofiaImg,
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    craft: "Paper Art",
    location: "Japan",
    image: yukiImg,
  },
];

export type Review = {
  author: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  craft: string;
  price: number;
  image: StaticImageData;
  reviews: Review[];
};

export const products: Product[] = [
  {
    id: "leather-tote",
    name: "Handmade Leather Tote",
    craft: "Leatherwork",
    price: 120,
    image: toteImg,
    reviews: [
      { author: "Jane", rating: 5, comment: "Beautiful craftsmanship!" },
      { author: "Mark", rating: 4, comment: "Very sturdy and stylish." },
    ],
  },
  {
    id: "ceramic-bowl",
    name: "Ceramic Serving Bowl",
    craft: "Ceramics",
    price: 65,
    image: bowlImg,
    reviews: [
      { author: "Anna", rating: 5, comment: "Looks amazing on my table." },
    ],
  },
];