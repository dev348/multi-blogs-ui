import React, { useState } from 'react';
import axios from 'axios'; // Import Axios



function BlogPostForm({ load, setLoad }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    language: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://multibogs.onrender.com/api/blogs', formData);

      if (response.status === 201) {
        console.log('Blog post created successfully:', response.data);

        setFormData({
          title: '',
          content: '',
          author: '',
          language: '',
        });
        setLoad(!load)

      } else {
        console.error('Blog post creation failed:', response.data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    // Add more languages as needed
  ];

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="title" className="form-label">
              Title
            </label>
          </div>
          <div className="col-md-10">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-2">
            <label htmlFor="author" className="form-label">
              Author
            </label>
          </div>
          <div className="col-md-10">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            rows={9}
            className="form-control"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language
          </label>
          <select
            className="form-select"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a language
            </option>
            {languageOptions.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form >
    </div >
  );
}

export default BlogPostForm;
