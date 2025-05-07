import { useEffect, useState } from 'react';

export default function Filmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:3000/api/filmes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setFilmes(data))
      .catch(error => console.error('Erro ao carregar filmes:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Filmes</h1>
      <ul>
        {filmes.map(filme => (
          <li key={filme.id}>{filme.titulo} ({filme.ano})</li>
        ))}
      </ul>
    </div>
  );
}