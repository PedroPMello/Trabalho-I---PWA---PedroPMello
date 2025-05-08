import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const irParaFilmes = () => {
    navigate('/filmes');
  };

  return (
    <Container className="my-4">
      <h1>Seja bem-vindo ao Site de Filmes!</h1>
      <Button variant="primary" onClick={irParaFilmes}> Ver Lista de Filmes </Button>
      <p>Este site faz parte de um Trabalho da disciplina de Programação para WEB - Ciência da Computação - IFSul. </p>
      <p>Autor: Pedro Pizzolato Mello</p>
    </Container>
  );
}

export default Home;