import * as React from "react"
import Page from "../components/Page"
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Charities = () => {
    const [charities, setCharities] = React.useState(null);

    React.useEffect(() => {
        axios.get("charity").then((response) => {
            setCharities(response.data.data);
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
        <Page title={"Charities"} hide_nav={false}>
            { !charities ? <Loading /> :
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Charity Name</th>
                        <th>Objectives</th>
                        <th>Open</th>
                    </tr>
                </thead>

                <tbody>

                {charities.map((charity, i) => {     
                    return (
                        <tr key={charity.id}>
                            <td>{charity.id}</td>
                            <td>{charity.name}</td>
                            <td>{charity.objectives}</td>
                            <td><Link to={`/${charity.id}/`}>Open</Link></td>
                        </tr>
                    )
                })}

                </tbody>
                </Table>
            }
        </Page>
    )
}

export default Charities