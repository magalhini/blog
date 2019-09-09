import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Section from '../components/section';

const SYSTEM_FONT = `-apple-system, BlinkMacSystemFont, Avenir, 'Avenir Next', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;

function BookCase() {
	const [ books, setBooks ] = useState([]);

	useEffect(() => {
		const getBooks = async () => {
			// const data = await fetch('https://currently-reads.now.sh/reading/26866736/');
			const data = await axios.get('/reading/26866736/json');
			setBooks(data.data);
		};

		getBooks();
	}, []);

	if (!books.length) return null;

	function renderBook(book) {
		console.log(book);
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '33%'
				}}
			>
				<h4 className="text-sc">{book.book[0].authors[0].author[0].name}</h4>
				<img
					style={{
						border: '3px solid rgba(0,0,0,.1)'
					}}
					src={book.book[0].image_url[0]}
				/>
				<span
					style={{
						textAlign: 'center',
						fontFamily: SYSTEM_FONT
					}}
				>
					{book.book[0].title[0]}
				</span>
			</div>
		);
	}

	return <div>{books.map((book) => renderBook(book))}</div>;
}

const NotFoundPage = () => (
	<Layout>
		<SEO title="Ricardo Magalhães About" />
		<Section centered>
			<BookCase />
			<header>
				<h1>
					<Link to="/">«</Link> About
				</h1>
				<p>
					<span className="text-sc">Current location:</span> <span>Montreal, Canada 🇨🇦</span>
				</p>
				<p>
					I'm a Front-end developer who splashes and dashes some design work as I go along. I deeply enjoy
					pairing several disciplines in my work: writing, typography and photography are inseperable from my
					daily life and fitting them into my workflow is a bliss. Traveling around the globe keeps me on my
					toes, as well as writing about its experiences. Collecting LEGO sets may or may not be something I
					do a little bit too much. Peace is restored when running, rock-climbing, or picking something from
					the
				</p>
				<p>Currently working as a Front-end Developer for Shopify, in snowy Montreal.</p>
			</header>
		</Section>
	</Layout>
);

export default NotFoundPage;
