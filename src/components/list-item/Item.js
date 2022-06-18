import { React, useEffect, useState } from "react";
import Heart from "../../assets/heart.svg";
import { ReactSVG } from "react-svg";
import "./item.scss";
import { Link } from "react-router-dom";

const Item = (props) => {
	const [liked, setLiked] = useState(false);
	const [isActive, setIsActive] = useState(null);
	let favourites = JSON.parse(localStorage.getItem("wrinkle-favourites"));

	function handleLike() {
		favourites = JSON.parse(localStorage.getItem("wrinkle-favourites"));
		const product = {
			id: props.details.product_id,
			name: props.details.product_headline,
			price: props.details.product_price,
		};
		if (!liked) {
			favourites.push(product);
		} else if (liked) {
			favourites = favourites.filter((item) => item.id !== product.id);
		}
		localStorage.setItem("wrinkle-favourites", JSON.stringify(favourites));
		setLiked((prev) => !prev);
	}

	useEffect(() => {
		if (!localStorage.getItem("wrinkle-favourites")) {
			localStorage.setItem("wrinkle-favourites", "[]");
		}
		favourites = JSON.parse(localStorage.getItem("wrinkle-favourites"));

		if (
			favourites.filter((item) => item.id === props.details.product_id).length >
			0
		) {
			setLiked(true);
		}
		if (props.status) {
			setIsActive(props.status);
		}
	}, []);

	if (!props.details) return <h2>Loading</h2>;

	return (
		<div className="Item" data-testid="item">
			<div
				className={
					!isActive
						? "image-container"
						: "image-container image-container--inactive"
				}
			>
				<Link
					to={
						!props.lead
							? `/shop/product/single-product/${props.details.product_id}`
							: `/dashboard//items/view/single-item/${props.details.product_id}`
					}
				>
					<div
						className="item-image"
						style={{
							backgroundImage: `url(${props.details.image_name})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
					></div>
				</Link>
				<button
					onClick={handleLike}
					className={liked ? "item-heart-liked" : "item-heart"}
					data-testid="btn"
				>
					<ReactSVG src={Heart} />
				</button>
			</div>
			<div className="item-details">
				<h4>
					<Link
						to={
							!props.lead
								? `/shop/product/single-product/${props.details.product_id}`
								: `/dashboard//items/view/single-item/${props.details.product_id}`
						}
					>
						{props.details.product_headline}
					</Link>
				</h4>
				<p className="price">
					kr. {props.details.product_price}
					<span className="status"> {props.status}</span>
				</p>
			</div>
		</div>
	);
};

export default Item;
