import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import './blogList.css';

function BlogList({ load }) {
  const [blogs, setBlogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [blogLen, setBlogLen] = useState(0);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 10;
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(`https://multibogs.onrender.com/api/blogs?limit=${10}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setLoading(false);
          } else {
            setBlogs(data?.blogsWithExcerpts);
            setBlogLen(data?.totalCount || 0)
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, 2000);
  }, [load]);

  const pageCount = Math.ceil(blogLen / blogsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
    fetch(`https://multibogs.onrender.com/api/blogs?page=${selected + 1}&limit=${10}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading(false);
        } else {
          setBlogs(data?.blogsWithExcerpts);
          setBlogLen(data?.totalCount || 0)
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBackClick = () => {
    setSelectedBlog(null);
  };

  return (
    <section className="blog-list">
      {loading ? (
        <div className="loader"></div>
      ) : selectedBlog ? (
        <div className="blog-details">
          <button onClick={handleBackClick} className="back-button">
            ← Back
          </button>
          <h1>{selectedBlog.title}</h1>
          <p>{selectedBlog.content}</p>
          <p><b>Author:</b> {selectedBlog.author}</p>
        </div>
      ) : blogs.length == 0 ? (
        <div className="grid-container">
          <h1>No Data Found..!</h1>
        </div>
      ) : (
        <div className="grid-container">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => handleCardClick(blog)} // Click handler to show details
            >
              <h2 className="blogTitle">{blog.title}</h2>
              <p>{blog.excerpt}</p>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="overlay"></div>
      )}

      <div className="paginate">
        {!loading && !selectedBlog && (blogLen > 0) && (
          <ReactPaginate
            previousLabel="<< Prev "
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
    </section>
  );
}

export default BlogList;
