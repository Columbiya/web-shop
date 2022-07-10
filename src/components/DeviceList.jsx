import React, { useContext } from 'react'
import { Context } from './../index';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import DeviceItem from './DeviceItem';

const DeviceList = (props) => {
    const { device } = useContext(Context)
    const devices = device.devices

    return (
        <Row>
            {devices.map(device => (
                <DeviceItem key={device.id} item={device} />
            ))}
        </Row>
    )
}

export default observer(DeviceList)