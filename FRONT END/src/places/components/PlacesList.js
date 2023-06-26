import React from "react";

// COMPONENTS
import Card from "../../shared/components/UIElements/Card/Card";
import PlaceItem from "./PlaceItem";
// CSS
import "./PlacesList.css";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card className="place-list center">
        <h2>No places found!</h2>
        <button>Create new place</button>
      </Card>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          name={place.title}
          image={place.imageUrl}
          description={place.description}
          address={place.address}
          coordinates={place.location}
          creatorId={place.creator}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
