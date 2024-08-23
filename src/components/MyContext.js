
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-confic';
import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../firebase-confic';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

/* import './App.css'; */


const MyContext = createContext();


const MyContextProvider = ({ children }) => {
    /* klientide objekt , andmebaasi salvestamiseks */
    const [customerObject, setCustomerObject] = useState({
        id: '',
        email: '',
        shoppingList: [],
        likes: []
        /*  *********************** */
    });

    const [customerArray, setCustomerArray] = useState([])

    /* controllerid submenu avamiseks ja sulgemiseks ja sisu muutmiseks, hetkel ei lähe vaja */
    const [womanSubMenu, setWomanSubMenu] = useState(true)
    const [menSubMenu, setMenSubMenu] = useState(false)
    const [kidsSubMenu, setKidsSubMenu] = useState(false)
    const [filteredData, setFilteredData] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    /*  *********************** */
    /* controller mis jälgib kas kasutaja on sisse loginud */
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    /* controllerid submenu avamiseks ja sulgemiseks, sisu muutmiseks */
    /////
    /* impordin firebasist andmed sisse */
    const [users, setUsers] = useState([])
    /* liking array */
    /* meeldimised array */
    const [liked, setLiked] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    const [shoppingListLocal, setShoppingListLocal] = useState([])
    const [likeButtonColor, setLikeButtonColor] = useState(false)
    const [addToCardButtonColor, setAddToCardButtonColor] = useState(false)
    const [total, setTotal] = useState(0)
    const [showMessage, setShowMessage] = useState(false);// logout message
    const [tellimusedAdmin, setTellimusedAdmin] = useState([])

    /* *************************** see siin uuesti ****************************** */
    const [initialLoad, setInitialLoad] = useState(true);
    const navigate = useNavigate();

    /* *************************** see siin uuesti ****************************** */


    /*  kontrollib like nupu signInWithEmailLink, värvi, mida ma siin soperdasin, tegin korda??????????  */



    const useCollectionRef = collection(db, "woman")
    const useCustomers = collection(db, "customersFirebase")


    /* nb users pole minu süsteemis kasutajad vaid selling sellingItemsid! */
    /*  ************müügi itemite data**************** */
    useEffect(() => {
        //selling items  
        const getUsers = async () => {
            const data = await getDocs(useCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUsers()
        //customers data 
        /*  const getCustomers = async () => {
             const data = await getDocs(useCustomers)
             setCustomerArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
         }
         getCustomers() */

    }, [])

    /* ************ selles osas tegelen sisselogitud customeri andmetega************* */

    /* JÄIN SIIN POOLELI, homme täienda funktsiooni ja lae alla ka objekt "customersFirebase" ist  mille id on sama mis currentUseri id */

    //fetching adminItems from firestore

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Fetch user data fail
                    const userDoc = await getDoc(doc(db, 'customersFirebase', user.uid));
                    const userData = userDoc.exists() ? userDoc.data() : null;
                    setCurrentUser(userData);
                    console.log("Fetched user data:", userData);

                    /*    // Fetch admin items data
                       const adminDoc = await getDoc(doc(db, 'itemList', 'itemList'));
                       const adminData = adminDoc.exists() ? adminDoc.data().adminItems || [] : [];
                       setTellimusedAdmin(adminData);
                       console.log("Fetched adminItems:", adminData); // Log the fetched admin items*/
                    setInitialLoad(false);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error fetching user or admin data: ", error);
                }
            } else {
                setCurrentUser(null);
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const fetchAdminItems = async () => {
            try {
                const docRef = doc(db, 'itemList', 'itemList');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTellimusedAdmin(data.adminItems || []);
                }
            } catch (error) {
                console.error("Error fetching admin items from Firestore:", error);
            }
            setInitialLoad(false);
        };

        fetchAdminItems();
    }, []);

    //update firestore
    useEffect(() => {
        const updateAdminItems = async () => {
            try {
                await setDoc(doc(db, 'itemList', 'itemList'), { adminItems: tellimusedAdmin }, { merge: true });
                console.log("Updated adminItems in Firestore:", tellimusedAdmin);
            } catch (error) {
                console.error("Error updating admin items in Firestore:", error);
            }
        };

        if (!initialLoad) { // Check if it's not the initial load
            updateAdminItems();
        }
    }, [tellimusedAdmin, initialLoad])

    // Kalkuleerin  total kui  currentUser n  shoppingList muutub
    useEffect(() => {
        if (currentUser && currentUser.shoppingList) {
            const calculatedTotal = currentUser.shoppingList.reduce((sum, item) => sum + item.itemTotal, 0);
            setTotal(calculatedTotal);

        }
    }, [currentUser]);

    // Update Firestore when currentUser or isAuthenticated changes
    useEffect(() => {
        const updateTotalAndShoppingListInFirestore = async () => {
            if (currentUser && currentUser.id) {
                try {
                    const userRef = doc(db, 'customersFirebase', currentUser.id);
                    await updateDoc(userRef, {
                        totalBuyment: total,
                        shoppingList: currentUser.shoppingList || [], // Ensure shoppingList is not undefined

                    });
                } catch (error) {
                    console.error("Error updating Firestore: ", error);
                }
            }
        };

        if (isAuthenticated) {
            updateTotalAndShoppingListInFirestore();
        }
    }, [currentUser, isAuthenticated, total]);


    /* *********************************************************************************** */
    /* ************* välja logimise funktsionaalsus***************** */
    const logout = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
            // Logic for logging out the user

            // Show the message
            setShowMessage(true);

            // Hide the message after 2 seconds
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            navigate('/'); // Redirect to home route*

            /* localStorage.removeItem('user');
            setCurrentUser(null);
            setIsAuthenticated(false); */


        } catch (error) {
            console.error('Logout failed:', error);
        }



    };
    /* ****************************************************** */


    const addToLiked = async (id, item, likeButtonColor, setLikeButtonColor) => {
        const newItem = { ...item, isLiked: !item.isLiked };



        if (isAuthenticated) {
            let updatedLikes;
            if (!currentUser.likes.some(likedItem => likedItem.id === id)) {
                updatedLikes = [...currentUser.likes, newItem];
            } else {
                updatedLikes = currentUser.likes.filter(likedItem => likedItem.id !== id);
            }

            // Update currentUser state
            const updatedUser = { ...currentUser, likes: updatedLikes };
            setCurrentUser(updatedUser);

            // Update Firestore
            try {
                await setDoc(doc(db, 'customersFirebase', currentUser.id), updatedUser);
            } catch (error) {
                console.error("Error updating likes in Firestore:", error);
            }
            //siis kui pole sisse logitud
        } else {
            if (!liked.some(likedItem => likedItem.id === id)) {
                setLiked(prevLiked => [...prevLiked, newItem]);
            } else {
                setLiked(prevLiked => prevLiked.filter(likedItem => likedItem.id !== id));
            }
        }

        setLikeButtonColor(prevLikeButtonColor => !prevLikeButtonColor);

    };
    console.log("admin", tellimusedAdmin)
    /*  ************************* ADD TO CARD FUNCTION ********************************* */



    const addToCard = async (id, item, addToCardButtonColor, setAddToCardButtonColor) => {
        const newItem = {
            ...item,
            itemTotal: 0,
            quantity: 0,
            customerID: currentUser ? currentUser.email : "guest",
            orderId: uuidv4()
        };


        if (isAuthenticated && currentUser) {
            let updatedShoppingList
            if (!currentUser.shoppingList.some(shoppingItem => shoppingItem.id === id)) {
                updatedShoppingList = [...currentUser.shoppingList, newItem];

            } else {
                /* kui on olemas siis eemaldame  */
                updatedShoppingList = currentUser.shoppingList.filter(likedItem => likedItem.id !== id);
            }
            // Update currentUser state
            const updatedUser = { ...currentUser, shoppingList: updatedShoppingList };
            setCurrentUser(updatedUser);
            setTellimusedAdmin(updatedShoppingList)

            // Update Firestore****** SEE KOHT SIIN
            try {
                await setDoc(doc(db, 'customersFirebase', currentUser.id), updatedUser);
            } catch (error) {
                console.error("Error updating likes in Firestore:", error);
            }
            //siis kui pole sisse logitud
        } else {
            if (!shoppingListLocal.some(shoppingItem => shoppingItem.id === id)) {
                setShoppingListLocal(prev => [...prev, newItem]);
                setTellimusedAdmin(prev => [...prev, newItem])
            } else {
                setShoppingListLocal(shoppingItem => shoppingItem.filter(shopItem => shopItem.id !== id));
                setTellimusedAdmin(shoppingItem => shoppingItem.filter(shopItem => shopItem.id !== id));
            }
            try {
                await setDoc(doc(db, 'customersFirebase', "quest"), shoppingListLocal);
            } catch (error) {
                console.error("Error updating likes in Firestore:", error);
            }


        }
        setAddToCardButtonColor(prevButtonColor => !prevButtonColor);
        console.log("test", tellimusedAdmin)

    };

    const removeFromShoppingList = async (id) => {
        // Filter out the item to be removed
        const updatedShoppingList = currentUser.shoppingList.filter(item => item.id !== id);

        // Calculate the new total
        const newTotal = updatedShoppingList.reduce((sum, item) => sum + item.itemTotal, 0);

        // Update the shoppingList and total state
        setCurrentUser(prevUser => ({
            ...prevUser,
            shoppingList: updatedShoppingList
        }));

        setTotal(newTotal);

        // Update Firestore
        try {
            const userRef = doc(db, 'customersFirebase', currentUser.id);
            await updateDoc(userRef, {
                totalBuyment: newTotal,
                // shoppingList: updatedShoppingList
            });
        } catch (error) {
            console.error("Error updating Firestore: ", error);
        }
    };

    /*  ****************************shoppinCard increment, decrement*************************** */


    return (
        <MyContext.Provider value={{
            isAuthenticated, setIsAuthenticated,
            filteredData, setFilteredData,
            users, setUsers,
            addToLiked,
            liked, setLiked,
            womanSubMenu, setWomanSubMenu,
            menSubMenu, setMenSubMenu,
            kidsSubMenu, setKidsSubMenu,
            customerObject, setCustomerObject,
            customerArray, setCustomerArray,
            logout,
            currentUser, setCurrentUser,
            userLikes, setUserLikes,
            addToCard,
            likeButtonColor, setLikeButtonColor,
            addToCardButtonColor, setAddToCardButtonColor,
            removeFromShoppingList,
            total, setTotal,
            shoppingListLocal, setShoppingListLocal,
            showMessage, setShowMessage,
            tellimusedAdmin, setTellimusedAdmin




        }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };