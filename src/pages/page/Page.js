import React from "react";
import { Link, useParams } from "react-router-dom";
import "./page.scss";

function Page({ pages }) {
	const { slug } = useParams();
	const page = pages.find((page) => page.slug === slug);
	const title = page.meta.title;
	document.title = title;

	return (
		<div className="container">
			<h1>{page.name}</h1>
			{page.pageContent.map((content) => (
				<div key={content.id} className="cms-page-content">
					<div className="container--image">
						<div
							className="image-bg"
							style={{
								backgroundImage: `url(${content.image.url})`,
								backgroundPosition: "center",
							}}
						></div>
					</div>
					<div className="container--text">
						<div className="container--text--heading">
							<h2>{content.heading}</h2>
							<h3>{content.subHeading}</h3>
						</div>
						<p>{content.bodyText}</p>
					</div>
				</div>
			))}
			<div className="btn-container">
				<Link to={"/dashboard/signup"} className="btn btn--primary">
					Start selling
				</Link>
			</div>
		</div>
	);
}

export default Page;
