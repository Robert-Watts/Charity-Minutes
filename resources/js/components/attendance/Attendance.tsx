import * as React from "react";
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';


type Props = {
    attendance: any,
    setAttendace: (array) => void,
    trustees: any
}

const Attendance: React.FC<Props> = ({ attendance, trustees, setAttendace }: Props) => {

    const attendanceChanged = (event) => {
        let data = [...attendance];

        const trustee_id = parseInt(event.target.name)
        
        // Remove the item
        const index = data.indexOf(trustee_id);
        if (index > -1) {
            data.splice(index, 1);
        }

        // Add the item back in if it is checked
        if (event.target.checked) {
            data.push(trustee_id)
        }
        
        setAttendace(data);
    }

    return (
        <Form>
            <Row>
                {trustees.map((trustee, index) => {

                    return (
                        <Col key={index} id={index} xs={12} sm={6} md={4} lg={3}>
                            <Form.Group>
                                <Form.Check 
                                label={trustee.member_name}
                                name={trustee.trustee_id}
                                type="checkbox"
                                id={`trustee_${trustee.trustee_id}`} 
                                checked={attendance.includes(trustee.trustee_id)}
                                onChange={attendanceChanged}
                                />
                            </Form.Group>
                        </Col>
                    )
                    })}
            </Row>

        </Form>
    )
}

export default Attendance;