import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigStar from '../assets/big-star.svg'
import { fetchOneDevice } from '../http/deviceAPI';

const DevicePage = (props) => {
    const [device, setDevice] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => {
          setDevice(data)
        })
    }, [id])

    return (
        <Container>
            <Row>
                <Col md={4} className='mt-3'>
                    <Image src={`${process.env.REACT_APP_API_URL}/${device.img}`} width={300} height={300} />
                </Col>

                <Col md={4} className='mt-3'>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>

                        <div className='d-flex justify-content-center align-items-center'
                            style={{ background: `url(${bigStar}) center no-repeat`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}>
                            {device.rating}
                        </div>
                    </Row>
                </Col>

                <Col md={4} className='mt-3'>
                    <Row className='d-flex flex-column align-items-between justify-content-around p-3' style={{backgroundColor: "#ccc", height: '100%'}}>
                        <span style={{fontSize: 48, textAlign: 'center'}}>от {device.price}</span>
                        <Button variant="dark">Добавить в корзину</Button>
                    </Row>
                </Col>
            </Row>
            
            <h2 className='mt-5 mb-3'>Характеристики:</h2>

            <Row>
                {device.info?.map((descr, index) => (
                    <span key={descr.id} 
                          style={{fontSize: 24, backgroundColor: index % 2 === 0 ? 'white': '#ccc'}}
                          className='p-3'>{descr.title}: {descr.description}</span>
                ))}
            </Row>
        </Container>
    )
}

export default DevicePage