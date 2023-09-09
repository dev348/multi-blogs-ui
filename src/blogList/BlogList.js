import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios'; 
import './blogList.css';



// const projectId = 'muiltblogs';
// const targetLanguage = 'en';

function BlogList({ load }) {
  const [blogs, setBlogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [blogLen, setBlogLen] = useState(0);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 10;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [translatedContent, setTranslatedContent] = useState('');
  const [translateInitialized, setTranslateInitialized] = useState(false);

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

    if (!translateInitialized && selectedBlog) {
      setTranslateInitialized(true);
    }

  }, [load,selectedBlog, translateInitialized]);

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
     setTranslatedContent(''); 
  };


  const handleTranslate = (blog, selectedLanguage) => {
    if (translateInitialized && selectedLanguage) {
      const apiKey = 'AIzaSyDiNU3UIY-JRABaDYMMQIdt0SDzXAgdakM';
      const translateRequest = {
        q: [blog.title, blog.content, blog.author, blog.excerpt],
        target: selectedLanguage,
      };

      axios
        .post(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, translateRequest)
        .then((response) => {
          if (response && response.data && response.data.data && response.data.data.translations) {
            const translations = response.data.data.translations;
            const translatedTitle = translations[0].translatedText;
            const translatedContent = translations[1].translatedText;
            const translatedAuthor = translations[2].translatedText;
            const translatedExcerpt = translations[3].translatedText;

            setTranslatedContent(translatedContent);
            setSelectedBlog({
              ...selectedBlog,
              title: translatedTitle,
              author: translatedAuthor,
              excerpt: translatedExcerpt,
            });
          } else {
            console.error('Translation error:', response);
          }
        })
        .catch((error) => {
          console.error('Translation error-1:', error);
        });
    }
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
          <div className='mb-4'>
          <select id="languageSelect"
          onChange={(e) => {
            const selectedLanguage = e.target.value;
            if (selectedLanguage === selectedBlog.language) {
              setTranslatedContent(''); 
            } else {
              handleTranslate(selectedBlog, selectedLanguage); // Translate to the selected language
            }
          }}>
          <option value={selectedBlog.language}>Default Language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="id">Indonesian</option>
          <option value="it">Japanese</option>
          <option value="ko">Korean</option>
          <option value="pt">Portuguese </option>
          <option value="ru">Russian </option>
          <option value="es">Spanish  </option>
          <option value="ua">Ukrainian </option>
          <option value="zh">Chinese  </option>
          </select>
</div>

          
          <h1>{selectedBlog.title}</h1>
          <p>{translatedContent || selectedBlog.content}</p>
          <p><b>Author:</b> {selectedBlog.author}</p>
        </div>
      ) : blogs.length === 0 ? (
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
