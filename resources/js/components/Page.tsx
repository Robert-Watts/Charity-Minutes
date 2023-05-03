import * as React from "react";
import PageTitle from "./PageTitle";
import Navigation from "./Navigation";
import Container from 'react-bootstrap/Container';


type Props = {
    title: any;
    children?: any;
    hide_nav?: boolean;
}

const Page: React.FC<Props> = ({ title, children, hide_nav}: Props) => {
    return (
        <>
            <PageTitle title={title} />
            <Navigation hide_buttons={hide_nav} />
            <Container className="mt-3">
                <h1>{ title }</h1>

                { children }
            </Container>
        </>
    )
}

export default Page;
