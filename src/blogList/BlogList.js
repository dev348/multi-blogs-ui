import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import './blogList.css';

function BlogList({load}) {
  const [blogs, setBlogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const [loading, setLoading] = useState(true); // State for loading
  const blogsPerPage = 10; // Number of blogs to show per page


  useEffect(() => {
    // Simulate an API fetch delay for demonstration purposes
    setLoading(true);
    setTimeout(() => {
      // Fetch data from the API
      fetch('https://multibogs.onrender.com/api/blogs')
        .then((response) => response.json())
        .then((data) => {
          // Update the state with the fetched data and set loading to false
          setBlogs(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, 2000); // Simulated delay of 2 seconds
  }, [load]);

  const pageCount = Math.ceil(blogs.length / blogsPerPage); // Calculate the total number of pages

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedBlogs = blogs.slice(
    pageNumber * blogsPerPage,
    (pageNumber + 1) * blogsPerPage
  );

  return (
    <section className="blog-list">
      {loading ? (
        // Show loader while fetching data
        <div className="loader"></div>
      ) : (
        <div className="grid-container">
          {displayedBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h2 className='blogTitle'>{blog.title}</h2>
              <p>{blog.excerpt}</p>
            </div>
          ))}
        </div>
      )}

      <div className="paginate">
        {!loading && (
          <ReactPaginate
            previousLabel="<< Previous "
            nextLabel="Next >> "
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </div>

      {/* Pagination component at the bottom */}
    </section>
  );
}

export default BlogList;
