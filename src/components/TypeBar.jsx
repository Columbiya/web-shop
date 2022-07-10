import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from './../index';
import { ListGroup } from 'react-bootstrap';

const TypeBar = (props) => {
    const { device } = useContext(Context)
    const types = device.types
    
    return (
        <ListGroup>
            {types.map((type) => 
                <ListGroup.Item key={type.id} 
                                active={type.id === device.selectedType.id} 
                                onClick={() => device.setSelectedType(type)}
                                style={{cursor: 'pointer'}}>
                                {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}

export default observer(TypeBar)