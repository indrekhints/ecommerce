import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from './MyContext';
import { db } from '../firebase-confic';
import { doc, setDoc } from 'firebase/firestore';

const ShoppingCard = ({ img, name, inStorage, id, price, item, removeFromShoppingList, itemTotal }) => {
    const [quantity, setQuantity] = useState(0);
    const [totalOfItem, setTotalOfItem] = useState(price);

    const {
        myData, setMyData,
        total, setTotal,
        currentUser, setCurrentUser,
        tellimusedAdmin, setTellimusedAdmin,
        shoppingList
    } = useContext(MyContext);

    const handleIncrement = (id) => {
        const newQuantity = quantity + 1;
        const newTotalOfItem = newQuantity * price;

        setQuantity(newQuantity);
        setTotalOfItem(newTotalOfItem);
        setTotal(prevTotal => prevTotal + price);

        const updatedShoppingList = currentUser.shoppingList.map(item =>
            item.id === id ? { ...item, itemTotal: item.itemTotal + price, quantity: newQuantity } : item
        );

        setCurrentUser(prevUser => ({
            ...prevUser,
            shoppingList: updatedShoppingList
        }));

        const updatedAdminList = tellimusedAdmin.map(adminItem =>
            adminItem.id === id ? { ...adminItem, itemTotal: newTotalOfItem, quantity: newQuantity } : adminItem
        );
        setTellimusedAdmin(updatedAdminList);
    };

    const handleDecrement = () => {

        const newQuantity = quantity - 1;
        const newTotalOfItem = newQuantity * price;

        setQuantity(newQuantity);
        setTotalOfItem(newTotalOfItem);
        setTotal(prevTotal => prevTotal - price);

        const updatedShoppingList = currentUser.shoppingList.map(item =>
            item.id === id ? { ...item, itemTotal: item.itemTotal - price, quantity: newQuantity } : item
        );

        setCurrentUser(prevUser => ({
            ...prevUser,
            shoppingList: updatedShoppingList
        }));
        const updatedAdminList = tellimusedAdmin.map(adminItem =>
            adminItem.id === id ? { ...adminItem, itemTotal: newTotalOfItem, quantity: newQuantity } : adminItem
        );
        setTellimusedAdmin(updatedAdminList);


    };

    const handleBuyNow = () => {
        console.log('Buying item:', item, 'Quantity:', quantity);
    };
    /*  useEffect(() => {            //ilmselt ei vaja seda siin aga jätan alles!!!
         if (currentUser && tellimusedAdmin) {
             const updateFirestore = async () => {
                 try {
                     await setDoc(doc(db, 'itemList', 'itemList'), { adminItems: tellimusedAdmin }, { merge: true });
                     console.log("Updated admin items in Firestore:", tellimusedAdmin);
                 } catch (error) {
                     console.error("Error updating admin items in Firestore:", error);
                 }
             };
             updateFirestore();
         }
     }, [tellimusedAdmin, currentUser]); */

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
                                className="btn btn-outline-dark btn-sm"
                                onClick={handleDecrement}
                            >
                                -
                            </button>
                            <span className="btn btn-light">{quantity}</span>
                            <button
                                style={{ fontSize: '0.60rem', padding: '0.25rem 0.5rem' }}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
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
                    <div style={{ fontSize: "0.7em" }}>Total of this item: ${totalOfItem}</div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCard;
