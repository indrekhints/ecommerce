const addToCard = async (id, item, addToCardButtonColor, setAddToCardButtonColor) => {
    const newItem = { ...item, itemTotal: 0, quantity: 0, customerID: id };


    if (isAuthenticated && currentUser) {
        let updatedShoppingList
        if (!currentUser.shoppingList.some(shoppingItem => shoppingItem.id === id)) {
            updatedShoppingList = [...currentUser.shoppingList, newItem];

        } else {
            /* kui on olemas siis eemaldame  */
            updatedShoppingList = currentUser.shoppingList.filter(likedItem => likedItem.id !== id);
        }
        // Update currentUser state
        const updatedUser = { ...currentUser, shoppingList: updatedShoppingList };
        setCurrentUser(updatedUser);
        /*  setTellimusedAdmin(updatedShoppingList) */

        // Update Firestore****** SEE KOHT SIIN
        try {
            await setDoc(doc(db, 'customersFirebase', currentUser.id), updatedUser);
        } catch (error) {
            console.error("Error updating likes in Firestore:", error);
        }
        //siis kui pole sisse logitud
    } else {
        if (!shoppingListLocal.some(shoppingItem => shoppingItem.id === id)) {
            setShoppingListLocal(prev => [...prev, newItem]);
            setTellimusedAdmin(prev => [...prev, newItem])
        } else {
            setShoppingListLocal(shoppingItem => shoppingItem.filter(shopItem => shopItem.id !== id));
            setTellimusedAdmin(shoppingItem => shoppingItem.filter(shopItem => shopItem.id !== id));
        }


    }
    setAddToCardButtonColor(prevButtonColor => !prevButtonColor);
    console.log("test", tellimusedAdmin)

};
const addToCard = async (id, item, addToCardButtonColor, setAddToCardButtonColor) => {
    const newItem = {
        ...item,
        itemTotal: 0,
        quantity: 0,
        customerID: currentUser ? currentUser.email : "guest",
        orderId: uuidv4()
    };


    if (isAuthenticated && currentUser) {
        let updatedShoppingList
        if (!currentUser.shoppingList.some(shoppingItem => shoppingItem.id === id)) {
            updatedShoppingList = [...currentUser.shoppingList, newItem];

        } else {
            /* kui on olemas siis eemaldame  */
            updatedShoppingList = currentUser.shoppingList.filter(likedItem => likedItem.id !== id);
        }
        // Update currentUser state
        const updatedUser = { ...currentUser, shoppingList: updatedShoppingList };
        setCurrentUser(updatedUser);
        setTellimusedAdmin(updatedShoppingList)

        // Update Firestore****** SEE KOHT SIIN
        try {
            await setDoc(doc(db, 'customersFirebase', currentUser.id), updatedUser);
        } catch (error) {
            console.error("Error updating likes in Firestore:", error);
        }
        //siis kui pole sisse logitud
    } else {
        if (!shoppingListLocal.some(shoppingItem => shoppingItem.id === id)) {
            setShoppingListLocal(prev => [...prev, newItem]);
            setTellimusedAdmin(prev => [...prev, newItem])
        } else {
            setShoppingListLocal(shoppingItem => shoppingItem.filter(shopItem => shopItem.id !== id));
            setTellimusedAdmin(shoppingItem => shoppingItem.filter(shopItem => shopItem.id !== id));
        }


    }
    setAddToCardButtonColor(prevButtonColor => !prevButtonColor);
    console.log("test", tellimusedAdmin)

};

*************************************************************************************************************************************

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
                // Signup user
                userCredential = await createUserWithEmailAndPassword(auth, email, password);

                const user = userCredential.user;
                const newUserObject = user.email === "admin@mail.ee" ? {
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

                if (user.email === "admin@mail.ee") {
                    setTellimusedAdmin(newUserObject.tellimusedAdmin);
                }

                await setDoc(doc(db, "customersFirebase", user.uid), newUserObject);

                setCustomerObject(newUserObject);
                setCustomerArray(prevArray => [...prevArray, newUserObject]);
                setIsAuthenticated(true);
                console.log('User UID:', user.uid);
                console.log('User Email:', user.email);
                console.log('User Info:', user);
            }

            const user = userCredential.user;
            navigate(user.email === "admin@mail.ee" ? '/Admin' : '/');
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



