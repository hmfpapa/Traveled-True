import React from "react";
import { Card, CardBody } from "reactstrap";
import Crime from "../Crimes/Crime";

export default function Itinerary({ itinerary }) {
  return (
    <Card className="m-4">
      <CardBody>
        <strong>Destination: {itinerary?.location.name}</strong>
        {itinerary.crimes.map((c) => (
        <Crime key={c.id} crime={c} />
      ))}
      </CardBody>
    </Card>
  );
}
