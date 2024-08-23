import React from 'react';
import { auth, db } from '../firebase-confic';
import { collection, getDocs, setDoc, doc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';




const AddSellingItem = () => {
    const itemsArray = [


        {
            category: "women",
            id: "item1w",
            name: "item1",
            inStorage: 99,
            isLiked: false,
            price: 100,
            description: "This stylish piece is perfect for any season. Made with high-quality materials, it ensures both comfort and durability. The unique design will make you stand out in any crowd. A must-have in every wardrobe.",
            subCategory: "riided",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img1.jpg"
        },
        {
            category: "men",
            id: "item2w",
            name: "item2",
            inStorage: 95,
            isLiked: false,
            price: 86,
            description: "Crafted with attention to detail, this item offers superior comfort and style. Its versatile design makes it suitable for various occasions. You will appreciate the fine craftsmanship and modern aesthetic. Perfect for enhancing your everyday look.",
            subCategory: "riided",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img2.jpg"
        },
        {
            category: "women",
            id: "item3w",
            name: "item3",
            inStorage: 72,
            isLiked: false,
            price: 399,
            description: "Elevate your style with this elegant accessory. It combines functionality with a chic design, making it a perfect addition to your collection. The premium quality ensures long-lasting wear. Ideal for both casual and formal settings.",
            subCategory: "aksesuaarid",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img3.jpg"
        },
        {
            category: "men",
            id: "item4k",
            name: "item4",
            inStorage: 65,
            isLiked: false,
            price: 444,
            description: "Stay warm and stylish with this winter essential. Designed to provide maximum comfort during cold weather, it features a contemporary look that’s sure to impress. Made from durable materials, it’s built to last. A great choice for any fashion-forward individual.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img4.jpg"
        },
        {
            category: "women",
            id: "item5w",
            name: "item5",
            inStorage: 98,
            isLiked: false,
            price: 407,
            description: "Step out in style with these fashionable summer shoes. They offer excellent comfort and breathability, perfect for hot days. The trendy design will complement any outfit. An essential for your summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img5.jpg"
        },
        {
            category: "women",
            id: "item6k",
            name: "item6",
            inStorage: 7,
            isLiked: false,
            price: 115,
            description: "Accessorize your winter wardrobe with this must-have item. It’s designed to offer both style and functionality, keeping you warm while looking chic. The high-quality materials ensure durability. A versatile piece that can be worn with various outfits.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img6.jpg"
        },
        {
            category: "women",
            id: "item7k",
            name: "item7",
            inStorage: 50,
            isLiked: false,
            price: 72,
            description: "This elegant accessory is perfect for adding a touch of sophistication to your look. Its classic design is complemented by modern elements, making it a timeless piece. Crafted with premium materials, it guarantees longevity. Ideal for any special occasion.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img7.jpg"
        },
        {
            category: "men",
            id: "item8w",
            name: "item8",
            inStorage: 59,
            isLiked: false,
            price: 165,
            description: "These versatile summer shoes are designed for comfort and style. They feature a breathable design perfect for hot weather. The modern look will enhance any casual outfit. A great addition to your summer collection.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img8.jpg"
        },
        {
            category: "kids",
            id: "item9w",
            name: "item9",
            inStorage: 73,
            isLiked: false,
            price: 459,
            description: "Keep your kids warm and stylish with this essential winter accessory. It’s designed with a focus on both comfort and durability, perfect for active children. The fun design will appeal to both kids and parents. A great choice for the colder months.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img9.jpg"
        },
        {
            category: "kids",
            id: "item10k",
            name: "item10",
            inStorage: 84,
            isLiked: false,
            price: 63,
            description: "These summer clothes are perfect for keeping your kids cool and comfortable. Made with lightweight materials, they are ideal for hot weather. The vibrant colors and fun designs will be a hit with kids. A must-have for their summer wardrobe.",
            subCategory: "riided",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img10.jpg"
        },
        {
            category: "kids",
            id: "item11w",
            name: "item11",
            inStorage: 55,
            isLiked: false,
            price: 105,
            description: "This accessory is designed to add a touch of style to your kid's winter outfits. It combines functionality with a trendy design, ensuring your child stays warm and fashionable. The durable materials make it ideal for daily wear. Perfect for the colder seasons.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img11.jpg"
        },
        {
            category: "kids",
            id: "item12k",
            name: "item12",
            inStorage: 88,
            isLiked: false,
            price: 132,
            description: "Designed for active kids, these sporty clothes are both comfortable and durable. They feature a modern design that will keep your child looking stylish during physical activities. The high-quality fabric ensures longevity. A great addition to their wardrobe.",
            subCategory: "riided",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img12.jpg"
        },
        {
            category: "kids",
            id: "item13w",
            name: "item13",
            inStorage: 22,
            isLiked: false,
            price: 482,
            description: "This stylish winter accessory is perfect for keeping your kids warm. It features a fun design that kids will love, while the high-quality materials ensure durability. Easy to pair with various outfits, it’s a versatile addition to their wardrobe. Ideal for the colder months.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img13.jpg"
        },
        {
            category: "men",
            id: "item14m",
            name: "item14",
            inStorage: 44,
            isLiked: false,
            price: 371,
            description: "Step out in these stylish winter shoes designed for comfort and durability. The sleek design will complement any outfit, making them a versatile addition to your wardrobe. Perfect for both casual and formal settings. Stay warm and fashionable all season long.",
            subCategory: "jalatsid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img14.jpg"
        },
        {
            category: "women",
            id: "item15k",
            name: "item15",
            inStorage: 7,
            isLiked: false,
            price: 161,
            description: "These chic summer shoes are designed to keep you cool and stylish. They feature a breathable design perfect for hot weather. The fashionable look will enhance any casual outfit. A must-have for your summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img15.jpg"
        },
        {
            category: "men",
            id: "item16k",
            name: "item16",
            inStorage: 69,
            isLiked: false,
            price: 199,
            description: "This accessory is designed to add a touch of style to your winter outfits. It combines functionality with a trendy design, ensuring you stay warm and fashionable. The durable materials make it ideal for daily wear. Perfect for the colder seasons.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img16.jpg"
        },
        {
            category: "women",
            id: "item17k",
            name: "item17",
            inStorage: 6,
            isLiked: false,
            price: 291,
            description: "Elevate your wardrobe with this stylish piece. It's designed with both comfort and fashion in mind, making it perfect for various occasions. The premium materials ensure long-lasting wear. A must-have for any fashion enthusiast.",
            subCategory: "riided",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img17.jpg"
        },
        {
            category: "kids",
            id: "item18w",
            name: "item18",
            inStorage: 56,
            isLiked: false,
            price: 311,
            description: "These comfortable and stylish summer shoes are perfect for your kids. They offer great breathability and support, ideal for active days. The fun design will be a hit with children. A must-have for their summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img18.jpg"
        },
        {
            category: "women",
            id: "item19k",
            name: "item19",
            inStorage: 87,
            isLiked: false,
            price: 401,
            description: "Stay cozy and fashionable with this winter essential. Designed to provide maximum warmth, it features a contemporary look that’s sure to impress. Made from high-quality materials, it’s built to last. A great addition to any winter wardrobe.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img19.jpg"
        },
        {
            category: "men",
            id: "item20w",
            name: "item20",
            inStorage: 64,
            isLiked: false,
            price: 399,
            description: "These versatile summer shoes are designed for comfort and style. They feature a breathable design perfect for hot weather. The modern look will enhance any casual outfit. A great addition to your summer collection.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img20.jpg"
        },
        {
            category: "kids",
            id: "item21k",
            name: "item21",
            inStorage: 30,
            isLiked: false,
            price: 306,
            description: "This stylish accessory is perfect for keeping your kids warm. It features a fun design that kids will love, while the high-quality materials ensure durability. Easy to pair with various outfits, it’s a versatile addition to their wardrobe. Ideal for the colder months.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img21.jpg"
        },
        {
            category: "women",
            id: "item22k",
            name: "item22",
            inStorage: 11,
            isLiked: false,
            price: 433,
            description: "Step out in style with these fashionable summer shoes. They offer excellent comfort and breathability, perfect for hot days. The trendy design will complement any outfit. An essential for your summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img22.jpg"
        },
        {
            category: "women",
            id: "item23k",
            name: "item23",
            inStorage: 67,
            isLiked: false,
            price: 109,
            description: "Stay warm and stylish with this winter essential. Designed to provide maximum comfort during cold weather, it features a contemporary look that’s sure to impress. Made from durable materials, it’s built to last. A great choice for any fashion-forward individual.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img23.jpg"
        },
        {
            category: "men",
            id: "item24k",
            name: "item24",
            inStorage: 36,
            isLiked: false,
            price: 174,
            description: "These versatile summer shoes are designed for comfort and style. They feature a breathable design perfect for hot weather. The modern look will enhance any casual outfit. A great addition to your summer collection.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img24.jpg"
        },
        {
            category: "women",
            id: "item25k",
            name: "item25",
            inStorage: 13,
            isLiked: false,
            price: 246,
            description: "Elevate your wardrobe with this stylish piece. It's designed with both comfort and fashion in mind, making it perfect for various occasions. The premium materials ensure long-lasting wear. A must-have for any fashion enthusiast.",
            subCategory: "riided",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img25.jpg"
        },
        {
            category: "men",
            id: "item26k",
            name: "item26",
            inStorage: 62,
            isLiked: false,
            price: 496,
            description: "Step out in style with these fashionable summer shoes. They offer excellent comfort and breathability, perfect for hot days. The trendy design will complement any outfit. An essential for your summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img26.jpg"
        },
        {
            category: "kids",
            id: "item27w",
            name: "item27",
            inStorage: 95,
            isLiked: false,
            price: 103,
            description: "These comfortable and stylish summer shoes are perfect for your kids. They offer great breathability and support, ideal for active days. The fun design will be a hit with children. A must-have for their summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img27.jpg"
        },
        {
            category: "women",
            id: "item28k",
            name: "item28",
            inStorage: 37,
            isLiked: false,
            price: 190,
            description: "Stay cozy and fashionable with this winter essential. Designed to provide maximum warmth, it features a contemporary look that’s sure to impress. Made from high-quality materials, it’s built to last. A great addition to any winter wardrobe.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img28.jpg"
        },
        {
            category: "men",
            id: "item29w",
            name: "item29",
            inStorage: 60,
            isLiked: false,
            price: 123,
            description: "Crafted with attention to detail, this item offers superior comfort and style. Its versatile design makes it suitable for various occasions. You will appreciate the fine craftsmanship and modern aesthetic. Perfect for enhancing your everyday look.",
            subCategory: "riided",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img29.jpg"
        },
        {
            category: "women",
            id: "item30k",
            name: "item30",
            inStorage: 18,
            isLiked: false,
            price: 238,
            description: "Elevate your style with this elegant accessory. It combines functionality with a chic design, making it a perfect addition to your collection. The premium quality ensures long-lasting wear. Ideal for both casual and formal settings.",
            subCategory: "aksesuaarid",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img30.jpg"
        },
        {
            category: "men",
            id: "item31k",
            name: "item31",
            inStorage: 14,
            isLiked: false,
            price: 194,
            description: "These versatile summer shoes are designed for comfort and style. They feature a breathable design perfect for hot weather. The modern look will enhance any casual outfit. A great addition to your summer collection.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img31.jpg"
        },
        {
            category: "women",
            id: "item32k",
            name: "item32",
            inStorage: 12,
            isLiked: false,
            price: 126,
            description: "This elegant accessory is perfect for adding a touch of sophistication to your look. Its classic design is complemented by modern elements, making it a timeless piece. Crafted with premium materials, it guarantees longevity. Ideal for any special occasion.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img32.jpg"
        },
        {
            category: "kids",
            id: "item33w",
            name: "item33",
            inStorage: 11,
            isLiked: false,
            price: 463,
            description: "This accessory is designed to add a touch of style to your kid's winter outfits. It combines functionality with a trendy design, ensuring your child stays warm and fashionable. The durable materials make it ideal for daily wear. Perfect for the colder seasons.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img33.jpg"
        },
        {
            category: "women",
            id: "item34k",
            name: "item34",
            inStorage: 25,
            isLiked: false,
            price: 415,
            description: "Stay cozy and fashionable with this winter essential. Designed to provide maximum warmth, it features a contemporary look that’s sure to impress. Made from high-quality materials, it’s built to last. A great addition to any winter wardrobe.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img34.jpg"
        },
        {
            category: "men",
            id: "item35w",
            name: "item35",
            inStorage: 52,
            isLiked: false,
            price: 252,
            description: "Elevate your wardrobe with this stylish piece. It's designed with both comfort and fashion in mind, making it perfect for various occasions. The premium materials ensure long-lasting wear. A must-have for any fashion enthusiast.",
            subCategory: "riided",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img35.jpg"
        },
        {
            category: "kids",
            id: "item36w",
            name: "item36",
            inStorage: 45,
            isLiked: false,
            price: 212,
            description: "These comfortable and stylish summer shoes are perfect for your kids. They offer great breathability and support, ideal for active days. The fun design will be a hit with children. A must-have for their summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img36.jpg"
        },
        {
            category: "women",
            id: "item37k",
            name: "item37",
            inStorage: 98,
            isLiked: false,
            price: 382,
            description: "Step out in style with these fashionable summer shoes. They offer excellent comfort and breathability, perfect for hot days. The trendy design will complement any outfit. An essential for your summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img37.jpg"
        },
        {
            category: "men",
            id: "item38w",
            name: "item38",
            inStorage: 72,
            isLiked: false,
            price: 365,
            description: "Crafted with attention to detail, this item offers superior comfort and style. Its versatile design makes it suitable for various occasions. You will appreciate the fine craftsmanship and modern aesthetic. Perfect for enhancing your everyday look.",
            subCategory: "riided",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img38.jpg"
        },
        {
            category: "women",
            id: "item39k",
            name: "item39",
            inStorage: 27,
            isLiked: false,
            price: 280,
            description: "This elegant accessory is perfect for adding a touch of sophistication to your look. Its classic design is complemented by modern elements, making it a timeless piece. Crafted with premium materials, it guarantees longevity. Ideal for any special occasion.",
            subCategory: "aksesuaarid",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img39.jpg"
        },
        {
            category: "men",
            id: "item40k",
            name: "item40",
            inStorage: 26,
            isLiked: false,
            price: 109,
            description: "Stay warm and stylish with this winter essential. Designed to provide maximum comfort during cold weather, it features a contemporary look that’s sure to impress. Made from durable materials, it’s built to last. A great choice for any fashion-forward individual.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img40.jpg"
        },
        {
            category: "kids",
            id: "item41w",
            name: "item41",
            inStorage: 80,
            isLiked: false,
            price: 130,
            description: "This stylish accessory is perfect for keeping your kids warm. It features a fun design that kids will love, while the high-quality materials ensure durability. Easy to pair with various outfits, it’s a versatile addition to their wardrobe. Ideal for the colder months.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img41.jpg"
        },
        {
            category: "women",
            id: "item42k",
            name: "item42",
            inStorage: 17,
            isLiked: false,
            price: 117,
            description: "Crafted with attention to detail, this item offers superior comfort and style. Its versatile design makes it suitable for various occasions. You will appreciate the fine craftsmanship and modern aesthetic. Perfect for enhancing your everyday look.",
            subCategory: "riided",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img42.jpg"
        },
        {
            category: "men",
            id: "item43k",
            name: "item43",
            inStorage: 29,
            isLiked: false,
            price: 140,
            description: "Elevate your wardrobe with this stylish piece. It's designed with both comfort and fashion in mind, making it perfect for various occasions. The premium materials ensure long-lasting wear. A must-have for any fashion enthusiast.",
            subCategory: "riided",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img43.jpg"
        },
        {
            category: "kids",
            id: "item44k",
            name: "item44",
            inStorage: 38,
            isLiked: false,
            price: 183,
            description: "This accessory is designed to add a touch of style to your kid's winter outfits. It combines functionality with a trendy design, ensuring your child stays warm and fashionable. The durable materials make it ideal for daily wear. Perfect for the colder seasons.",
            subCategory: "aksesuaarid",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img44.jpg"
        },
        {
            category: "women",
            id: "item45k",
            name: "item45",
            inStorage: 21,
            isLiked: false,
            price: 117,
            description: "These versatile summer shoes are designed for comfort and style. They feature a breathable design perfect for hot weather. The modern look will enhance any casual outfit. A great addition to your summer collection.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img45.jpg"
        },
        {
            category: "men",
            id: "item46k",
            name: "item46",
            inStorage: 54,
            isLiked: false,
            price: 356,
            description: "Stay cozy and fashionable with this winter essential. Designed to provide maximum warmth, it features a contemporary look that’s sure to impress. Made from high-quality materials, it’s built to last. A great addition to any winter wardrobe.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img46.jpg"
        },
        {
            category: "women",
            id: "item47w",
            name: "item47",
            inStorage: 83,
            isLiked: false,
            price: 193,
            description: "Step out in style with these fashionable summer shoes. They offer excellent comfort and breathability, perfect for hot days. The trendy design will complement any outfit. An essential for your summer wardrobe.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img47.jpg"
        },
        {
            category: "men",
            id: "item48k",
            name: "item48",
            inStorage: 41,
            isLiked: false,
            price: 344,
            description: "Stay cozy and fashionable with this winter essential. Designed to provide maximum warmth, it features a contemporary look that’s sure to impress. Made from high-quality materials, it’s built to last. A great addition to any winter wardrobe.",
            subCategory: "riided",
            subsubCategory: "talveriided",
            visibility: true,
            img: "/images/img48.jpg"
        },
        {
            category: "kids",
            id: "item49k",
            name: "item49",
            inStorage: 99,
            isLiked: false,
            price: 166,
            description: "These versatile summer shoes are designed for comfort and style. They feature a breathable design perfect for hot weather. The modern look will enhance any casual outfit. A great addition to your summer collection.",
            subCategory: "jalatsid",
            subsubCategory: "suveriided",
            visibility: true,
            img: "/images/img49.jpg"
        },
        {
            category: "women",
            id: "item50k",
            name: "item50",
            inStorage: 44,
            isLiked: false,
            price: 157,
            description: "Crafted with attention to detail, this item offers superior comfort and style. Its versatile design makes it suitable for various occasions. You will appreciate the fine craftsmanship and modern aesthetic. Perfect for enhancing your everyday look.",
            subCategory: "riided",
            subsubCategory: "spordiriided",
            visibility: true,
            img: "/images/img50.jpg"
        }


    ];

    const pushItemsToFirestore = async () => {
        // Reference to the document in the subcollection
        const docRef = doc(db, "woman", "woman");

        try {
            for (const item of itemsArray) {
                // Update the document by adding the new item to the 'items' array field
                await updateDoc(docRef, {
                    items: arrayUnion(item)
                });
                console.log("Document successfully updated with item:", item);
            }
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    return (
        <div>
            <button onClick={pushItemsToFirestore}>Add Items to Firestore</button>
        </div>
    );
};


export default AddSellingItem;




