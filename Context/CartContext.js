import { createContext, useEffect, useState } from "react";
import axios from "axios";

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
	/* Creamos un estado para el carrito */
	const [cartItems, setCartItems] = useState(() => {
		try {
			const productsInLocalStorage = localStorage.getItem("cartProducts");
			return productsInLocalStorage ? JSON.parse(productsInLocalStorage) : [];
		} catch (error) {
			return [];
		}
	});
	const [products, setProducts] = useState([]);

	useEffect(() => {
		localStorage.setItem("cartProducts", JSON.stringify(cartItems));

		console.log(cartItems);
	}, [cartItems]);

	const getProducts = async () => {
		fetch("api/products")
			.then((response) => response.json())
			.then((data) => {
				setProducts(data[0]);
			});
	};

	const getProductsCart = async () => {
		return await fetch("api/products")
			.then((response) => response.json())
			.then((data) => {
				setProducts(data[0]);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		getProducts();
		getProductsCart();
	}, []);

	const addItemToCart =  (product) => {
		// const { name, img, price } = product;

		// await axios.post("http://localhost:4000/products-cart", {
		// 	name,
		// 	img,
		// 	price,
		// });

		// getProducts();
		// getProductsCart();
        const inCart = cartItems.find((productInCart) => productInCart.id === product.id);

            if(inCart) {
                setCartItems(
                    cartItems.map((productInCart) => {
                        if(productInCart.id === product.id){
                            return { ...inCart, amount: inCart.amount + 1};
                        } else return productInCart;
                    })
                )
            } else {
                setCartItems([...cartItems, { ...product, amount: 1 }])
            }
	};

	const editItemToCart =  (product) => {
		// if (query === "del" && amount === 1) {
		// 	await axios
		// 		.delete(`http://localhost:4000/products-cart/${id}`)
		// 		.then(({ data }) => console.log(data));
		// } else {
		// 	await axios
		// 		.put(`http://localhost:4000/products-cart/${id}?query=${query}`, {
		// 			amount,
		// 		})
		// 		.then(({ data }) => console.log(data));
		// }

		// getProducts();
		// getProductsCart();
        const inCart = cartItems.find((productInCart) => productInCart.id === product.id);

            if(inCart.amount === 1) {
                setCartItems(
                    cartItems.filter((productInCart) => productInCart.id !== product.id)
                )
            } else {
                setCartItems(
                    
                    cartItems.map((productInCart) => {
                    if (productInCart.id === product.id) {
                        return {...inCart, amount: inCart.amount - 1}
                    } else return productInCart;
                })
                )
            }
	};

	return (
		/* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
		<CartContext.Provider
			value={{ cartItems, products, addItemToCart, editItemToCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
