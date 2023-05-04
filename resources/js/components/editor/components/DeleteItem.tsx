import * as React from "react";
import styled from "styled-components";


type Props = React.HTMLAttributes<HTMLDivElement> & {
    deleteItem: () => void
}

const DeleteItem: React.FC<Props> = ({ className, deleteItem }: Props) => {

    const buttonClick = (event) => {
        event.preventDefault();
        deleteItem();
    }

    return (
        <div className={className}>
            <CrossButton onClick={buttonClick} />
        </div>
    )
}


const CrossButton = styled.button`
    background-color: var(--bs-danger);
    border-color: var(--bs-danger);
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
    box-shadow: none;
    outline: none;

    position: absolute;
    right: 10px;


    &:after {
        content: 'X';
    }
`;

export default DeleteItem;