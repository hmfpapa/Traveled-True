import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { getCrime } from "../../modules/crimeManager";
import { me } from "../../modules/authManager";

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
    <div className="m-4">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
        <Card>
  <CardBody>
    <div className="row">
      <div className="col-md-8 d-flex p-5">
        <div className="row justify-content-start">
          <strong>Victim: {crime.victim}</strong>
          <p>{crime.type}</p>
          <p>{crime.date}</p>
          <p>{crime.location}</p>
        </div>
      </div>
      <div className="col-md-4">
        <CardImg src={crime.imageUrl} alt={crime.victim} className="align-self-center" />
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-8">
        <p>{crime.details}</p>
        {crime.solved? (<><p> Solved </p> <p>Perpetrator: {crime.perpetrator}</p></>) : (<p>Currently unsolved</p>)}
        {crime.getInvolved? (<><strong>Get Involved </strong><p>{crime.getInvolved}</p></>) : (<></>)}
      </div>
    </div>
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
         <div>{user?.admin? (<Link to={`addMedia`}>Add Media</Link>): (<></>)}</div>
        </div>
      </div>
    </div>
  );
};

export default CrimeDetails;