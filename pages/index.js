import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { Grid } from "@nextui-org/react";
import UiCard from "../components/UI/UiCard";
import { NavBar } from "../components/NavBar/NavBar";

export default function Home() {
	const [products, setProducts] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetch("api/products")
			.then((response) => response.json())
			.then((data) => {
				setIsLoading(true);
				setProducts(data[0]);
			});
	}, []);

	console.log(products);

	return (
		<>
			<NavBar />
			<Grid.Container gap={4} justify="center" css={{ maxWidth: "100vw" }}>
				{isLoading ? (
					products.map((product) => (
						<Grid sm={12} md={4} lg={3} xl={3} key={product.id}>
							<UiCard products={product} />
						</Grid>
					))
				) : (
					<h1>Loading...</h1>
				)}
			</Grid.Container>
		</>
	);
}
