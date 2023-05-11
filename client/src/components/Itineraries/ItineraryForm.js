import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getAllLocations } from "../../modules/locationManager";
import { useEffect } from "react";
import { createItinerary } from "../../modules/itineraryManager";


export default function ItineraryForm({ userProfile }) {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [itineraryLocationId, setItineraryLocationId] = useState();

    useEffect(() => {
        getAllLocations().then(setLocations);
    }, []);

    const selectLocation = (e) => {
        e.preventDefault();
        createItinerary({ LocationId: itineraryLocationId, UserId: userProfile.id })
        .then(() => navigate("/myItineraries"));
    }


    
    return (
        <Form onSubmit={selectLocation}>

            <FormGroup>
                <Label for="itineraryLocationId">Select a destination:</Label>
                <Input type="select" id="itineraryLocationId" onChange={(e) => setItineraryLocationId(parseInt(e.target.value))}>
                <option value="">Select Location</option>
                    {locations.map((l) => {
                        return <option key={l.id} value={l.id}>{l.name}</option>
                    })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Button>Start your journey</Button>
            </FormGroup>
        </Form>
 
    );
}
