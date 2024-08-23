import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import AdminItemCard from './adminItemCard';

const Admin = () => {
    const {
        myData, setMyData,
        users, setUsers,
        liked, setLiked,
        addToLiked,
        userLikes, setUserLikes,
        isAuthenticated, setIsAuthenticated,
        addToCard,
        currentUser, setCurrentUser,
        tellimusedAdmin, setTellimusedAdmin
    } = useContext(MyContext);

    console.log(currentUser);

    const containerStyle = {
        width: '100%',
        padding: '20px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
    };

    return (
        <div style={containerStyle}>
            <div style={gridStyle}>
                {tellimusedAdmin.length > 0 && tellimusedAdmin.map((item) => (
                    <AdminItemCard
                        key={item.orderId}
                        img={item.img}
                        name={item.name}
                        price={item.price}
                        orderId={item.orderId}
                        customerID={item.customerID}
                        itemTotal={item.itemTotal}
                        quantity={item.quantity}
                        setTellimusedAdmin={setTellimusedAdmin}
                        tellimusedAdmin={tellimusedAdmin}
                    />
                ))}
            </div>
        </div>
    );
};

export default Admin;
