import React, { useContext, useEffect, useState } from 'react';
import { useFetch } from '../utils/useFetch';
import { AuthContext } from '../context/LoginContext';

export default function MovieTable() {
  const endpoint = "movies";
  const api = useFetch();
  const { isAuthenticated } = useContext(AuthContext);
  const [movies, setMovies] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetchGenres();
    sendRequest(currentPage);
  }, [isAuthenticated, currentPage, searchTerm, selectedGenre]);

  const fetchGenres = async () => {
    try {
      const response = await api.get('categories');
      if (response) {
        setGenres(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendRequest = async (page) => {
    const body = {
      page,
      search: searchTerm,
      genre: selectedGenre
    };
    try {
      const response = await api.get(endpoint, body);
      if (response) {
        setMovies(response);        
        setTotalPages(response.total_pages); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filteredItems = movies?.results?.filter(item => {
    const genreIds = item.genre_ids || []; 
    const genreId = parseInt(selectedGenre, 10); 
    
    const matchesSearchTerm = (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      || (item.overview && item.overview.toLowerCase().includes(searchTerm.toLowerCase()))
      || (item.release_date && item.release_date.includes(searchTerm.toLowerCase()));
    
    const matchesGenre = !isNaN(genreId) ? genreIds.includes(genreId) : true;
  
    return matchesSearchTerm && matchesGenre;
  });
  
  


  return (
    <div style={tableContainer}>
      <div style={filterStyle}>
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
        />
        <select 
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={selectStyle}
        >
          <option value="">Todos los géneros</option>
          {genres.genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      
      <div style={paginationStyle}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          style={currentPage === 1 ? {...buttonStyle, ...buttonDisabledStyle} : buttonStyle}
        >
          Anterior
        </button>
        <span style={pageInfoStyle}>
          Página {currentPage} de {totalPages}
        </span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? {...buttonStyle, ...buttonDisabledStyle} : buttonStyle}
        >
          Siguiente
        </button>
      </div>
      
      {movies && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha de lanzamiento</th>
              <th>Popularidad</th>
              <th>Voto promedio</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredItems.length>0 ?
              filteredItems.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={imageStyle}
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.overview}</td>
                  <td>{movie.release_date}</td>
                  <td>{movie.popularity}</td>
                  <td>{movie.vote_average}</td>
                </tr>
              )):
              <div style={noResultsStyle}>
                dont match any file
              </div>
            }
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableContainer = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#181818", 
  color: "#EAEAEA" 
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '1rem 0',
  textAlign: 'left',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: '#1E1E1E', 
  color: '#EAEAEA', 
};

const imageStyle = {
  width: '100px',
  borderRadius: '8px',
};

const paginationStyle = {
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff', 
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const buttonDisabledStyle = {
  backgroundColor: '#6c757d',
  cursor: 'not-allowed',
};

const pageInfoStyle = {
  margin: '0 1rem',
  fontSize: '1rem',
};

const filterStyle = {
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
};

const inputStyle = {
  padding: '0.5rem',
  border: '1px solid #333', 
  borderRadius: '5px',
  width: '30%',
  backgroundColor: '#333', 
  color: '#EAEAEA', 
};

const selectStyle = {
  padding: '0.5rem',
  border: '1px solid #333', 
  borderRadius: '5px',
  width: '20%',
  backgroundColor: '#333', 
  color: '#EAEAEA',
};

const noResultsStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#888',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: '#1E1E1E', 
};
