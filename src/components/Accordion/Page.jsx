import { title } from "process";
import React from "react";

const accordionData = [
  {
    id: 1,
    title: "Where does Movie Explorer get its movie data from?",
    content:
      "Movie Explorer retrieves movie and TV show data from TMDB (The Movie Database). This includes details such as movie descriptions, ratings, release dates, and posters.",
  },

  {
    id: 2,
    title: "Why are some movies missing information or images?",
    content:
      "Since Movie Explorer relies on TMDB, if a movie’s information has not been updated on TMDB, it may result in missing posters, details, or ratings.",
  },

  {
    id: 3,
    title: "Can I watch movies or TV shows on Movie Explorer?",
    content:
      "No, Movie Explorer is designed for browsing movie information and recommendations only. It does not provide streaming services, but you can follow links to official sources for more details.",
  },

  {
    id: 4,
    title: "Where do the ratings come from, and how reliable are they?",
    content:
      "The ratings displayed come from TMDB User Ratings, which are based on real user reviews from a global audience. These ratings reflect audience opinions but may differ from critic scores.",
  },

  {
    id: 5,
    title: "Can I search or filter movies based on my preferences?",
    content:
      "Yes! Movie Explorer allows you to search and filter movies based on genre, release year, popularity, and ratings, making it easier to find movies that match your interests.",
  },
];

function AccordionITem({ title, content, isExpanded, onToggle }) {
  return <div></div>;
}

export const Page = () => {
  return <div>Page</div>;
};
