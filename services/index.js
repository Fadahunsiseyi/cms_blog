import { graphql } from 'graphql'
import {request, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql `
    query MyQuery {
        postsConnection {
            edges {
              node {
                author {
                  bio
                  name
                  id
                  photo {
                    url
                  }
                }
                updatedAt
                slug
                title
                excerpt
                featureImage {
                  url
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
    }
    `
    const results = await request(graphqlAPI,query)
    return results.postsConnection.edges;
}