import React, { useContext, useState } from 'react'
import { MyContext } from './MyContext';
import { useEffect } from 'react';
import { db } from '../firebase-confic';
import { collection, getDocs } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';



const CardComponent = ({ img, name, inStorage, id, addToLiked, item, isLiked, price, addToCard, description }) => {

    const { myData, setMyData,
        users, setUsers,
        filteredData, setFilteredData,
        userLikes, setUserLikes,
        isAuthenticated, setIsAuthenticated,
        liked, setLiked,
        currentUser,
        shoppingListLocal, setShoppingListLocal,

    } = useContext(MyContext)

    const [likeButtonColor, setLikeButtonColor] = useState(false)
    const [addToCardButtonColor, setAddToCardButtonColor] = useState(false)
    const [showModal, setShowModal] = useState(false);

    /*  const [likeButtonColor, setLikeButtonColor] = useState(() =>
         currentUser && currentUser.likes.some(likedItem => likedItem.id === id)
     );
     const [addToCardButtonColor, setAddToCardButtonColor] = useState(() =>
         currentUser && currentUser.shoppingList.some(shoppingItem => shoppingItem.id === id)
     ); */
    /*  ********************************** buttonite värvid vastavalt kas on sisselogitud  või mitte,
        kui logitakse välja , süsteem refreshib buttonite värvid mida seadis kasutaja******************************** */
    useEffect(() => {
        if (currentUser && isAuthenticated && currentUser.likes) {
            setLikeButtonColor(currentUser.likes.some(likedItem => likedItem.id === id));
            setAddToCardButtonColor(currentUser.shoppingList.some(shoppingItem => shoppingItem.id === id));
        } else {
            setLikeButtonColor(false);
            setAddToCardButtonColor(false);
        }
    }, [isAuthenticated]);
    const handleImageClick = () => {
        setShowModal(true);
    };

    const CloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
                <img
                    src={img}
                    className="card-img-top rounded"
                    alt={name}
                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={handleImageClick}
                />
                <div className="card-body" style={{ backgroundColor: "#F8F8F8" }} >
                    <h5 className="card-title" style={{ fontSize: "0.8em" }}>{name}</h5>
                    <p className="card-text" style={{ fontSize: "0.9em" }}>${price}</p>
                    <p className="card-text" style={{ fontSize: "0.7em" }}><h7>description:{description}
                    </h7></p>
                    <div className="d-flex justify-content-between align-items-center" style={{ backgroundColor: "#F8F8F8" }}>
                        {/* Like button */}
                        <button
                            className={`btn btn-outline-dark text-uppercase ${likeButtonColor ? 'btn-black' : 'btn-white'}`}
                            style={{ borderRadius: '10px', backgroundColor: likeButtonColor ? 'black' : 'white', color: likeButtonColor ? 'white' : 'black' }}
                            onClick={() => addToLiked(id, item, likeButtonColor, setLikeButtonColor)}
                        >  {/*  renderdan contitionally kui liked props on true */}
                            {likeButtonColor ? 'You Like It' : 'Like'}
                        </button>
                        <button
                            className={`btn btn-outline-dark text-uppercase ${addToCardButtonColor ? 'btn-black' : 'btn-white'}`}
                            style={{ borderRadius: '10px', backgroundColor: addToCardButtonColor ? 'black' : 'white', color: addToCardButtonColor ? 'white' : 'black' }}
                            onClick={() => addToCard(id, item, addToCardButtonColor, setAddToCardButtonColor)}>{addToCardButtonColor ? 'In You List' : 'Add to Cart'}</button>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <img src={img} alt={name} style={{ width: '50%' }} />
                        <p>${price}</p>
                        <p>{description}</p>
                    </>

                </Modal.Body>
                <Modal.Footer>
                    <><Button variant="secondary" onClick={CloseModal}>
                        Close
                    </Button>
                        <Button
                            className={`btn btn-outline-dark text-uppercase ${addToCardButtonColor ? 'btn-black' : 'btn-white'}`}
                            style={{ borderRadius: '10px', backgroundColor: addToCardButtonColor ? 'black' : 'white', color: addToCardButtonColor ? 'white' : 'black' }}
                            onClick={() => addToCard(id, item, addToCardButtonColor, setAddToCardButtonColor)}>{addToCardButtonColor ? 'In You List' : 'Add to Card'}</Button>
                    </>

                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CardComponent;


