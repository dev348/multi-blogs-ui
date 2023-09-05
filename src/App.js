import './App.css';
import Header from './header/Header';
import BlogList from './blogList/BlogList';
import BlogDetail from './blogdetail/BlogDetail';
import BlogAddForm from './forms/BlogPostForm';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
      <BlogList />
      {/* <BlogDetail/> */}
      <BlogAddForm/>
      </main>
    </div>
  );
}

export default App;
