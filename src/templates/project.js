import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/layout'

export const query = graphql`
  query($slug: String) {
    sanityProject(slug: { current: { eq: $slug } }) {
      description
      title
      slug {
        current
      }
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`

export default props => {
  const { data } = props
  const listSlug = props.pageContext.projects
  const filterList = listSlug.filter(
    item => item !== data.sanityProject.slug.current
  )
  return (
    <Layout>
      <div style={{ maxWidth: '50%', margin: '0 auto', minHeight:"70vh" }}>
        <h2>{data.sanityProject.title}</h2>
        <Image
          fluid={data.sanityProject.image.asset.fluid}
          alt={data.sanityProject.slug.current}
        />
        <p>{data.sanityProject.description}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '90%'
        }}
      >
        <Link to={`/${filterList[0]}`}>Previous</Link>
        <Link to={`/${filterList[1]}`}>Next</Link>
      </div>
    </Layout>
  )
}
