import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";

export default function Home() {
	useEffect(() => {
		fetch("api/products")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	});

	return (
		<div className={styles.container}>
			<Card />
		</div>
	);
}
