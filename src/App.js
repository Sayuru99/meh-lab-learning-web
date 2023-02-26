import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://raw.githubusercontent.com/Sayuru99/meh-lab-learning/main/data.json')
        .then(response => response.json())
        .then(jsonData => setData(jsonData))
        .finally(() => setIsLoading(false));
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div id="load">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='card'>
        <h1>{data?.language}</h1>
        {data?.topics && data.topics.length > 0 && data.topics.map(topic => (
          <div key={topic.title}>
            <h2>{topic.title}</h2>
            {topic.chapters && topic.chapters.length > 0 && topic.chapters.map(chapter => (
              <div key={chapter.title}>
                <h3>{chapter.title}</h3>
                {chapter.content.paragraphs.map(paragraph => (
                  <p key={paragraph.text}>{paragraph.text}</p>
                ))}
                <img src={chapter.image_url} alt={chapter.title} />
                <SyntaxHighlighter language="javascript" style={nightOwl}>
                  {chapter.example}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>

  );
}

export default App;
