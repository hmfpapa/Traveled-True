import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { getCrime } from "../modules/crimeManager";
import { me } from "../modules/authManager";

const CrimeDetails = () => {
  const [crime, setCrime] = useState();
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    getCrime(id).then(setCrime);
    me().then(setUser);
  }, []);

  if (!crime) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
        <Card className="m-4">
      <CardBody>
        <strong>Victim: {crime.victim}</strong>
        <p>{crime.type}</p>
        <p>{crime.date}</p>
        <p>{crime.location}</p>
        <p>{crime.details}</p>
        {crime.solved? (<><p> Solved </p> <p>Perpetrator: {crime.perpetrator}</p></>) : (<p>Currently unsolved</p>)}
        <strong>Get Involved </strong><p>{crime.getInvolved}</p>
      </CardBody>
    </Card>
          <ListGroup>
            <strong>Media</strong>
            {crime.medias.map((m) => (
              <ListGroupItem>
                <a href= {m.link}>{m.description}</a>

                </ListGroupItem>
            ))}
          </ListGroup>
         {user?.admin? (<Link to={`/`}>Add Media</Link>): (<></>)}
        </div>
      </div>
    </div>
  );
};

export default CrimeDetails;