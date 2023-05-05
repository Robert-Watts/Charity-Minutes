import * as React from "react"
import Page from "../components/Page"
import axios from "axios";
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Loading from "../components/Loading";

const Charity = () => {
    const [charity, setCharity] = React.useState(null);
    const { charity_id } = useParams()

    React.useEffect(() => {
        axios.get(`charity/${charity_id}`).then((response) => {
            setCharity(response.data.data);
        });
      }, []);
      
      const page_title = (
        <>
        <Row className="align-items-end">
            <Col md="8">
                <h1>Charity</h1>
            </Col>
            {charity &&
            <Col md="4">
                <Button variant="primary" onClick={(e) => e.preventDefault()} className="mb-1 float-end">
                    Create Charity
                </Button>
            </Col>
            }
        </Row>
        </>
      )

    return (
        <Page title={"Charity"} page_title={page_title}>
                {!charity ? <Loading /> :
                    <section>

                        <h2>Charity Infomation</h2>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Charity ID</Form.Label>
                                <Form.Control placeholder="Charity Name" disabled value={charity.id}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Charity Name</Form.Label>
                                <Form.Control placeholder="Charity Name" disabled value={charity.name}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Charity Objectives</Form.Label>
                                <Form.Control placeholder="Charity Objectives" disabled type="textarea" value={charity.objectives} />
                            </Form.Group>   
                        </Form>   
                    </section>
                }

        </Page>
    )
}

export default Charity