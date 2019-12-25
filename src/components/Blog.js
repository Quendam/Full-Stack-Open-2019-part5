import React, {useState} from 'react'
const Blog = ({ blog, onLike }) => {
  const [open, setOpen] = useState(false)
  
  const detailsOpen = {display: open ? '' : 'none'}
  const toggleOpen = () => setOpen(!open)
  const handleLikePress = () => {
    onLike(blog)
  }
  
  return(
    <div className='blog-entry'>
      <div onClick={toggleOpen} className='title'> 
        {blog.title} {blog.author}
      </div>
      <div style={detailsOpen} className='details'>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes <button onClick={handleLikePress}>like</button>
      </div>
    </div>
  )
}

export default Blog