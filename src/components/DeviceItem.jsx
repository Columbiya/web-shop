import React, { useEffect } from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import star from '../assets/star.svg'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from './../utils/consts';
import { fetchOneDevice } from '../http/deviceAPI';
 
const DeviceItem = ({ item }) => {
    const navigate = useNavigate()

    return (
        <Col md={3} className="mt-3">
            <Card style={{width: 150, cursor: 'pointer'}} border='light' onClick={() => navigate(`${DEVICE_ROUTE}/${item.id}`)}>
                <Image width={150} height={150} src={`${process.env.REACT_APP_API_URL}/${item.img}`} />
                <Row>
                    <Col md={8} className="text-black-50">Samsung....</Col>
                    <Col className="d-flex align-items-center">
                        {item.rating}
                        <Image src={star} width={20} height={20} />
                    </Col>
                </Row>
                <div>
                    {item.name}
                </div>
            </Card>
        </Col>
    )
}

export default DeviceItem