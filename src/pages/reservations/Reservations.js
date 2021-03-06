import { useState, useEffect, React } from "react";
import Item from "../../components/list-item/Item";
import axios from "../../api/axios";
import { ReactSVG } from "react-svg";
import BurgerClose from "../../assets/icons/cross-cancel.svg";
import "./reservations.scss";

function Reservations() {
	// const [deleted, setDeleted] = useState(false);
	const [email, setEmail] = useState("");
	const [popup, setPopup] = useState(false);
	const [itemList, setItemsList] = useState();
	let reservations = JSON.parse(localStorage.getItem("wrinkle-favourites"));
	let items = [];

	// let reservation_id;

	useEffect(() => {
		if (!localStorage.getItem("wrinkle-cart")) {
			localStorage.setItem("wrinkle-cart", "[]");
		}
		reservations = JSON.parse(localStorage.getItem("wrinkle-cart"));

		if (reservations.length > 0) {
			try {
				axios.get("/products/saved/cart").then((res) => {
					if (res.data[0].product_id) {
						items = res.data.filter((product) => {
							return reservations.find((item) => {
								return product.product_id === item.id;
							});
						});
					}
					setItemsList(items);
				});
				setItemsList(items);
			} catch (error) {
				setItemsList(false);
				console.log(error.message);
			}
		}
	}, []);

	const openPopup = () => {
		setPopup((prev) => !prev);
	};

	const handleReserve = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get("/products/saved/cart/get-id");
			console.log(response.data);
			// reservation_id = response.data;
			let itemsArray = [];
			itemList.map((item) => {
				itemsArray.push(item.product_id);
			});
			if (response.data) {
				const res = await axios.post(
					"/products/saved/cart/reserve",
					{
						items: itemsArray,
						reservation_id: response.data,
						user_email: email,
					},
					{}
				);
				console.log(res.data);
				if (res.data) {
					localStorage.setItem("wrinkle-cart", "[]");
					setItemsList(false);
					openPopup();
				}
			}
		} catch (error) {
			setItemsList(false);
			console.log(error.message);
		}
	};

	return (
		<div className="reservations">
			<h1>Reservations</h1>
			<div className="item-list-container">
				<div className="item-list">
					{!itemList ? (
						<p>No items in the bag</p>
					) : (
						itemList.map((item) => {
							return <Item key={"item" + item.product_id} details={item} />;
						})
					)}
				</div>
				<hr />
			</div>
			<div>
				<div>
					<h2>Reservation information</h2>
					<p>
						By submitting your reservation below, you agree to visit our store
						within 24 hours to try on and pay for your items if you like them.
						After this time your items will be unavailable for collection and
						available to others for reservation.
					</p>
				</div>
				<div className="container--buy--desktop">
					<div className="button">
						<button className="btn btn--primary" onClick={openPopup}>
							Reserve Bag
						</button>
					</div>
				</div>
			</div>
			<section className="container--buy">
				<div className="buy">
					<div className="name-price">
						<h2>Click to confirm your reservation</h2>
					</div>
					<div className="button">
						<button className="btn btn--primary" onClick={openPopup}>
							Reserve Bag
						</button>
					</div>
				</div>
			</section>
			{popup && (
				<div className="popup">
					<div className="popup-window">
						<button onClick={openPopup} className="popup-close">
							<ReactSVG src={BurgerClose} />
						</button>
						<form>
							<div className="field">
								<label htmlFor={"email"}>Email</label>
								<input
									id="email"
									name="pass"
									type={"email"}
									required
									placeholder="example@example.com"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								></input>
							</div>{" "}
							<div className="button">
								<button className="btn btn--primary" onClick={handleReserve}>
									Reserve Bag
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Reservations;
