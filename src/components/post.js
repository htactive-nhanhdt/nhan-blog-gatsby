import React from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { Link } from 'gatsby'

const PostPreview = ({ hit }) => {
  return (
    <Link to={`/${hit.slug.current}`} key={hit.slug.current}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 6em'
        }}
      >
        <Highlight
          attribute='title'
          hit={hit}
          // Optional parameters
          tagName='mark'
        >
          <h2>{hit.title}</h2>
        </Highlight>
        <Highlight
          attribute='description'
          hit={hit}
          // Optional parameters
          tagName='mark'
        >
          <div style={{ textAlign: 'center' }}>
            <p>{hit.description}</p>
          </div>
        </Highlight>
      </div>
    </Link>
  )
}
export default PostPreview
