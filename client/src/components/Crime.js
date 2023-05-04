import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export default function Crime({ crime }) {
  return (
    <Card className="m-4">
      <CardBody>
        <strong>Victim: {crime.victim}</strong>
        <p>{crime.type}</p>
        <p>{crime.date}</p>
        <p>{crime.location}</p>
        <Link to={`crime/${crime.id}`}>Details</Link>
      </CardBody>
    </Card>
  );
}
