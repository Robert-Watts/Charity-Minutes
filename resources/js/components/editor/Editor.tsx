import * as React from "react";
import Vote from "./components/Vote";
import Text from "./components/Text";
import Form from 'react-bootstrap/Form';
import Seperator from "./components/Seperator";
import DeleteItem from "./components/DeleteItem";
import styled from "styled-components";

type Props = {
    minutes: any,
    setMinutes: (array) => void
}

const Editor: React.FC<Props> = ({ minutes, setMinutes }: Props) => {

    const handleFormChange = (item, index) => {
        let data = [...minutes];
        data[index] = item;
        setMinutes(data);
    }

    const insertItem = (item, index) => {
        let data = [...minutes];
        data.splice(index, 0, item);
        setMinutes(data);
    }

    const deleteItem = (index) => {
        let data = [...minutes];
        data.splice(index, 1);
        setMinutes(data);
    }

    return (
        <Form className="mb-3">
            <Seperator insertItem={item => insertItem(item, 0)} />
            {minutes.map((item, index) => {
                let element = <p>This item is not of a known type</p>;
                
                if (item['type'] == "vote"){
                    element = <Vote item={item} onChange={item => handleFormChange(item, index)} />;
                } 
                else if (item['type'] == "text") {
                    element = <Text item={item} onChange={item => handleFormChange(item, index)}/>;
                }

                return (
                    <div key={index}>
                        <ItemContainer>
                            <StyledDeleteItem deleteItem={() => deleteItem(index)} />
                            {element}
                        </ItemContainer>
                        <Seperator insertItem={item => insertItem(item, index + 1)} />
                    </div>
                )
            })}
        </Form>
    )
}

const StyledDeleteItem = styled(DeleteItem)`
    position: absolute;
    top: -20px;
    right:-20px;
    width: 100%;
    z-index:1001
`;

const ItemContainer = styled.div`
    position: relative;

    & ${StyledDeleteItem} {
        display: none;
    }

    &:hover ${StyledDeleteItem}{
        display: block;
    }

`;




export default Editor;