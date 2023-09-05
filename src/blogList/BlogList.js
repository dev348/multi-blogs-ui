import React, { useState, useEffect } from 'react';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      // Fetch data from the API
      fetch('https://multibogs.onrender.com/api/blogs')
        .then((response) => response.json())
        .then((data) => {
          // Update the state with the fetched data
          setBlogs(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
      <section className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
          </div>
        ))}
      </section>
    );
  }
  
  export default BlogList;
  