/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx jäin siin pooleli XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

/* saving shanges to firestore */

await setDoc(doc(db, "customersFirebase", user.uid), newUserObject);

/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */

// Updatin  customerObjet i
setCustomerObject(newUserObject);
/* lisan uue objekti customerArray */
// Add the new user object to the customerArray
setCustomerArray(prevArray => [...prevArray, newUserObject]);
setTellimusedAdmin(user.tellimusedAdmin);

setIsAuthenticated(true); // Set to true if login/signup is successful
console.log('User UID:', user.uid);
console.log('User Email:', user.email);
console.log('User Info:', user); // This will log the full user object



        }

const user = userCredential.user;
navigate(user.email === "admin@mail.ee" ? '/Admin' : '/');


    } catch (error) {
    console.error(isLogin ? "Login failed:" : "Signup failed:", error);
}

};

/* CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC */
import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from './MyContext';
import { db } from '../firebase-confic';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';


const ShoppingCard = ({ img, name, inStorage, id, price, item, removeFromShoppingList, itemTotal }) => {

    const [quantity, setQuantity] = useState(0);
    const [totalOfItem, setTotalOfItem] = useState(price)

    const {
        myData, setMyData,
        total, setTotal,
        currentUser, setCurrentUser

    } = useContext(MyContext)


    const handleQuantityChange = (e, id) => {
        const value = parseInt(e.target.value, 10);
        const newQuantity = value > 0 ? value : 1;
        const newTotalOfItem = newQuantity * price;

        setTotal(prevTotal => prevTotal - totalOfItem + newTotalOfItem);
        setQuantity(newQuantity);
        setTotalOfItem(newTotalOfItem);

    };
    const handleIncrement = (id) => {
        const newQuantity = quantity + 1;
        const newTotalOfItem = newQuantity * price;

        setQuantity(newQuantity);
        setTotalOfItem(newTotalOfItem);
        setTotal(prevTotal => prevTotal + price); // Update the total in MyContext

        const updatedShoppingList = currentUser.shoppingList.map(item =>
            item.id === id ? { ...item, itemTotal: item.itemTotal + price, quantity: newQuantity } : item

        );

        setCurrentUser(prevUser => ({
            ...prevUser,
            shoppingList: updatedShoppingList
        }))

    };

    console.log("total", total);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleBuyNow = () => {
        // Implement the logic to handle the buy now functionality
        console.log('Buying item:', item, 'Quantity:', quantity);
    };


    return (
        <div className="shopping-card card d-flex justify-content-center">
            <div className="card" style={{ width: '36rem' }}>
                <img
                    src={img}
                    className="card-img-top rounded"
                    alt={name}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">${price}</p>
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor={`quantity-${id}`} className="me-2">Quantity:</label>
                        <div className="btn-group" role="group" aria-label="Quantity">
                            <button
                                style={{ fontSize: '0.60rem', padding: '0.25rem 0.5rem' }}
                                type="button"
                                className="btn btn-outline-dark btn- sm"
                                onClick={handleDecrement}
                            >
                                -
                            </button>
                            <span className="btn btn-light ">{quantity}</span>
                            <button
                                style={{ fontSize: '0.60rem', padding: '0.25rem 0.5rem' }}
                                type="button"
                                className="btn btn-outline-dark btn- sm"
                                onClick={() => handleIncrement(id)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        className="btn btn-outline-dark text-uppercase btn-sm"
                        style={{ fontSize: '0.60rem', padding: '0.25rem 0.5rem', marginRight: '0.5rem' }}
                        onClick={handleBuyNow}
                    >
                        Go to Buy
                    </button>
                    <button
                        className="btn btn-outline-dark text-uppercase btn-sm"
                        style={{ fontSize: '0.60rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => removeFromShoppingList(id, item)}
                    >
                        Remove
                    </button>
                    <div style={{ fontSize: "0.7em" }}>Total of this item : ${totalOfItem}</div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCard;
