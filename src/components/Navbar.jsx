import React, { useContext } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { Context } from './../index';
import { observer } from 'mobx-react-lite'
import { ADMIN_ROUTE } from './../utils/consts';

const NavBar = (props) => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Купи девайс</NavLink>
            <Nav className="ml-auto" style={{color: 'white'}}>
                {user.isAuth && <Button onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>}
                {user.isAuth && <Button className="ms-4" onClick={logout}>Выйти</Button>}
                {!user.isAuth && <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>}
            </Nav>
            </Container>
        </Navbar>
    )
}

export default observer(NavBar)