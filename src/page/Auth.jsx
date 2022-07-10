import React, { useState, useContext } from 'react'
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { REGISTER_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from './../utils/consts';
import { login, register } from './../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from './../index';

const Auth = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { user: userStore } = useContext(Context)
    const isLogin = location.pathname === LOGIN_ROUTE

    //console.log(location); //объект у которого есть поле pathname

    const click = async () => {
        try {
            let user
            if (isLogin) {
                user = await login(email, password)
            }
            else {
                user = await register(email, password) 
            }
    
            userStore.setUser(user)
            userStore.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch(e) {
            alert(e.response.data)
        }
    }

    return (
        <Container style={{height: window.innerHeight - 54}} className='d-flex align-items-center'>
            <Card style={{width: 600}} className='p-5 m-auto'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация': 'Регистрация'}</h2>
                <Form>
                    <Form.Control 
                        className='mt-3'
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control 
                        className='mt-3'
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                    />
                </Form>
                <Row className='d-flex align-items-center justify-content-between mt-3'>
                    <Col xs={7}>
                        {isLogin ?
                            <span>Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся!</NavLink></span>:
                            <span>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></span>
                        }
                    </Col>
                    <Col className="d-flex justify-content-end">
                        {isLogin ?
                            <Button onClick={click}>Войти</Button>:
                            <Button onClick={click}>Зарегистрироваться</Button>
                        }

                    </Col>
                </Row>

            </Card>
        </Container>
    )
}

export default observer(Auth)