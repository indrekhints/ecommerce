
import React, { useContext, useState } from 'react'
import { MyContext } from './MyContext';
import { useEffect } from 'react';
import { db } from '../firebase-confic';
import { collection, getDocs } from 'firebase/firestore';
import CardComponent from './cardComponent';

const MainContent = () => {
    const { myData, setMyData,
        users, setUsers,
        liked, setLiked,
        addToLiked,
        userLikes, setUserLikes,
        isAuthenticated, setIsAuthenticated,
        addToCard,
        currentUser, setCurrentUser
    } = useContext(MyContext)

    console.log("test", currentUser)

    return (
        /* users tuleb context deleteAllPersistentCacheIndexes, peaks ümber nimetama aga testimiseks käib küll */
        <>
            {

                <div className="row">
                    {users.map((obj, index) => (
                        <div key={index} className="col-md-12 mb-4">
                            <div className="row">
                                {obj.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="col-md-3">

                                        <CardComponent
                                            img={item.img}
                                            name={item.name}
                                            inStorage={item.inStorage}
                                            id={item.id}
                                            addToLiked={addToLiked}
                                            item={item}
                                            isLiked={item.isLiked}
                                            price={item.price}
                                            addToCard={addToCard}
                                            description={item.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            }
        </>

    );
};




export default MainContent