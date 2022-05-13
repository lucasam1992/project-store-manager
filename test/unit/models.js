const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const salesModel = require('../../models/salesModel');
const productsModel = require('../../models/productsModel');

// Link que me ajudou a recaptular o Mock da conexão para fazer os testes
// https://github.com/tryber/sd-10a-live-lectures/blob/lecture/28.3/nodejs-jwt-tests-base-project/tests/connectionMock.js

let connectionMock;

before(async () => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();
  connectionMock = await MongoClient.connect(
    URLMock,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  connectionMock = connectionMock.db('StoreManager')
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
      const resultCreated = await productsModel.create(payloadProduct);
      await productsModel.update(resultCreated._id, 'Produto Juracy', 25);
      const resultProductById = await productsModel.getById(resultCreated._id);

      expect(resultProductById.name).to.be.equal('Produto Juracy');
      expect(resultProductById.quantity).to.be.equal(25);
    });
  });
  
  describe('Testa se está removendo os produtos', () => {
    it('retorna vazio caso tenha sido removido da lista ', async () => {
      const resultCreated = await productsModel.create(payloadProduct);
      await productsModel.remove(resultCreated._id);
      const resultProductById = await productsModel.getById(resultCreated._id);
      
      expect(resultProductById).to.be.equal(null);
    });
  });
});
