import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext);

    //Router
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);
    const { username, password } = loginForm;

    const login = async (event) => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                navigate('/dashboard');
            } else {
                setAlert({ type: 'danger', message: loginData.message });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
        setTimeout(() => setAlert(null), 5000);
    };

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;
