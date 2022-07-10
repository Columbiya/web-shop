import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createBrand } from './../../http/deviceAPI';
import { Context } from './../../index';

const CreateBrand = ({ show, onHide }) => {
    const { device } = useContext(Context)
    const [value, setValue] = useState('')

    const addBrand = async () => {
        const brand = await createBrand(value)
        device.setBrands([...device.brands, brand])
        alert(`brand ${brand.name} успешно добавлен`)
        onHide()
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
                    Добавить новый Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder='введите название типа' value={value} onChange={(e) => setValue(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={addBrand}>Добавить</Button>
                <Button variant='danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand