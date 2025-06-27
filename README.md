# Trabalho I - PWA - PedroPMello

Este é o frontend da aplicação "Site de Filmes", desenvolvida como parte de um Trabalho Prático para a disciplina de Programação para WEB (Ciência da Computação - IFSul). Ele permite que usuários visualizem uma lista de filmes, realizem login/cadastro, editem seus próprios perfis e, no caso de administradores, gerenciem a lista de filmes.

## Funcionalidades

* **Página Inicial (Home):** Boas-vindas e navegação para a lista de filmes.
* **Lista de Filmes:** Visualização de todos os filmes disponíveis, com detalhes acessíveis via modal.
* **Autenticação JWT:**
    * **Login:** Usuários e administradores podem fazer login com email e senha.
    * **Cadastro:** Novas contas de usuário podem ser criadas.
    * **Sair:** Encerrar sessão.
* **Rotas Protegidas:**
    * Acesso à lista de filmes e ao perfil de usuário/administrador requer autenticação.
    * A tela de administração de filmes é restrita apenas a usuários com perfil de 'admin'.
* **Gestão de Perfil:**
    * Usuários autenticados podem visualizar e editar seus próprios dados (nome, email, senha).
    * Um usuário não pode acessar ou modificar dados de outros usuários.
* **Administração de Filmes (Apenas para Administradores):**
    * Adicionar novos filmes.
    * Editar filmes existentes.
    * Remover filmes (controle de autorização rigoroso no backend, mas a ação é visível apenas para admins no frontend).
* **Experiência do Usuário:** Interface responsiva e intuitiva utilizando React Bootstrap.

## Tecnologias Utilizadas

* **React:** Biblioteca JavaScript para construção da interface de usuário.
* **React Router DOM:** Para gerenciamento de rotas na aplicação single-page.
* **React Bootstrap:** Componentes Bootstrap reutilizáveis para React, facilitando o design responsivo.
* **Axios / Fetch API:** Para comunicação com a API backend.
* **Local Storage:** Para armazenamento de token JWT e informações de `role` do usuário.

## Deploy

Este frontend está hospedado na Vercel e pode ser acessado em: (https://vercel.com/pedro-pizzolato-mellos-projects/trabalho-ii-pwa-pedropmello)

## Projeto Relacionado

* **Backend (API):** (https://github.com/PedroPMello/PW---Trabalho-I---API---PedroPMello)
