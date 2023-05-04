import * as React from "react";
import styled from "styled-components";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    insertItem: (array) => void
}

const AddItem: React.FC<Props> = ({ className, insertItem }: Props) => {

    const [isShown, setIsShown] = React.useState(false);

    const plusButtonClick = (event) => {
        event.preventDefault();
        setIsShown(!isShown)
    }

    const createVote = (event) => {
        event.preventDefault();
        const vote = {
            "type": "vote",
            "resolution": "",
            "votes_for": 0,
            "votes_against": 0
        }
        insertItem(vote);
        setIsShown(false);
    }

    const createText = (event) => {
        event.preventDefault();
        const text = {
            "type": "text",
            "value": ""
        }

        insertItem(text);
        setIsShown(false);
    }

    return (
        <div className={className}>
            <div style={{position: "relative"}}>
                <RightButton style={{opacity: isShown? "100%" : "0"}} onClick={createText}>Text</RightButton>
                <PlusButton onClick={plusButtonClick} />
                <LeftButton style={{opacity: isShown? "100%" : "0"}} onClick={createVote}>Vote</LeftButton>
            </div>
        </div>
        
    )
}

const PlusButton = styled.button`
    background-color: var(--bs-gray-500);
    border-color: var(--bs-gray-500);
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
    box-shadow: none;
    outline: none;


    &:after {
        content: '+';
    }
`;


const ArrowButton = styled.button `
    background-color: var(--bs-gray-500);;
    color: #fff;
    height: 30px;
    position: relative;
    border: none;
    width: 60px;
    margin-top: 5px;
    float: left;

    &:before {
        content: "";
        position: absolute;
        width: 0; 
        height: 0; 
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        top: 0;
    }
`;

const LeftButton = styled(ArrowButton)`
    border-radius: 0 5px 5px 0;
    margin-left: 25px;

    &:before {
        border-right:15px solid var(--bs-gray-500);; 
        left: -15px;
    }
`

const RightButton = styled(ArrowButton)`
    border-radius: 5px 0 0 5px;
    margin-right: 25px;

    &:before {
        border-left:15px solid var(--bs-gray-500);; 
        right: -14.5px;
    }
`


export default AddItem;