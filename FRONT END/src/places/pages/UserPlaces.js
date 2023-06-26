import React from "react";

// HOOKS
import { useParams } from "react-router-dom";
// COMPONENTS
import PlacesList from "../components/PlacesList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    imageUrl:
      "https://www.findingtheuniverse.com/wp-content/uploads/2020/07/Empire-State-Building-view-from-uptown_by_Laurence-Norah-2.jpg",
    description: "One of the very famous sky scraper in the world!",
    address: "New York City",
    location: {
      lng: 40.7484405,
      lat: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Segrada Familia",
    imageUrl:
      "https://cdn.britannica.com/15/194815-050-08B5E7D1/Nativity-facade-Sagrada-Familia-cathedral-Barcelona-Spain.jpg",
    description: "One of the very famous monument in Spain!",
    address: "Barcelona",
    location: {
      lng: 101457896,
      lat: 245789632,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlacesList items={loadedPlaces} />;
};

export default UserPlaces;
