import React, {useState} from 'react'

const BlogForm = ({onCreate}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = () => {
    onCreate({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h1>Create</h1>
      Title: <input type='text' value={title} onChange={({target}) => setTitle(target.value)} /><br/>
      Author: <input type='text' value={author} onChange={({target}) => setAuthor(target.value)} /><br/>
      Url: <input type='text' value={url} onChange={({target}) => setUrl(target.value)} /><br/>
      <button onClick={handleAddBlog}>Create</button>
    </div>
  )
}

export default BlogForm