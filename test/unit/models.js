const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const salesModel = require('../../models/salesModel');
const productsModel = require('../../models/productsModel');

// Recaptulando o Mock da conexão para fazer os testes
// https://github.com/tryber/sd-10a-live-lectures/blob/lecture/28.3/nodejs-jwt-tests-base-project/tests/connectionMock.js

let connectionMock;

before(async () => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();
  connectionMock = await MongoClient.connect(
    URLMock,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  connectionMock = connectionMock.db('StoreManager');
  sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
});

after(() => {
  mongoConnection.getConnection.restore();
});


const payloadProduct = {
  name: 'Produto Silva',
  quantity: 10,
}

describe('Testa endpoints do produto', () => {
  describe('Testa se está inserindo com sucesso', () => {
    it('retorna um objeto', async () => {
        const result = await productsModel.create(payloadProduct);

        expect(result).to.be.a('object');
    });
    it('verificar se existem os atributos _id, name e quantity', async () =>{
        const result = await productsModel.create(payloadProduct);

        expect(result).to.have.a.property('_id');
        expect(result).to.have.a.property('name');
        expect(result).to.have.a.property('quantity');
    });
  });
  describe('Testa se está pesquisando por id do produto', () => {
    it('retorna um objeto', async () => {
        const { _id: id } = await productsModel.create(payloadProduct);
        const result = await productsModel.getById(_id);

        expect(result).to.be.a('object');
    });
  });
  describe('Testa se está pesquisando por todos os produtos', () => {
    it('retorna um array', async () => {
        const result = await productsModel.getAll();

        expect(result).to.be.a('array');
    });
  });
  
  describe('Testa se está atualizando os produtos', () => {
    it('retorna objeto atualizado', async () => {
      const { _id: id } = await productsModel.create(payloadProduct);
      const payloadProductUpdate = [{ 'name': 'Produto Juracy', 'quantity': 25 }];
      
      await productsModel.update(id, payloadProductUpdate);
      
      const { name, quantity } = await productsModel.getById(id);

      expect(name).to.be.equal('Produto Juracy');
      expect(quantity).to.be.equal(25);
    });
  });
  
  describe('Testa se está removendo os produtos', () => {
    it('retorna vazio caso tenha sido removido da lista', async () => {
      const { _id: id} = await productsModel.create(payloadProduct);
      await productsModel.remove(id);
      const resultProductById = await productsModel.getById(id);
      
      expect(resultProductById).to.be.equal(null);
    });
  });
});


// Validando Sale

describe('Testa endpoints do sale', () => {
  describe('Testa se está inserindo com sucesso', () => {
    it('retorna um objeto', async () => {
        const { _id: id } = await productsModel.create(payloadProduct);
        const payloadSale = [{'productId': id,'quantity': 3}]
        const result = await salesModel.create(payloadSale);
        
        expect(result).to.be.a('object');
    });
    it('verificar se existem os atributos _id, e itensSold', async () =>{
        const { _id: id} = await productsModel.create(payloadProduct);
        const payloadSale = [{'productId': id,'quantity': 3}];
        const result = await salesModel.create(payloadSale);

        expect(result).to.have.a.property('_id');
        expect(result).to.have.a.property('itensSold');
    });
  });
  describe('Testa se está pesquisando por id', () => {
    it('retorna um objeto', async () => {
      const { _id: id } = await productsModel.create(payloadProduct);
      const payloadSale = [{'productId': id,'quantity': 3}];
      const { _id: saleId } = await salesModel.create(payloadSale);
      const result = await salesModel.getById(saleId);

      expect(result).to.be.a('object');
    });
  });
  describe('Testa se está pesquisando por todos os sales', () => {
    it('retorna um array de objetos', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.a('array');
    });
  });
  describe('Testa se está atualizando os sales', () => {
    it('retorna um objeto atualizado', async () => {
      // Criando product
      const { _id: id} = await productsModel.create(payloadProduct);
      // Criando Sale
      const payloadSale = [{'productId': id,'quantity': 3}];
      const { _id: saleId } = await salesModel.create(payloadSale);
      // Fazendo alteração no sale
      const payloadSaleUpdated = [{'productId': id, 'quantity': 25}];
      const resultUpdated = await salesModel.update(saleId, payloadSaleUpdated);

      const { quantity } = await salesModel.getById(saleId);
      
      expect(quantity).to.be.equal(25);
    });
  });
  describe('Testa se está removendo os sales', () => {
    it('retorna vazio caso tenha sido removido da lista', async () => {
      // Criando product
      const { _id: id} = await productsModel.create(payloadProduct);
      // Criando Sale
      const payloadSale = [{'productId': id,'quantity': 3}];
      const { _id: saleId } = await salesModel.create(payloadSale);
      await salesModel.remove(saleId);

      const resultProductById = await salesModel.getById(saleId);

      expect(resultProductById).to.be.equal(null);
    });
  });
});
