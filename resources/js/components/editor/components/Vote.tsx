import * as React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import useAutosizeTextArea from "../../../utilities/useAutosizeTextArea";
import { Row, Col } from "react-bootstrap";
import DeleteItem from "./DeleteItem";
import styled from "styled-components";

type Props = {
    item: Array<object>,
    onChange: (array) => void
}

const Vote: React.FC<Props> = ({ item, onChange }: Props) => {
    
    const resolutionRef = React.useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(resolutionRef.current, item['value']);
  
    const handleChange = (event) => {
        let data = {...item};
        data[event.target.name] = event.target.value;
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
                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label htmlFor="resolution">Resolution</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                id="resolution"
                                name="resolution" 
                                value={item['resolution']} 
                                onChange={handleChange} 
                                ref={resolutionRef} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="votes_for">Votes For</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Votes For" 
                                id="votes_for"
                                name="votes_for" 
                                value={item['votes_for']} 
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                                <Form.Label htmlFor="votes_against">Votes Against</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Votes Against" 
                                    id="votes_against"
                                    name="votes_against" 
                                    value={item['votes_against']} 
                                    onChange={handleChange} />
                            </Form.Group>                 
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )

}


export default Vote;