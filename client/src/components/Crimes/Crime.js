import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

export default function Crime({ crime }) {
  return (
    <div className="row justify-content-center ">
        <div className="col-sm-10 col-lg-10">
    <Card className="m-4 ">
      <CardBody>
        <div className="row justify-content-center">
          <div className="col-md-2">
            <CardImg src={crime.imageUrl} alt={crime.victim} />
          </div>
          <div className="col-md-4">
            <strong>Victim: {crime.victim}</strong>
            <p>{crime.type}</p>
            <p>{crime.date}</p>
            <p>{crime.location}</p>
            <Link to={`/crime/${crime.id}`}>Details</Link>
          </div>
        </div>
      </CardBody>
    </Card>
    </div>
    </div>
  );
}
