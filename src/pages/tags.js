import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Section from '../components/section'

const SYSTEM_FONT = `-apple-system, BlinkMacSystemFont, Avenir, 'Avenir Next', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`

function BookCase() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const data = await axios.get('/reading/26866736/json')
      setBooks(data.data)
    }

    getBooks()
  }, [])

  if (!books.length) return null

  function renderBook(book) {
    return (
      <div
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          textAlign: 'center',
        }}
      >
        <h4 className="text-sc">{book.book[0].authors[0].author[0].name}</h4>
        <img
          alt="Book cover"
          style={{
            border: '3px solid rgba(0,0,0,.1)',
          }}
          src={book.book[0].image_url[0]}
        />
        <span
          style={{
            fontSize: '1.1rem',
            fontFamily: SYSTEM_FONT,
          }}
        >
          {book.book[0].title[0]}
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {books.map(book => renderBook(book))}
    </div>
  )
}

const AboutPage = () => (
  <Layout>
    <SEO title="Ricardo Magalhães About" />
    <Section centered>
      <header>
        <Link to="/">«</Link> Back
        <h1 className="mainHeader">
          Hi! I'm Ricardo, a front-end web developer based in Montreal
        </h1>
        <p>
          I'm a Front-end developer who splashes and dashes some design work as
          I go along. I deeply enjoy pairing several disciplines in my work:
          writing, typography and photography are inseperable from my daily life
          and fitting them into my workflow is a bliss. Traveling around the
          globe keeps me on my toes, as well as writing about its experiences.
          Collecting LEGO sets may or may not be something I do a little bit too
          much. Peace is restored when running, rock-climbing, or picking
          something from the
        </p>
        <p>
          Currently working as a Front-end Developer for Shopify, in snowy
          Montreal.
        </p>
        <div>
          <span className="text-sc">Current location:</span>{' '}
          <span
            style={{
              fontFamily: SYSTEM_FONT,
              fontSize: '1.1rem',
            }}
          >
            Montreal, Canada
          </span>
        </div>
        <div>
          <span className="text-sc">Previously:</span>{' '}
          <span
            style={{
              fontFamily: SYSTEM_FONT,
              fontSize: '1.1rem',
            }}
          >
            Berlin, Germany
          </span>
        </div>
      </header>
    </Section>
    <Section>
      <h3>Books I'm currently reading:</h3>
      <BookCase />
    </Section>
  </Layout>
)

export default AboutPage
