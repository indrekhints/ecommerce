import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { MyContext } from './MyContext';
import { auth, db } from '../firebase-confic';
import { setDoc, doc } from 'firebase/firestore';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { setIsAuthenticated, setCustomerObject, setCustomerArray, setTellimusedAdmin } = useContext(MyContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userCredential;
            if (isLogin) {
                // Login user
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Signup userr
                userCredential = await createUserWithEmailAndPassword(auth, email, password);

                const user = userCredential.user;
                const newUserObject = user.email === "admin@gmail.com" ? {
                    id: user.uid,
                    email: user.email,
                    tellimusedAdmin: []
                } : {
                    id: user.uid,
                    email: user.email,
                    shoppingList: [],
                    likes: [],
                    totalBuyment: 0
                };


                navigate(user.email === "admin@gmail.com" ? '/Admin' : '/');
                await setDoc(doc(db, "customersFirebase", user.uid), newUserObject);

                setCustomerObject(newUserObject);
                setCustomerArray(prevArray => [...prevArray, newUserObject]);
                setIsAuthenticated(true);
                console.log('User UID:', user.uid);
                console.log('User Email:', user.email);
                console.log('User Info:', user);
            }

            const user = userCredential.user;
            navigate(user.email === "admin@gmail.com" ? '/Admin' : '/');
        } catch (error) {
            console.error(isLogin ? "Login failed:" : "Signup failed:", error);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="justify-content-center">
                <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                    <h2 className="mb-4 text-grey small-text">{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-grey small-text">Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="small-text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="text-grey small-text">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            className="small-text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="button-group mt-3">
                        <Button variant="primary" type="submit" className="mr-2 small-text">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                        <Button variant="link" onClick={toggleForm} className="text-grey small-text">
                            {isLogin ? 'Create an account' : 'Already have an account? Login'}
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    );
};

export default LoginPage;
