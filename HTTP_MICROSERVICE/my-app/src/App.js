import React, { useState } from 'react';

function App() {
  const [urls, setUrls] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const handleUrlChange = (e) => {
    const { value } = e.target;
    const urlList = value.split(',');
    setUrls(urlList);
  };

  const fetchNumbers = async () => {
    const url = '/numbers?' + urls.map((url) => `url=${encodeURIComponent(url)}`).join('&');

    try {
      const response = await fetch(url);
      const data = await response.json();
      setNumbers(data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };
  return (
    <div className="App">
           <h1>Number Management Service</h1>
      <label htmlFor="urls">Enter URLs:</label>
      <input type="text" id="urls" onChange={handleUrlChange} />
      <button onClick={fetchNumbers}>Get Numbers</button>
      <h2>Numbers:</h2>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
