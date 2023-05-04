import * as React from "react";
import styled from "styled-components";
import AddItem from "./AddItem";

type Props = {
    insertItem: (array) => void
}

const Seperator: React.FC<Props> = ({ insertItem }: Props) => {
    return (
        <div style={{height: "25px"}}>
            <Hover>
                <Line />  
                <StyledAddItem insertItem={insertItem} />  
            </Hover>
        </div>
    )
}

const Hover = styled.div`
    height: 100%;
    width: 100%;
    position:relative;
    z-index: 1001;

    & * {
        display: none; 
    }
    &:hover * {
        display: block; 
    }
`

const Line = styled.span`
    width: 100%;
    height: 2px;
    background-color: var(--bs-gray-500);;
    position: absolute;
    border-radius: 25px;
    top:11px;
`;

const StyledAddItem = styled(AddItem)`
    position: absolute;
    left: calc(50% - 105px);
    top: -7.5px;
`;


export default Seperator;