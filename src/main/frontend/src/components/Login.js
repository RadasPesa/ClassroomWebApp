import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function login(event) {
        event.preventDefault();
        // Tady by bylo volání backendu

        props.setUserToken(username);
    }

    return (
        <div>
            <h2>Please log in</h2>
            <Form onSubmit={login}>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter username'
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>Log in</Button>
            </Form>
        </div>
    )
}

export default Login