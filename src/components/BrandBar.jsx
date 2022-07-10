import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Card, Row } from 'react-bootstrap';
import { Context } from './../index';

const BrandBar = (props) => {
    const { device } = useContext(Context)
    const brands = device.brands

    return (
        <Row className='d-flex'>
            {brands.map(brand => (
                <Card key={brand.id} 
                      className='p-3 w-auto'
                      onClick={() => device.setSelectedBrand(brand)} 
                      style={{cursor: 'pointer'}}
                      border={brand.id === device.selectedBrand.id ? 'danger': 'light'}>
                    {brand.name}
                </Card>
            ))}
        </Row>
    )
}

export default observer(BrandBar)