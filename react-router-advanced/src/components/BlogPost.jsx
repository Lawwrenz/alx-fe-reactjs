import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// Mock blog posts data
const blogPosts = [
  { 
    id: 1, 
    title: 'Getting Started with React', 
    content: 'React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update and render them when data changes. In this post, we\'ll explore the basics of React and how to get started with your first React application.',
    author: 'John Doe',
    date: 'January 15, 2023'
  },
  { 
    id: 2, 
    title: 'Advanced React Patterns', 
    content: 'As you become more comfortable with React, you\'ll want to explore advanced patterns that can make your code more reusable and maintainable. This post covers patterns like render props, higher-order components, and custom hooks that can take your React skills to the next level.',
    author: 'Jane Smith',
    date: 'February 22, 2023'
  },
  { 
    id: 3, 
    title: 'State Management in 2023', 
    content: 'State management is a crucial aspect of React development. With many options available, from built-in useState and useReducer hooks to external libraries like Redux and Zustand, it\'s important to understand the trade-offs. This post explores the current state of state management in React applications.',
    author: 'Mike Johnson',
    date: 'March 10, 2023'
  },
]

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  
  useEffect(() => {
    // Simulate API call
    const foundPost = blogPosts.find(p => p.id === parseInt(id))
    setPost(foundPost)
  }, [id])
  
  if (!post) {
    return <div className="loading">Loading post...</div>
  }
  
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>By {post.author}</span> | <span>{post.date}</span>
      </div>
      <p>{post.content}</p>
      <Link to="/blog">← Back to all posts</Link>
    </div>
  )
}

export default BlogPost