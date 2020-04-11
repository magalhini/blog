// import React from 'react';
// import { Link, graphql } from 'gatsby';
// import MDXRenderer from 'gatsby-mdx/mdx-renderer';

// import SEO from '../components/seo';
// import Embed from '../components/embed';
// import { formatPostDate, formatReadingTime } from '../utils/dates';

// import './blog-post.css';

// export default function Tags({ data: { mdx, site, allMdx }, pageContext }) {
// 	const { previous, next } = pageContext;
// 	const publicUrl = `${site.siteMetadata.siteUrl}${mdx.fields.slug}`;
// 	const { edges } = allMdx;

// 	return (
// 		<div>
// 			<SEO
// 				title={mdx.frontmatter.title}
// 				description={mdx.frontmatter.description}
// 				canonicalLink={mdx.frontmatter.canonical_link}
// 				keywords={mdx.frontmatter.categories || []}
// 				meta={[
// 					{
// 						name: 'twitter:label1',
// 						content: 'Reading time'
// 					},
// 					{
// 						name: 'twitter:data1',
// 						content: `${mdx.timeToRead} min read`
// 					}
// 				]}
// 			/>
// 			<section className="center blog">
// 				{edges.map(({ node }) => {
// 					const { slug } = node.fields;
// 					const { title } = node.frontmatter;
// 					return (
// 						<li key={slug}>
// 							<Link to={slug}>{title}</Link>
// 						</li>
// 					);
// 				})}
// 			</section>
// 		</div>
// 	);
// }

// export const pageQuery = graphql`
// 	query Tags {
// 		allMdx(filter: { fields: { published: { eq: true } } }, sort: { fields: [frontmatter___date], order: DESC }) {
// 			nodes {
// 				fields {
// 					slug
// 				}
// 				frontmatter {
// 					categories
// 				}
// 			}
// 		}
// 	}
// `;
