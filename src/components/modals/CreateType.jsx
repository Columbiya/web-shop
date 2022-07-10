import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { createType } from './../../http/deviceAPI';
import { Context } from './../../index';

const CreateType = ({ show, onHide })  => {
    const { device } = useContext(Context)
    const [value, setValue] = useState('')

    const addType = async () => {
        const type = await createType(value)
        device.setTypes([...device.types, type])
        alert(`${type.name} успешно добавлен`)
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
                    Добавить новый Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder='введите название типа' value={value} onChange={(e) => setValue(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={addType}>Добавить</Button>
                <Button variant='danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType