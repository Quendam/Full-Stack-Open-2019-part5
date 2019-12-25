import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false)
  
  const detailsOpen = {display: open ? '' : 'none'}
  const toggleOpen = () => setOpen(!open)

  return(
    <div className='blog-entry'>
      <div onClick={toggleOpen} className='title'> 
        {blog.title} {blog.author}
      </div>
      <div style={detailsOpen} className='details'>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes <button>like</button>
      </div>
    </div>
  )
}

export default Blog