import styles from "./Card.module.scss";
import { Card, Row, Text } from "@nextui-org/react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CartContext from "../../Context/CartContext";
import { useContext } from "react";


export default function UiCard({ products }) {
	const { addItemToCart } = useContext(CartContext);

	return (
		// <div className={styles.container}>algos</div>;
		<Card shadow css={{ width: "350px", height: "400px" }}>
			<Card.Image
				src={products.image}
				objectFit="cover"
				width="100%"
				height="240px"
				alt={products.name}
			/>
			<Card.Body height="100px" css={{ overflow: "hidden" }}>
				<Text h4>{products.name}</Text>
				<Text>{products.description}</Text>
			</Card.Body>
			<Card.Divider />
			<Card.Footer height="60px">
				<Row justify="space-between" align="center">
					<Text css={{ marginRight: "10px" }}>${products.price}</Text>
					<button
						className={styles.button}
						onClick={() => addItemToCart(products)}
					>
						<AddCircleRoundedIcon color="action"/>
					</button>
				</Row>
			</Card.Footer>
		</Card>
	);
}
