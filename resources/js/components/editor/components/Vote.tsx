import * as React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import useAutosizeTextArea from "../../../utilities/useAutosizeTextArea";
import { Row, Col } from "react-bootstrap";
import DeleteItem from "./DeleteItem";
import styled from "styled-components";
import ResolutionResult from "../../ResolutionResult";

type Props = {
    item: Array<object>,
    onChange: (array) => void
    errors: any
}

const Vote: React.FC<Props> = ({ item, onChange, errors }: Props) => {
    const resolutionRef = React.useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(resolutionRef.current, item['value']);
  
    const handleChange = (event) => {
        let data = {...item};
        let value = !isNaN(event.target.value) && !isNaN(parseFloat(event.target.value)) ? 
                       parseInt(event.target.value) : event.target.value
        data[event.target.name] = value;
        onChange(data);
    }

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <h5>Resolution Vote</h5>
                    </Col>
                </Row>

                <Row>
<Col>
                {errors.map((error, i) => {     
                    return (
                        <Alert key={i} variant={"warning"}>
                            {error}
                        </Alert>
                    )
                })}

</Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="resolution">
                            <Form.Label >Resolution</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                name="resolution" 
                                value={item['resolution']} 
                                onChange={handleChange} 
                                ref={resolutionRef} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="votes_for"> 
                            <Form.Label >Votes For</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Votes For" 
                                name="votes_for" 
                                value={item['votes_for']} 
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="votes_against">
                                <Form.Label>Votes Against</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Votes Against" 
                                    name="votes_against" 
                                    value={item['votes_against']} 
                                    onChange={handleChange} />
                            </Form.Group>                 
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <ResolutionResult votes_against={item['votes_against']} votes_for={item['votes_for']} errors={errors.length != 0} />
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    )

}


export default Vote;