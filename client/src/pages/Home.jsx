import React, { useEffect, useState, useRef } from 'react';
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import data from '../../../server/api/get/posts/posts.json';
import Arrow from "../components/Arrow";
import { Fade, Slide } from "react-awesome-reveal";
import { useSearchContext } from "../context/SearchContext";

const Home = () => {
  const { searchTerm } = useSearchContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [showDropdown, setShowDropdown] = useState({ category: false, order: false });
  const [rotation, setRotation] = useState({ category: false, order: false });
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentOrder, setCurrentOrder] = useState('Newest');
  const dropdownRef = useRef(null);

  useEffect(() => {
    setPosts(data);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown({ category: false, order: false });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterAndSortPosts = () => {
    return posts
      .filter(post =>
        (currentCategory === 'All' || post.category === currentCategory) &&
        [post.title, post.content, post.author].some(field =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => 
        currentOrder === 'Newest' ? 
        new Date(b.publishedDate) - new Date(a.publishedDate) : 
        new Date(a.publishedDate) - new Date(b.publishedDate)
      );
  };

  const currentPosts = filterAndSortPosts().slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const toggleDropdown = (type) => {
    setShowDropdown(prev => ({
      category: type === 'category' ? !prev.category : false,
      order: type === 'order' ? !prev.order : false
    }));
    setRotation(prev => ({
      category: type === 'category' ? !prev.category : false,
      order: type === 'order' ? !prev.order : false
    }));
  };

  const handleSelect = (type, value) => {
    if (type === 'category') {
      setCurrentCategory(value);
    } else {
      setCurrentOrder(value);
    }
    setShowDropdown({ category: false, order: false });
    setRotation({ category: false, order: false });
  };

  const dropdownItems = {
    category: ['All', 'Category 1', 'Category 2', 'Category 3'],
    order: ['Newest', 'Oldest', 'Most Popular']
  };

  const getGreetings = () => {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? "Good Morning!👋" : 
           currentHour < 17 ? "Good Afternoon 🌇" : "Good Evening 🌆";
  };

  return (
    <div className='home'>
      <Fade triggerOnce duration={1500}>
        <Slide triggerOnce duration={900}>
          <div className='home-greetings'>
            <p>{getGreetings()}</p>
            <h1>Posts-Worthy Reads</h1>
            <i>Stories to Inspire Your Thoughts</i>
          </div>
        </Slide>
      </Fade>
      <div className='home-category'>
        {['category', 'order'].map(type => (
          <div className='dropdown' key={type} ref={type === 'category' ? dropdownRef : null}>
            <Arrow
              text={type === 'category' ? currentCategory : currentOrder}
              onClick={() => toggleDropdown(type)}
              isRotated={rotation[type]}
            />
            <div className={`dropdown-menu ${showDropdown[type] ? 'show' : ''}`}>
              {dropdownItems[type]
                .filter(item => item !== (type === 'category' ? currentCategory : currentOrder))
                .map((item, index) => (
                  <div key={index} onClick={() => handleSelect(type, item)} className="dropdown-item">
                    {item}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className='posts'>
        <Fade triggerOnce duration={700}>
          {currentPosts.map(data => (
            <Post
              key={data.id}
              image={data.image}
              title={data.title}
              content={data.content}
              author={data.author}
              date={data.editedDate || data.publishedDate}
              category={data.category}
              loading={loading}
            />
          ))}
        </Fade>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        length={filterAndSortPosts().length}
        handlePagination={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
