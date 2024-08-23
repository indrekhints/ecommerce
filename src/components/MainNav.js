import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from './MyContext';

const MainNav = () => {
    /* siia õhtul ülejäänud kood mis avab submenu vastavalt parameetrile */
    const [submenuContent, setSubmenuContent] = useState("")
    const [selectedMenu, setSelectedMenu] = useState("")

    const {
        filteredData, setFilteredData,
        users, setUsers,
        isAuthenticated, setIsAuthenticated,
        logout,
        userLikes, setUserLikes,
        currentUser, setCurrentUser,
        shoppingListLocal, setShoppingListLocal,
        showMessage, setShowMessage

    } = useContext(MyContext)

    const openSubmenu = (parameter) => {
        if (parameter === "riided") {
            setSubmenuContent("riided")
        } else if (parameter === "jalanõud") {
            setSubmenuContent("jalanõud")
        } else if (parameter === "sooduspakkumised") {
            setSubmenuContent("sooduspakkumised")
        } else {
            setSubmenuContent("aksessuaarid")
        }
    };

    const handleMouseLeave = () => {
        setSubmenuContent("")
    }
    /* ***************************************************************************** */

    /*  TEEE SIINEDASI õhtul */
    const filteredContent = (parameter) => {
        const filteredItems = users.flatMap(user =>
            user.items.filter(item =>
                item.category === selectedMenu && item.subsubCategory === parameter
            )
        );
        setFilteredData(filteredItems);
        /* console.log(selectedMenu, filteredItems); */
    };





    /* filter mis võtab sisendiks selectedMenu ja parameetri ning kuvab vastavad müügi itemid
    võimalik et ma  ei vaja eraldi routingut women, men ja kids lehtedele vaid renderdan need filtriga ???????*


    


    /* ***************************************************************************** */

    const handleLinkClick = (parameter) => {
        setSelectedMenu(parameter)
        /*  if (id === "women") {
             setWomanSubMenu(true);
             setMenSubMenu(false);
             setKidsSubMenu(false);
         } else if (id === "men") {
             setMenSubMenu(true);
             setWomanSubMenu(false);
             setKidsSubMenu(false);
         } else {
             setKidsSubMenu(true);
             setWomanSubMenu(false);
             setMenSubMenu(false);
         } */
    };
    /* *******************************Loging out ********************************************** */


    const handleLogout = () => {



        setShowMessage(true);

        // peaida message pärast 2 sec
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    };

    /* *******************************Loging out ********************************************** */

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="container">
                            <div className="side-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link id="women" className="nav-link" to="/WomenPage" onClick={() => handleLinkClick("women")}>WOMEN</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link id="men" className="nav-link" to="/MenPage" onClick={() => handleLinkClick("men")}>MEN</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link id="kids" className="nav-link" to="/KidsPage" onClick={() => handleLinkClick("kids")}>KIDS</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="center-content" id="aboutyou">
                                <Link className="navbar-brand" to="/"><h3 style={{ color: 'grey' }}>E-Commerce</h3></Link>
                            </div>
                            <div className="side-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        {!isAuthenticated ? (
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/LoginPage">Log in</Link>
                                            </li>
                                        ) : (
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/" onClick={logout}>Log out</Link>
                                            </li>
                                        )}

                                    </li>

                                    {isAuthenticated && currentUser && currentUser.email != "admin@gmail.com" ? (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/AlertPage">Alerts</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/LikesPage">Likes</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/UserAccount"><span>Shopinglist</span>
                                                    {currentUser && currentUser.shoppingList && currentUser.shoppingList.length > 0 && (
                                                        <button
                                                            style={{
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                borderRadius: '50%',
                                                                display: 'inline-block',
                                                                textAlign: 'center',
                                                                height: "20px",
                                                                width: "20px",
                                                                fontSize: "0.9em",
                                                                padding: "0",
                                                                marginLeft: "10px"
                                                            }}
                                                        >
                                                            {currentUser.shoppingList.length}
                                                        </button>
                                                    )}</Link>
                                            </li></>
                                    ) : !isAuthenticated && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/VisitorShoppingCard" onClick={""}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span>Shopping Card</span>
                                                        {shoppingListLocal.length > 0 && shoppingListLocal && (
                                                            <button
                                                                style={{
                                                                    backgroundColor: 'black',
                                                                    color: 'white',
                                                                    borderRadius: '50%',
                                                                    display: 'inline-block',
                                                                    textAlign: 'center',
                                                                    height: "20px",
                                                                    width: "20px",
                                                                    fontSize: "0.9em",
                                                                    padding: "0",
                                                                    marginLeft: "10px"
                                                                }}
                                                            >
                                                                {shoppingListLocal.length}
                                                            </button>
                                                        )}
                                                    </div>
                                                </Link>

                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/AlertPage">Alerts</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/LikesPage">Likes</Link>
                                            </li>
                                        </>
                                    )}


                                    {isAuthenticated && currentUser && currentUser.email === "admin@gmail.com" && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Admin">
                                                    <span>Admin</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="/OrdersHistory">
                                                    <span>OrdersHistory</span>
                                                </Link>
                                            </li>
                                        </>

                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
            <div className="submenu" onMouseLeave={handleMouseLeave}>
                <ul className="submenuUl">
                    {/* teen ajutiselt testimiseks onClick, pean muutma tagasi onMouseOveriks */}
                    <li className="nav-item" onMouseOver={() => openSubmenu("riided")}>Riided</li>
                    <li className="nav-item" onMouseOver={() => openSubmenu("jalanõud")} >Jalanõud</li>
                    <li className="nav-item" onMouseOver={() => openSubmenu("aksessuaarid")}>Aksessuaarid</li>
                    <li className="nav-item" onMouseOver={() => openSubmenu("sooduspakkumised")}>Sooduspakkumised</li>
                </ul>
                {/* condtitional renderdus vastavalt millises submenu osas on onmouse over, ilmselt teen eraldi komponendid */}
                <div id="subSubmenu" >
                    {submenuContent === "riided" && <div>
                        <ul className="subSubmenuUl">{/*  siia filter funktsioon li desse */}
                            <li onClick={() => filteredContent("suveriided")}>Suveriided</li>
                            <li onClick={() => filteredContent("talveriided")} >Talveriided</li>
                            <li onClick={() => filteredContent("spordiriided")} >Spordiriided</li>
                        </ul>
                    </div>
                    }
                    {submenuContent === "jalanõud" && <div className="subSubmenuUl">
                        <li>Suvejalatsid</li>
                        <li>Talvejalatsid</li>
                        <li>Spordijalatsid</li>
                    </div>
                    }
                    {submenuContent === "aksessuaarid" && <div className="subSubmenuUl">
                        <li>kellad</li>
                        <li>Rihmad</li>
                        <li>Kotid</li>
                    </div>
                    }
                    {submenuContent === "sooduspakkumised" && <div className="subSubmenuUl">
                        <li>Riided kampaania</li>
                        <li>Jalatsid soodus</li>
                        <li>Kinkekaardid</li>
                    </div>
                    }
                </div>
            </div>
            {/* **************************************loging out message***************************************** */}


            {showMessage && <div className="logout-message">You loging out...</div>}

        </>
    )
}

export default MainNav