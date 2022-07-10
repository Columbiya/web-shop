import React, { useState, useEffect, useContext } from 'react'
import { Button, Container } from 'react-bootstrap';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import { fetchBrands, fetchTypes } from '../http/deviceAPI';
import CreateBrand from './../components/modals/CreateBrand';
import { Context } from './../index';

const Admin = (props) => {
    const [typeShown, setTypeShown] = useState(false)
    const [brandShown, setBrandShown] = useState(false)
    const [deviceShown, setDeviceShown] = useState(false)
    const { device } = useContext(Context)

    return (
        <Container className='d-flex flex-column'>
            <Button className='mt-4 p-3' onClick={() => setTypeShown(true)}>
                Добавить новый Type
            </Button>
            <Button className='mt-4 p-3' onClick={() => setBrandShown(true)}>
                Добавить новый Brand
            </Button>
            <Button className='mt-4 p-3' onClick={() => setDeviceShown(true)}>
                Добавить новый device
            </Button>

            <CreateBrand show={brandShown} onHide={() => setBrandShown(false)} />
            <CreateType show={typeShown} onHide={() => setTypeShown(false)} />
            <CreateDevice show={deviceShown} onHide={() => setDeviceShown(false)} />
        </Container>
    )
}

export default Admin