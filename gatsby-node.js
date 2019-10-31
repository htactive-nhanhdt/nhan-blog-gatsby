/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path= require("path");

exports.createPages = async ({actions, graphql}) => {
    const result = await graphql(`   
   { 
        allSanityProject {
            edges {
            node {
                tag
                slug {
                    current
                }       
            }
            }
        }
    }
    `)    

    const projects = result.data.allSanityProject.edges.map(({node})=> node);   
    
    projects.forEach(project => {        
        actions.createPage({
            path: project.slug.current,
            component: path.resolve("./src/templates/project.js"),
            context: {
                slug: project.slug.current,
                projects: projects.map(item=> item.slug.current)
            }
        }),
        actions.createPage({
            path: `/tag/${project.tag}`,
            component: path.resolve("./src/templates/tagProject.js"),
            context: {
                tag: project.tag
            }
        })        
    }) 
}