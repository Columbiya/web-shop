import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { Context } from './../index';

const Pages = (props) => {
    const { device } = useContext(Context)
    const pageCount = Math.ceil(device.devicesCount / device.limit)
    const pages = []

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <Pagination>
            {pages.map(page => (
                <Pagination.Item key={page}
                                 active={device.page === page}
                                 onClick={() => device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    )
}

export default observer(Pages)