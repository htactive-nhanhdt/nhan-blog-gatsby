require("gatsby-image")
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const blogQuery = `
  {
    allSanityProject {
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
                src
              }
              url
            }
          }
        }
      }
    }
  }
`
const queries = [
  {
    query: blogQuery,
    transformer: ({data})=> data.allSanityProject.edges.map(({node})=> node) 
  }  
];


module.exports = {
  siteMetadata: {
    title: `Nhan Blog`,
    description: `blog is awesome`,
    author: `nhan`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '2j10zfdg',
        dataset: 'production',       
        // a token with read permissions is required
        // if you have a private dataset
     
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
