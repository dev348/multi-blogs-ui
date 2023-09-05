import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Header from './header/Header';
import BlogList from './blogList/BlogList';
import BlogDetail from './blogdetail/BlogDetail';
import BlogAddForm from './forms/BlogPostForm';

function AppRoutes() {
  return (
    <Routes>
    <Route path="/" element={<BlogList />} />
    <Route path="/blog/:id" element={<BlogDetail />} />
    <Route path="/add-blog" element={<BlogAddForm />} />
  </Routes>
  );
}

export default AppRoutes;
