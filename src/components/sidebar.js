import React from 'react'
import { Link } from 'gatsby'

const SideBar = ({ tags }) => {
  const arrTags = Array.from(new Set([...tags].map((item)=> item.tag)));
  return (
    <aside>
      <div className='tags' style={{padding:"0.5rem"}}>
        <h2>Tags</h2>
        <div style={{ display: 'flex', alignItems: 'space-between' }}>
          {arrTags.map((tag, index) => (
            <Link to={`/tag/${tag}/`} key={index}>
              <span style={{ marginRight: '.5rem' }}>{tag}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
export default SideBar
