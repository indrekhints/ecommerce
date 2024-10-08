import React from 'react';

const LikedCardComponent = ({ img, name, price }) => {
    return (
        <div className="card">
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">${price}</p>
            </div>
        </div>
    );
};

export default LikedCardComponent;