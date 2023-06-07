import React, { useEffect, useState } from "react";
import Crime from "./Crime";
import { getAllCrimes } from "../../modules/crimeManager";

export default function CrimeList() {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    getAllCrimes().then(setCrimes);
  }, []);

  return (
    
    <section>
      <h1>Crimes You Should Know About</h1>
      {crimes.map((c) => (
        <><Crime key={c.id} crime={c} />
        </>
      ))}
    </section>
  );
}
