import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button, Dropdown, Row, Col, Spinner } from 'react-bootstrap'
import { Context } from './../../index';
import { observer } from 'mobx-react-lite';
import { fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { createDevice } from './../../http/deviceAPI';

const CreateDevice = ({ show, onHide })  => {
    const { device } = useContext(Context)
    const [info, setInfo] = useState([])
    const [deviceName, setDeviceName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const types = device.types
    const brands = device.brands

    useEffect(() => {
        async function getData() {
            await fetchTypes().then(data => device.setTypes(data))
            await fetchBrands().then(data => device.setBrands(data))
        }

        getData()
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const addDevice = async () => {
        const formData = new FormData()
        formData.append('name', deviceName)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))

        await createDevice(formData)

        onHide()
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value}: i))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый Device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type => (
                                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>{type.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите брэнд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map(brand => (
                                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control className="mt-3" placeholder='Введите название устройства' value={deviceName} onChange={e => setDeviceName(e.target.value)} />
                    <Form.Control className="mt-3" type='number' placeholder='Введите цену устройства' value={price} onChange={e => setPrice(+e.target.value)} />
                    <Form.Control className="mt-3" type='file' onChange={selectFile} />

                    <Button onClick={addInfo} className='mt-3'>Добавить новое свойство</Button>

                    {
                        info.map(i => (
                            <Row key={i.number} className='mt-3'>
                                <Col md={4}>
                                    <Form.Control placeholder='Введите название характеристики' value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number)} />
                                </Col>

                                <Col md={4}>
                                    <Form.Control placeholder='Введите описание характеристики' value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} />
                                </Col>

                                <Col md={4}>
                                    <Button variant='danger' onClick={() => setInfo(info.filter(item => item !== i))}>Удалить</Button>
                                </Col>
                            </Row>
                        ))
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={addDevice}>Добавить</Button>
                <Button variant='danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default observer(CreateDevice)