import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Storypage.css';

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('https://mxpertztestapi.onrender.com/api/sciencefiction');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setStories(data);
        setFilteredStories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredStories(stories);
    } else {
      const filtered = stories.filter(
        (story) => story.Status?.toLowerCase() === activeFilter
      );
      setFilteredStories(filtered);
    }
    setCurrentPage(0); 
  }, [activeFilter, stories]);

  const handleFilter = (status) => {
    setActiveFilter(status);
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedStories = filteredStories.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < filteredStories.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <div className="loading">Loading stories...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <h1 className="title">Science Fiction Stories</h1>

        <div className="filters">
          <button
            className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`}
            style={{ backgroundColor: '#007bff', color: 'white' }}
            onClick={() => handleFilter('new')}
          >
             New
          </button>
          <button
            className={`filter-btn ${activeFilter === 'in progress' ? 'active' : ''}`}
            style={{ backgroundColor: '#ffc107', color: 'black' }}
            onClick={() => handleFilter('in progress')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            style={{ backgroundColor: '#28a745', color: 'white' }}
            onClick={() => handleFilter('completed')}
          >
            Completed
          </button>
          <button
            className="filter-btn"
            style={{ backgroundColor: '#6c757d', color: 'white' }}
            onClick={() => handleFilter('all')}
          >
             Clear All
          </button>
        </div>

        <div className="stories-grid">
          {paginatedStories.map((story) => (
            <Link to={`/story/${story._id}`} key={story._id} className="story-card">
              <div className="card-image">
                <img
                  src={`https://ik.imagekit.io/dev24/${story.Image?.[0] || 'default.jpg'}`}
                  alt={story.Title}
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{story.Title}</h3>
                <div className={`card-status ${story.Status?.toLowerCase().replace(/\s+/g, '-')}`}>
                  {story.Status}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button className="prev-btn" onClick={handlePrev} disabled={currentPage === 0}>
            Previous
          </button>
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= filteredStories.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
