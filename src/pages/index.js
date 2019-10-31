import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

export const query = graphql`
  query {
    allSanityProject {
      edges {
        node {
          slug {
            current
          }
          tag
          title
          description
          image {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`
const IndexPage = ({ data }) => (
  <Layout>
    <SEO title='Home' />
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        alignItems: 'space-between'
      }}
    >
      {data.allSanityProject.edges.map(({ node: project }) => (
        <li
          key={project.slug.current}
          style={{
            flex: '1 45%',
            maxWidth: '45%',
            margin: '5px'
          }}
        >
          <Link to={`/${project.slug.current}`}>
            <h2 style={{ minHeight: '2.2em' }}>{project.title}</h2>
            <div style={{ minHeight: '200px' }}>
              <Image fluid={project.image.asset.fluid} alt={project.title} />
            </div>
            <p>{project.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage
