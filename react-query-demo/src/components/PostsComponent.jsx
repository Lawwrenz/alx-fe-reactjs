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
  const [postPage, setPostPage] = useState(1);

  // Use React Query to fetch posts with advanced options
  const { data, error, isLoading, isError, refetch, isFetching, isPreviousData } = useQuery({
    queryKey: ['posts', postPage], // Include page in query key for pagination
    queryFn: fetchPosts,
    enabled: showPosts,
    
    // Advanced configuration options
    cacheTime: 10 * 60 * 1000, // 10 minutes - how long to keep unused data in cache
    staleTime: 5 * 60 * 1000, // 5 minutes - how long data is considered fresh
    
    // Automatically refetch when window gains focus
    refetchOnWindowFocus: true,
    
    // Keep previous data while fetching new data (for smooth pagination)
    keepPreviousData: true,
    
    // Optional: Retry failed requests 3 times
    retry: 3,
    // Optional: Retry delay increases with each retry
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  const nextPage = () => {
    if (!isPreviousData) {
      setPostPage(old => old + 1);
    }
  };

  const prevPage = () => {
    setPostPage(old => Math.max(old - 1, 1));
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
        
        {/* Pagination controls */}
        <div className="pagination">
          <button onClick={prevPage} disabled={postPage === 1}>
            Previous Page
          </button>
          <span className="page-info">Page {postPage}</span>
          <button onClick={nextPage} disabled={isPreviousData || !data?.length}>
            Next Page
          </button>
        </div>
      </div>

      {showPosts && (
        <>
          <div className="cache-info">
            {isFetching ? 'Updating data...' : 'Data is fresh from cache!'}
            <br />
            <small>
              Stale Time: 5min | Cache Time: 10min | Window Focus Refetch: Enabled
            </small>
          </div>
          
          <div className="query-status">
            {isFetching && <span className="fetching">🔄 Fetching new data...</span>}
            {isPreviousData && <span className="previous-data">📋 Showing previous data while loading...</span>}
          </div>
          
          <div className="posts-list">
            <h2>Posts ({data?.length || 0}) - Page {postPage}</h2>
            {data?.slice(0, 10).map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="post-meta">Post ID: {post.id} | User ID: {post.userId}</div>
              </div>
            ))}
          </div>

          <div className="features-demo">
            <h3>✨ React Query Features Demo:</h3>
            <ul>
              <li><strong>cacheTime (10min):</strong> Data stays in cache even after component unmounts</li>
              <li><strong>staleTime (5min):</strong> Data is considered fresh for 5 minutes before refetching</li>
              <li><strong>refetchOnWindowFocus:</strong> Try clicking away and back to the browser tab!</li>
              <li><strong>keepPreviousData:</strong> Notice how old data stays during pagination loading</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PostsComponent;