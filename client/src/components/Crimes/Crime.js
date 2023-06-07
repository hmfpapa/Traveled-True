import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import "./Crime.css"
import moment from "moment/moment";


export default function Crime({ crime }) {
  let crimeDate = moment(crime.date).format('MMM DD, YYYY')
  return (
    <div className="row justify-content-center  ">
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
            <p>{crimeDate}</p>
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
