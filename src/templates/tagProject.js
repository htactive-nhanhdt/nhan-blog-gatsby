import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/layout'

export const query = graphql`
  query($tag: String) {
    allSanityProject(filter: { tag: { eq: $tag } }) {
      edges {
        node {
          tag
          slug {
            current
          }
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
export default ({ data }) => (
  <Layout>
    <div
      style={{
        width: '60%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'space-between'
      }}
    >
      {data.allSanityProject.edges.map(({ node }) => (
        <Link
          to={`/${node.slug.current}`}
          key={node.tag}
          style={{ width: '50%', marginRight: '0.5rem' }}
        >
          <h2 style={{ minHeight: '2.2em' }}>{node.title}</h2>
          <Image fluid={node.image.asset.fluid} alt={node.title} />
          <p>{node.description}</p>
        </Link>
      ))}
    </div>
  </Layout>
)
