import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StarWarsForm = () => {
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/${type}/${id}/`);
        setData(response.data);
        setError(''); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("These aren't the droids you're looking for");
      }
    };

    if (id) {
      fetchData();
    }
   
  }, [id, type]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setId(event.target.elements.id.value);
    setType(event.target.elements.type.value);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="number" name="id" />
        </label>
        <label>
          Type:
          <select name="type" onChange={(e) => setType(e.target.value)}>
            <option value="planets">Planets</option>
            <option value="people">People</option>
            <option value="starships">Starships</option>
            <option value="films">Films</option>
          </select>
        </label>
        <button type="submit">Fetch Data</button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <img src="src\assets\11.png " height={300} alt="Obi-Wan Kenobi" />
        </div>
      )}

      {data && !error && (
        <div className='data-display'>
          <h2>{data.title || data.name}</h2>
          {type === 'planets' ? (
            <>
              <p><strong>Climate: </strong> {data.climate}</p>
              <p><strong>Terrain: </strong> {data.terrain}</p>
              <p><strong>Population: </strong> {data.population}</p>
              <p><strong>Gravity: </strong>{data.gravity}</p>
            </>
          ) : type === 'people' ? (
            <>
              <p><strong>Height: </strong> {data.height}</p>
              <p><strong>Mass: </strong> {data.mass}</p>
              <p><strong>Hair Color: </strong> {data.hair_color}</p>
              <p><strong>Skin Color: </strong>{data.skin_color}</p>
              <p><strong>Eye Color: </strong>{data.eye_color}</p>
              <p><strong>Birth Year: </strong>{data.birth_year}</p>
              <p><strong>Gender: </strong>{data.gender}</p>
            </>
          ) : type === 'starships' ? (
            <>
              <p><strong>Model: </strong> {data.model}</p>
              <p><strong>Manufacturer: </strong> {data.manufacturer}</p>
              <p><strong>Length: </strong> {data.length}</p>
              <p><strong>Crew: </strong>{data.crew}</p>
            </>
          ) : type === 'films' ? (
            <>
              <p><strong>Director: </strong> {data.director}</p>
              <p><strong>Producer: </strong> {data.producer}</p>
              <p><strong>Release Date: </strong> {data.release_date}</p>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default StarWarsForm;


