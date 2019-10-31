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
        overlayDrafts: true,
        watchMode: true,       
        // a token with read permissions is required
        // if you have a private dataset
        token: "ski4UsyHIZ4TakvHCs4XV6z2F64qdbZrVLgZrBT6bTKdKPbFq30i9OPWhsNXuzvpIN96OoX2ceFr0wZUIew9rzAgK0qKRHjH1ihKCMi3g47vsQmfbCNCZ14KIq98GCL0KcIhdWy4K7Gsjuh347lakA3TDkCHka53DShlmT6jSkE0K3higiZ2",
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
