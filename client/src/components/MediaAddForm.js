import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addMedia } from "../modules/mediaManager";
import { useParams } from "react-router-dom";
import { getCrime } from "../modules/crimeManager";
import { useEffect } from "react";

export default function MediaAddForm() {
  const navigate = useNavigate();
  const [mediaDescription, setDescription] = useState();
  const [mediaLink, setLink] = useState();
  const { id } = useParams();
  const [crime, setCrime] = useState();
  

  useEffect(() => {
    getCrime(id).then(setCrime);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    addMedia({ description: mediaDescription, link: mediaLink, crimeId: id })
      .then(() => navigate(`/crime/${id}`))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
        <h2>Add Media related to the {crime.type} of {crime.victim}</h2>
      <FormGroup>
        <Label for="mediaDescription">Description</Label>
        <Input
          id="mediaDescription"
          type="textarea"
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="mediaLink">Link</Label>
        <Input
          id="mediaLink"
          type="textarea"
          onChange={(e) => setLink(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}
