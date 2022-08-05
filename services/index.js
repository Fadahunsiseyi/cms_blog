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

export const GetPostDetails = async (slug) => {
  const query = gql `
  query GetPostDetails($slug: String!) {
    post(where: {slug: $slug}) {
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
              content {
                raw
              }
        }
  }
  `
  const results = await request(graphqlAPI,query,{slug})
  return results.post
}

export const getRecentPosts = async () => {
    const query = gql`
    query GetPostDetails() {
        posts(
            orderBy: createdAt_ASC
            last: 3
            ) {
                title
                featureImage {
                    url
                }
                createdAt
                slug
            }
    }
    `
    const results = await request(graphqlAPI,query)
    return results.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql `
    query GetPostDetails($slug: String!, $categories: [String]) {
        posts (
            where: {slug_not: $slug AND: {categories_some: {slug_in: $categories}}}
            last: 3
        ){
            title
            featureImage {
                url
            }
            createdAt
            slug
        }
    }
    `
    const results = await request(graphqlAPI,query, {categories,slug})
    return results.posts;
}

export const getCategories = async () => {
  const query = gql `
  query GetCategories {
    categories {
      name
      slug
    }
  }
  `
  const results = await request(graphqlAPI,query)
  return results.categories;
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(obj),
  })
  result.json()
}