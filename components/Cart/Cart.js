import React, { useEffect, useContext, useState } from "react";
import CartContext from "../../Context/CartContext";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import {
	Button,
	Card,
	Col,
	Container,
	Divider,
	Row,
	Text,
} from "@nextui-org/react";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { red } from "@mui/material/colors";

export const Cart = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [productsLength, setProductsLength] = useState(0);

	const { cartItems, editItemToCart, addItemToCart } = useContext(CartContext);

	useEffect(() => {
		setProductsLength(
			cartItems.reduce((previous, current) => previous + current.amount, 0)
		);
	}, [cartItems]);

	const total = cartItems.reduce(
		(previous, current) => previous + current.amount * current.price,
		0
	);

	return (
		<>
			<div style={{ color: "white" }}>
				<button
					style={{ backgroundColor: "transparent", border: "none" }}
					onClick={() => {
						setCartOpen(!cartOpen);
					}}
				>
					<ShoppingCartSharpIcon></ShoppingCartSharpIcon>
					{!cartOpen && <div>{productsLength}</div>}
				</button>
				{cartOpen && (
					<div
						style={{
							position: "absolute",
							right: "0",
							top: "80px",
							backgroundColor: "black",
							zIndex: "1000",
							width: "100vw",
							height: "100vh",
							overflow: "hidden",
						}}
					>
						<Card css={{ height: "100vh" }}>
							<Card.Header>
								<Text h3>Tu carrito</Text>
							</Card.Header>
							<Row>
								<Col>
									{cartItems.length === 0 ? (
										<Text h2>Tu carrito esta vacio</Text>
									) : (
										<div>
											{cartItems.map((item) => (
												<Row
													width="80vw"
													shadow
													css={{
														padding: "20px",
														boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.35)",
													}}
												>
													<Col>
														<Row justify="start" align="center">
															<Text>
																{item.name} * {item.price}{" "}({item.amount})
															</Text>
                                                            
															<button
																style={{
																	border: "none",
																	backgroundColor: "transparent",
                                                                    marginLeft: "20px"
																}}
																onClick={() => editItemToCart(item)}
															>
																<RemoveCircleOutlineSharpIcon
																	sx={{ color: red[500] }}
																/>
															</button>
															<button
																style={{
																	border: "none",
																	backgroundColor: "transparent",
                                                                    marginLeft: "20px"
																}}
																onClick={() => addItemToCart(item)}
															>
																{" "}
																<AddCircleRoundedIcon color="action" />
															</button>
														</Row>
													</Col>
													<Col align="end">${item.price * item.amount}</Col>
												</Row>
											))}
										</div>
									)}
								</Col>
							</Row>
							<Divider color={"white"} />
							<Row
								css={{
									padding: "20px",
									boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.35)",
								}}
							>
								<Col></Col>
								<Col align="end">Total: ${total}</Col>
							</Row>
							<Row justify="center" css={{ padding: "20px" }}>
								<Button css={{ backgroundColor: "grey" }}>Pagar</Button>
							</Row>
						</Card>
					</div>
				)}
			</div>
		</>
	);
};
