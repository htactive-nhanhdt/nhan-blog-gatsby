/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

import PostPreview from './post'

import Header from './header'
import SideBar from './sidebar'
import './layout.css'

const searchClient = algoliasearch(
  '0FYOGINYIE',
  'a65346ed4417a79dee096917ed5ca23a'
)

const Layout = ({ children }) => {
  const [openSearchBox, handleOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allSanityProject {
        edges {
          node {
            tag
          }
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
          position: 'relative'
        }}
      >
        <InstantSearch searchClient={searchClient} indexName='blog'>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SearchBox onChange={() => handleOpen(true)} />
          </div>

          <div className='searchBox'>
            {openSearchBox && (
              <div onMouseLeave={() => handleOpen(false)}>
                <table>
                  <thead>
                    <tr>
                      <td>Title</td>
                      <td>Description</td>
                    </tr>
                  </thead>
                </table>
                <Hits
                  hitComponent={PostPreview}
                  onBlur={() => handleOpen(false)}
                />
              </div>
            )}
          </div>
        </InstantSearch>

        <main
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: '80vh'
          }}
        >
          <div className='main-content' style={{ width: '70%' }}>
            {children}
          </div>
          <div style={{ width: '30%', border: '1px solid' }}>
            <SideBar
              tags={data.allSanityProject.edges.map(({ node }) => node)}
            />
          </div>
        </main>
        <footer style={{ marginTop: '4em' }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
