import React, { useEffect, useState } from "react";
import Crime from "./Crime";
import { getAllCrimes, getCrimesByType } from "../../modules/crimeManager";
import { getAllTypes } from "../../modules/typeManager";
import { FormGroup, Input } from "reactstrap";

export default function CrimeList() {
  const [crimes, setCrimes] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState(0);

  useEffect(() => {
    getAllCrimes().then(setCrimes);
    getAllTypes().then(setTypes);
  }, []);

  useEffect(() => {
    if (typeId != 0) {
      getCrimesByType(typeId).then(setCrimes);
    }
    else {
      getAllCrimes().then(setCrimes);
    }
  }, [typeId]);

  return (

    <section>
      <h1>Crimes You Should Know About</h1>

      <FormGroup>
        <Input type="select" id="crimeTypeId" onChange={(e) => setTypeId(parseInt(e.target.value))}>
          <option value="">Select a type</option>
          {types.map((t) => {
            return <option key={t.id} value={t.id}>{t.name}</option>
          })}
          <option value= "0">View All</option>
        </Input>
      </FormGroup>
      {crimes.map((c) => (
        <><Crime key={c.id} crime={c} />
        </>
      ))}
    </section>
  );
}
