import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'


const PostWidgets = ({categories,slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([])
  useEffect(() => {
   if(slug) {
    getSimilarPosts(categories, slug)
    .then((result) => setRelatedPosts( result))
   } else {
    getRecentPosts()
    .then((result) => setRelatedPosts( result))
   }
  }, [slug])
  console.log(relatedPosts);
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
    </div>
  )
}

export default PostWidgets