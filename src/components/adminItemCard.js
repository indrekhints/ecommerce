import React from 'react';

const AdminItemCard = ({ img, name, price, orderId, customerID, itemTotal, quantity, tellimusedAdmin, setTellimusedAdmin }) => {

    const removeFromTellimuseAdmin = () => {
        const newTellimused = tellimusedAdmin.filter(item => orderId !== item.orderId)
        setTellimusedAdmin(newTellimused)
    }

    return (
        <div className="card">
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "0.65em" }}>{name}</h5>
                <p className="card-text" style={{ fontSize: "0.65em" }}>${price}</p>
                <p className="card-text" style={{ fontSize: "0.65em" }}>order ID :{orderId}</p>
                <p className="card-text" style={{ fontSize: "0.65em" }}>customer ID :{customerID}</p>
                <p className="card-text" style={{ fontSize: "0.65em" }}>total of item : $ {itemTotal}</p>
                <p className="card-text" style={{ fontSize: "0.65em" }}>item quantity of order :  {quantity}</p>
                <button
                    className="btn btn-outline-dark text-uppercase btn-sm"
                    style={{ fontSize: '0.60rem', padding: '0.25rem 0.5rem' }}
                    onClick={() => removeFromTellimuseAdmin(orderId)}>
                    TEHTUD
                </button>

            </div>
        </div>
    );
};

export default AdminItemCard;