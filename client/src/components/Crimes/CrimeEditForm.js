import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FormGroup, Input, Card, CardBody, Form, CardTitle, Button, Label } from "reactstrap"
import { getCrime, updateCrime } from "../../modules/crimeManager";
import { getAllLocations } from "../../modules/locationManager";
import { getAllTypes } from "../../modules/typeManager";

export const CrimeEditForm = () => {
    const [crime, setCrime] = useState();
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCrime(id).then(setCrime);
        getAllLocations().then(setLocations);
        getAllTypes().then(setTypes);
    }, [])

    if (!crime) {
        return null;
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;
        const crimeCopy = { ...crime };

        crimeCopy[key] = value;
        setCrime(crimeCopy);
    };

    const handleSave = (event) => {
        event.preventDefault();

        updateCrime(crime).then(() => {
            navigate(`/crime/${id}`);
        });
    };


    return (
        <div className="container">
            <Card>
                <CardTitle>Edit Crime</CardTitle>
                <CardBody>
                    <Form onSubmit={handleSave}>
                        <FormGroup>
                            <Input id="id" type="hidden" name="id" value={crime.id} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="victim">Victim Name</Label>
                            <Input
                                id="victim" type="text" name="victim" value={crime.victim}
                                onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                id="date" name="date" value={crime.date}
                                type="hidden"
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="locationId">Location</Label>
                            <Input type="select" id="locationId" value={crime.locationId} onChange={handleInputChange}>
                                <option value="">Select Location</option>
                                {locations.map((l) => {
                                    return <option key={l.id} value={l.id}>{l.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="typeId">Type</Label>
                            <Input type="select" id="typeId" value={crime.typeId} onChange={handleInputChange}>
                                <option value="">Select Type</option>
                                {types.map((t) => {
                                    return <option key={t.id} value={t.id}>{t.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="details">Details</Label>
                            <Input
                                id="details" name="details" value={crime.details}
                                type="text"
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="imageUrl">ImageUrl</Label>
                            <Input
                                id="imageUrl" name="imageUrl" value={crime.imageUrl}
                                type="text"
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="getInvolved">How to Get Involved</Label>
                            <Input
                                id="getInvolved" name="getInvolved" value={crime.getInvolved}
                                type="text"
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label for="solved">
                                <Input type="checkbox" id="solved" name="solved" value={crime.solved}
                                    onChange={handleInputChange} />{' '}
                                Solved
                            </Label>
                        </FormGroup>
                        {crime.solved ? (<FormGroup>
                            <Label for="perpetrator">Perpetrator</Label>
                            <Input
                                id="perpetrator" name="perpetrator" value={crime.perpetrator}
                                type="text"
                                onChange={handleInputChange}
                            />
                        </FormGroup>)
                            : (<></>)}
                        <FormGroup>
                            <Button>Save</Button>
                        </FormGroup>
                        <Button className="btn btn-danger" href={`/crime/{id}`}>
                            Cancel
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}