import React, { useEffect, useState } from "react";
import Crime from "./Crime";
import { getAllCrimes, getCrimesByType } from "../../modules/crimeManager";
import { getAllTypes } from "../../modules/typeManager";
import { Form } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";

export default function CrimeList() {
  const [crimes, setCrimes] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState(0);

  useEffect(() => {
    getAllCrimes().then(setCrimes);
    getAllTypes().then(setTypes);
  }, []);

  useEffect(() => {
    if (typeId != 0){
      getCrimesByType(typeId);
    }
  }, [typeId]);

  return (

    <section>
      <h1>Crimes You Should Know About</h1>
      Select a type:<Form onSubmit={handleSave}>
        <FormGroup>
          <Label for="typeId">Type</Label>

          <Input type="select" id="crimeTypeId" onChange={(e) => setTypeId(parseInt(e.target.value))}>
            <option value="">Select Type</option>
            {types.map((t) => {
              return <option key={t.id} value={t.id}>{t.name}</option>
            })}
          </Input>
        </FormGroup>
      </Form>
      {crimes.map((c) => (
        <><Crime key={c.id} crime={c} />
        </>
      ))}
    </section>
  );
}
