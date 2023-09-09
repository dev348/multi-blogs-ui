import React from 'react';
import './header.css';
import BlogAddForm from '../forms/BlogPostForm';

function Header({ setLoad, load }) {
  return (
    <header>
      <h1 className='title'>MultiBlog</h1>

      <>
        <section className="head-section">
          <button type="button" className="btn bg-default" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Add Blog
          </button>
          <>
            {/* <select id="languageSelect">
              <option value="en">English</option>
              <option value="fr">French</option>
            </select> */}
          </>
        </section>


        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Create a New Blog Post</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <BlogAddForm load={load} setLoad={setLoad} />
              </div>

            </div>
          </div>
        </div>
      </>

    </header>
  );
}

export default Header;
