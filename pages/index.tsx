import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const posts = [
  {title: 'React Testing', excerpt: 'Learn React Testing'},
  {title: 'React with tailwind', excerpt: 'Learn React with tailwind Testing'},
]

const Home: NextPage = () => {
  return (
    <div className="conatiner mx-auto px-10 mb-8">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {posts.map((post,index) => (
          <div>
            {post.title}
            {post.excerpt}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
