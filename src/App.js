import React, { useState } from 'react';

import './App.css';
import Header from './header/Header';
import BlogList from './blogList/BlogList';

function App() {
  const [load,setLoad] = useState(true)

  return (
    <div className="App">
      <Header setLoad={setLoad} load={load}/>
      <main>
        <BlogList load={load}/>
      </main>
    </div>
  );
}

export default App;
