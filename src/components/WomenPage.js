import React, { useContext } from 'react'
import { MyContext } from './MyContext';
import { useEffect } from 'react';
import { db } from '../firebase-confic';
import { collection, getDocs } from 'firebase/firestore';
import CardComponent from './cardComponent';

const WomenPage = () => {

    const { myData, setMyData, users, setUsers, liked, setLiked, addToLiked, filteredData, setFilteredData } = useContext(MyContext)
    console.log("test", filteredData);

    return (
        <div className="row">

            {filteredData.map((item) => (
                <div key={item.id} className="col-md-12 mb-4">
                    <div className="row">

                        <div key={item.id} className="col-md-3">
                            <CardComponent
                                img={item.img}
                                name={item.name}
                                inStorage={item.inStorage}
                                id={item.id}
                                addToLiked={addToLiked}
                                item={item}
                                isLiked={item.isLiked}
                                price={item.price}
                            />
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default WomenPage