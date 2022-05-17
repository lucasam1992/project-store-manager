# Boas vindas ao repositório do projeto Store Manager!

O projeto consiste em uma API que realiza um CRUD (Create, Read, Update e Delete) de um sistema de gerenciamento de vendas. A implementação do código foi feita baseada na arquitetura de software MSC (Model-Service-Controller).

## Banco de Dados do Projeto

 O banco de dados possui duas tabelas `products` e `sales`<br />
 
 A tabela `products` contém os seguinte atributos:
  
  {
    "_id": ObjectId("5f43cbf4c45ff5104986e81d"), 
    "name": "Produto Silva", "quantity": 10 
  }; <br />
 
 A tabela `sales` contém os seguitnes atributos: 
  
  {
   "_id": ObjectId("5f43cc53c45ff5104986e81e"),
   "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }]
  };

## Tecnologias Usadas

- Node.js 
- Express.js
- Javascript
- MongoDB
- Mochajs
- Chaijs
- Sinonjs

## O que foi Desenvolvido

### 1 - Criação do endpoint POST `/products`

![Criar produtos](./public/criarProdutos.png)

### 2 - Criação dos endpoints GET `/products` e `/products/:id`

![Lista de produtos](./public/listadeprodutos.png)

![Listar um produto](./public/produtoespecifico.png)

### 3 - Criação do endpoint PUT `/products/:id`

![Atualizado com sucesso](./public/atualizarcomsucesso.png)

### 4 - Criação do endpoint DELETE `/products/:id`

![Deletar um produto](./public/deletarumproduto.png)

### 5 - Criação do endpoint POST `/sales`

![Cadastro de venda com sucesso](./public/cadastrodevendacomsucesso.png)

![Cadastrar varias compras](./public/variascompras.png)

### 6 - Criação dos endpoints GET `/sales` e `/sales/:id`

![Listar todas as vendas](./public/todasvendas.png)

![Listar uma venda](./public/listaumavenda.png)

### 7 - Criação do endpoint PUT `/sales/:id`

![Atualizar uma venda com sucesso](./public/atualizarvendacomsucesso.png)

### 8 - Criação do endpoint DELETE `/sales/:id`

![Deletar uma venda com sucesso](./public/deletarumavendacomsucesso.png)

## O que está em desenvolvimento

### 11 - Criação de testes na camada models

- Os testes de models estão no arquivo `test/unit/models.js`

### 12 - Criação de testes para seus services

- Os testes de services estarão no arquivo `test/unit/services.js`

### 13 - Escreva testes para seus controllers

- Os testes de controllers estarão no arquivo `test/unit/controllers.js`

## Rodando o Projeto Localmente

1° `git clone https://github.com/lucasam1992/project-store-manager.git` - Clone o repositório para sua máquina <br />
2° `cd project-store-manager` - Entre na pasta do repositório clonado <br />
3° `npm install` - Instale as dependências <br />
4° `npm start` - Execute o programa <br />

**Sugestão: Baixe o programa Insomina para executar cada operação do CRUD:
https://snapcraft.io/install/insomnia/ubuntu

## Autor

- Lucas Machado

