import React from 'react'
import ShoppingCard from './shoppingCard'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { MyContext } from './MyContext';
import { useState, useContext } from 'react';


const VisitorShoppingCard = () => {
    const {
        myData, setMyData,
        shoppingListLocal, setShoppingListLocal,
        addToLiked,
        addToCard,
        removeFromShoppingList,


    } = useContext(MyContext)
    console.log(shoppingListLocal)
    return (
        <div>
            {shoppingListLocal.length > 0 ? (
                shoppingListLocal.map((item, index) => (
                    <div key={index} className="col-12 d-flex justify-content-center mb-4">
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
                ))
            ) : (
                <div style={{ fontSize: '30px', color: 'lightgrey' }}>No items</div>
            )}
        </div>
    )
}

export default VisitorShoppingCard
