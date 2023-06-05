import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap";
import { addCrime } from "../../modules/crimeManager";
import { getAllLocations } from "../../modules/locationManager";
import { useEffect } from "react";
import { getAllTypes } from "../../modules/typeManager";


export default function CrimeAddForm() {
  const navigate = useNavigate();
  const [crimeLocationId, setCrimeLocationId] = useState();
  const [crimeSolved, setCrimeSolved] = useState(false);
  const [crimeVictim, setCrimeVictim] = useState();
  const [crimePerpetrator, setCrimePerpetrator] = useState(null);
  const [crimeGetInvolved, setCrimeGetInvolved] = useState(null);
  const [crimeTypeId, setCrimeTypeId] = useState();
  const [crimeDate, setCrimeDate] = useState();
  const [crimeDetails, setCrimeDetails] = useState();
  const [crimeImageUrl, setCrimeImageUrl] = useState();
  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getAllLocations().then(setLocations);
    getAllTypes().then((data) => {
      setTypes(data);
    });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    addCrime({ LocationId: crimeLocationId, Solved: crimeSolved, Victim: crimeVictim, Perpetrator: crimePerpetrator, GetInvolved: crimeGetInvolved, TypeId: crimeTypeId, Date: crimeDate, Details: crimeDetails, ImageUrl: crimeImageUrl })
      .then(() => navigate("/allCrimes"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <div className="container">
    <Card>
      <CardTitle>Add Crime</CardTitle>
      <CardBody>
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="crimeVictim">Victim Name</Label>
            <Input
              id="crimeVictim"
              type="textarea"
              onChange={(e) => setCrimeVictim(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="crimeDate">Date</Label>
            <Input
              id="crimeDate"
              type="date"
              onChange={(e) => setCrimeDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="crimeLocationId">Location</Label>
            <Input type="select" id="crimeLocationId" onChange={(e) => setCrimeLocationId(parseInt(e.target.value))}>
              <option value="">Select Location</option>
              {locations.map((l) => {
                return <option key={l.id} value={l.id}>{l.name}</option>
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="crimeTypeId">Type</Label>

            <Input type="select" id="crimeTypeId" onChange={(e) => setCrimeTypeId(parseInt(e.target.value))}>
              <option value="">Select Type</option>
              {types.map((t) => {
                return <option key={t.id} value={t.id}>{t.name}</option>
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="crimeDetails">Details</Label>
            <Input
              id="crimeDetails"
              type="textarea"
              onChange={(e) => setCrimeDetails(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="crimeImageUrl">ImageUrl</Label>
            <Input
              id="crimeImageUrl"
              type="textarea"
              onChange={(e) => setCrimeImageUrl(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="crimeGetInvolved">How to Get Involved</Label>
            <Input
              id="crimeGetInvolved"
              type="textarea"
              onChange={(e) => setCrimeGetInvolved(e.target.value)}
            />
          </FormGroup>

          <FormGroup check>
            <Label for="crimeSolved">
              <Input type="checkbox"
                onChange={(e) => setCrimeSolved(true)} />{' '}
              Solved
            </Label>
          </FormGroup>
          {crimeSolved ? (<FormGroup>
            <Label for="crimePerpetrator">Perpetrator</Label>
            <Input
              id="crimePerpetrator"
              type="textarea"
              onChange={(e) => setCrimePerpetrator(e.target.value)}
            />
          </FormGroup>)
            : (<></>)}
          <FormGroup>
            <Button>Save</Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
    </div>
  );
}
