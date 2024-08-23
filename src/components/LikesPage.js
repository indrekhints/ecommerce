import React, { useContext } from 'react'
import { MyContext } from './MyContext';
import { useEffect } from 'react';
import { db } from '../firebase-confic';
import { collection, getDocs } from 'firebase/firestore';
import LikedCardComponent from './LikedCardComponent.js';


const LikesPage = () => {
    const { myData, setMyData,
        users, setUsers,
        liked, setLiked,
        addToLiked,
        isAuthenticated,
        currentUser, setCurrentUser } = useContext(MyContext)
    const itemsToDisplay = isAuthenticated ? currentUser.likes : liked;
    return (

        <div className="row">
            {itemsToDisplay.length > 0 ? (
                itemsToDisplay.map((item, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        <LikedCardComponent
                            img={item.img}
                            name={item.name}
                            inStorage={item.inStorage}
                            id={item.id}
                            addToLiked={() => { }}
                            item={item}
                            isLiked={item.isLiked}
                            price={item.price}
                        />
                    </div>
                ))
            ) : (
                <div className="col-12">
                    <p>No liked items found.</p>
                </div>
            )}
        </div>
    );

    {/*  {
                liked.map((item, index) => (
                    <div key={index} className="col-md-3">
                        <LikedCardComponent img={item.img} name={item.name} inStorage={item.inStorage} id={item.id} price={item.price} />
                    </div>
                ))
            }
 */}




}

export default LikesPage