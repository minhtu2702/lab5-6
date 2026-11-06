import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        axios.get('http://localhost:9000/accounts')
            .then(res => {
                const accounts = res.data;
                const user = accounts.find(acc => acc.email === email && acc.password === password);

                if (!user) {
                    setError('Sai tài khoản hoặc mật khẩu!');
                    return;
                }

                if (user.status.toLowerCase() !== 'active') {
                    setError('Tài khoản đang bị khóa');
                    return;
                }

                alert(`Đăng nhập thành công với vai trò: ${user.role}`);
                navigate('/subject', { state: { user } });
            });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
            <Card style={{ width: '400px'}} >
                <Card.Body>
                    <h3 className="text-center mb-3">Login</h3>

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-2">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email of student or lecture"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password of student or lecture"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>  

                        {error && <Alert variant="danger">{error}</Alert>}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;