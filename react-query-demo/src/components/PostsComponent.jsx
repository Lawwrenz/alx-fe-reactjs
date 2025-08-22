// src/components/PostsComponent.jsx
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// API fetch function
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const [showPosts, setShowPosts] = useState(true);

  // Use React Query to fetch posts
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: showPosts,
  });

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="posts-container">
        <div className="error">Error: {error.message}</div>
        <button onClick={refetch} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="controls">
        <button onClick={togglePosts} className="toggle-btn">
          {showPosts ? 'Hide Posts' : 'Show Posts'}
        </button>
        <button onClick={refetch} className="refetch-btn" disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {showPosts && (
        <>
          <div className="cache-info">
            {isFetching ? 'Updating...' : 'Data is cached and ready!'}
          </div>
          
          <div className="posts-list">
            <h2>Posts ({data?.length || 0})</h2>
            {data?.slice(0, 10).map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="post-meta">Post ID: {post.id} | User ID: {post.userId}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostsComponent;