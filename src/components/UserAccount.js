
import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { MyContext } from './MyContext';
import { auth, db } from '../firebase-confic';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import CardComponent from './cardComponent';
import ShoppingCard from './shoppingCard';



const UserAccount = () => {

    const { myData, setMyData,
        users, setUsers,
        liked, setLiked,
        addToLiked,
        isAuthenticated,
        currentUser, setCurrentUser,
        addToCard,
        removeFromShoppingList,
        total,
        addToCardButtonColor, setAddToCardButtonColor,
        shoppingListLocal, setShoppingListLocal,
    } = useContext(MyContext)

    const [showModal, setShowModal] = useState(false);
    const [bankState, setbankState] = useState("")

    const ShowModalContent = () => {
        setShowModal(true);
    };

    const CloseModal = () => {
        setShowModal(false);
    };

    console.log("user", currentUser)
    console.log("user", total)

    return (
        <div className="col-md-1 mb-1">

            <div className="row">
                <div><button
                    className="btn btn-outline-dark text-uppercase btn-sm"
                    style={{ fontSize: '0.60rem', padding: '0.25rem 0.5rem', height: "30px", width: "150px", alignContent: "center" }}
                    onClick={ShowModalContent}
                >
                    Maksma {total}$
                </button></div>

                {currentUser && currentUser.shoppingList && currentUser.shoppingList.map((item, itemIndex) => (
                    <div key={itemIndex} className="col-12 d-flex justify-content-center mb-4">
                        <ShoppingCard
                            img={item.img}
                            name={item.name}
                            inStorage={item.inStorage}
                            id={item.id}
                            addToLiked={addToLiked}
                            item={item}
                            isLiked={item.isLiked}
                            price={item.price}
                            addToCard={addToCard}
                            removeFromShoppingList={removeFromShoppingList}
                            itemTotal={item.itemTotal}

                        />
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Esita tellimus</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {currentUser && currentUser.shoppingList.map((item) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    style={{
                                        width: '150px',
                                        height: 'auto',
                                        marginRight: '10px'
                                    }}
                                />
                                <div>
                                    <p style={{ marginBottom: '5px' }}>{item.name}</p>
                                    <p>$ {item.price}</p>
                                </div>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                            <img
                                src="images/swedbank.jpg"
                                alt="swedbank"
                                style={{
                                    flex: 1,
                                    maxWidth: '15%',
                                    height: '35px',
                                    backgroundColor: 'transparent',
                                    borderRight: '2px solid grey'
                                }}
                            />
                            <img
                                src="images/seb.jpg"
                                alt="seb"
                                style={{
                                    flex: 1,
                                    maxWidth: '15%',
                                    height: '35px',
                                    backgroundColor: 'transparent',
                                    borderRight: '2px solid grey'
                                }}
                            />
                            <img
                                src="images/paypal.jpg"
                                alt="paypal"
                                style={{
                                    flex: 1,
                                    maxWidth: '15%',
                                    height: '35px',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>


                    </>

                </Modal.Body>
                <Modal.Footer>
                    <>
                        <Button variant="secondary" onClick={CloseModal}>
                            Close
                        </Button>
                        <Button
                            className={`btn btn-outline-dark text-uppercase ${addToCardButtonColor ? 'btn-black' : 'btn-white'}`}
                            style={{ borderRadius: '10px', backgroundColor: addToCardButtonColor ? 'black' : 'white', color: addToCardButtonColor ? 'white' : 'black' }}
                            onClick={() => ShowModalContent(addToCardButtonColor, setAddToCardButtonColor)}>MAKSMA</Button>
                    </>

                </Modal.Footer>
            </Modal>

        </div >

    )
}

export default UserAccount
