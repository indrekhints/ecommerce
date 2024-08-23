import React, { useContext } from 'react'
import { MyContext } from './MyContext';

const MainFooter = () => {
    return (
        <div style={{ backgroundImage: 'linear-gradient(to right, #2B2B2B, #414141)', color: 'white', display: 'flex', gap: '100px', }}>
            <ul style={{
                listStyleType: "square",
                color: 'white',
                padding: "20px",


                fontSize: "0.8em"
            }}
            >
                <li>Welcome to our website!</li>
                <li>Stay connected with us.</li>
                <li>Explore our latest products.</li>

            </ul>
            <ul style={{

                listStyleType: "square",
                color: '#C0C0C0',
                padding: "20px",
                fontSize: "0.8em",
                flex: '1'
            }}
            >

                <li>Contact us for more information.</li>
                <li>Join our community.</li>
                <li>Follow us on social media.</li>
            </ul>
        </div >
    )
}

export default MainFooter