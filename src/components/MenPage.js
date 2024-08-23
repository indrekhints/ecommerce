import React, { useContext } from 'react'
import { MyContext } from './MyContext';
import { useEffect } from 'react';
import { db } from '../firebase-confic';
import { collection, getDocs } from 'firebase/firestore';
import CardComponent from './cardComponent';


const MenPage = () => {
    const { myData,
        setMyData,
        users, setUsers,
        liked, setLiked,
        addToLiked } = useContext(MyContext)
    return (
        <div>MenPage</div>
    )
}

export default MenPage