import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{post.title.rendered}</h3>
    <p dangerouslySetInnerHTML={{__html: post.content.rendered}} />
  </div>
))
