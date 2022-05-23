import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Music Video",
    description: "Taylor Swift's music videos",
    image: "/assets/images/taylor-swift.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Lyric Video",
    description: "Taylor Swift's lyric videos",
    image: "/assets/images/banner.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Interview",
    description: "Taylor Swift's interviews",
    image: "/assets/images/interview1.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Concert",
    description: "Taylor Swift's concert videos",
    image: "/assets/images/concert.jpg",
  },
];
