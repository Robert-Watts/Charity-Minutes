import * as React from "react";
import { Col, Row } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';


type Props = {
}

const Loading: React.FC<Props> = ({  }: Props) => {
    return (
        <Row className="mt-5">
            <Col className="text-center">
                <Spinner />
            </Col>
        </Row>
    )
}

export default Loading;