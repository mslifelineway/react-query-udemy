import React from "react";

const PersonCard = ({ name, hair_color, eye_color }) => {
  return (
    <div className="personCard">
      <h6>{name}</h6>
      <p>Hair color: {hair_color}</p>
      <p>Eye color: {eye_color}</p>
    </div>
  );
};

export default PersonCard;
