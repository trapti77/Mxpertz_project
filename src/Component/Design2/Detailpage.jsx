import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './Detailpage.css';

const StoryDetailPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [activeTab, setActiveTab] = useState('word-explorer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStory(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <div className="loading">Loading story details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!story) return <div className="not-found">Story not found</div>;

  return (
    <div className="story-detail-page">
      <Header />
      <div className="detail-content">
        <h1 className="detail-title">The Lost City of Future Earth</h1>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'word-explorer' ? 'active' : ''}`}
            onClick={() => handleTabClick('word-explorer')}
          >
            <span className="tab-icon">🔍</span> Word Explorer
          </button>
          <button 
            className={`tab ${activeTab === 'story-adventure' ? 'active' : ''}`}
            onClick={() => handleTabClick('story-adventure')}
          >
            <span className="tab-icon">📚</span> Story Adventure
          </button>
          <button 
            className={`tab ${activeTab === 'brain-quest' ? 'active' : ''}`}
            onClick={() => handleTabClick('brain-quest')}
          >
            <span className="tab-icon">🧠</span> Brain Quest
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'word-explorer' && (
            <div className="word-explorer-content">
              <div className="instruction">
                Drag Pictures to the matching Words, light up correct pairs, shake for entry
              </div>
              
              <div className="connection-area">
                <div className="connection-card">
                  <h2 className='connection-head'>Correction<sup>(noun)</sup></h2>
                  <p className='connection-para'>
                      Connect the images with their matching words to complete the puzzle
                  </p>
                  <div className="connection-image">
                    <img src={`https://ik.imagekit.io/dev24/${story.Image?.[0]}`} alt="Connection" />
                  </div>
                  <div className="connection-text">
                    <h4 className='connection-antonym'>Antonyms:{story.Wordexplore?.[0].Antonyms }</h4>
                    <h4 className='connection-synonym'>Synonyms:{story.Wordexplore?.[0].Synonyms}</h4>
                    </div>
                </div>

                <div className="story-cards-grid">
                 {Array(8).fill().map((_, index) => (
  <div key={index} className="detail-story-card">
    <img src={`https://ik.imagekit.io/dev24/${story.Image?.[0]}`} alt={story.title} />
    <div className="card-description">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
  </div>
))}

                </div>
              </div>
  <div className="navigation-buttons">
                <button className="prev-nav-btn">⬅</button>
                <button className="next-nav-btn">➡</button>
              </div>
                
            </div>
          )}
          
          {activeTab === 'story-adventure' && (
            <div className="story-adventure-content">
              <h2>Story Adventure Content</h2>
              <p>{story.description}</p>
            </div>
          )}
          
          {activeTab === 'brain-quest' && (
            <div className="brain-quest-content">
              <h2>Brain Quest Content</h2>
              <p>Test your knowledge about {story.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;