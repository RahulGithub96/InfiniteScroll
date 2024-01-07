import './App.css';
import Inneritem from './Inneritem'

import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchData = async (pageNumber) => {
    setLoading(true);
  
    try {
      const apiUrl = 'https://thingproxy.freeboard.io/fetch/https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page';
      const response = await fetch(`${apiUrl}/${pageNumber}`);
      const newData = await response.json();
      const finalnewData = newData.nodes || [];
      setData((prevData) => [...prevData, ...finalnewData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const truncateText = () => {
      setTimeout(() => {
        const textElements = document.querySelectorAll('.text h2');
        textElements.forEach((textElement) => {
          const textContent = textElement.textContent;
          if (textContent.length > 60) {
            textElement.innerText = textContent.substring(0, 60) + '...';
          }
        });
      }, 1000);
    };
    truncateText();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        fetchData(pageNumber+1);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading,pageNumber]);

  return (
    <div>
      {data.map((item) => (
          <Inneritem 
          key={Math.random()}
          title={item.node.title}
          src={item.node.field_photo_image_section}
          alt={item.node.title}
          update={item.node.last_update}
          ></Inneritem>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;

