const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

// https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-testando-as-camadas/33e05d58-0be4-48c0-adb9-f2f3d647c96e/conteudos/30eb3e27-54ef-4c4f-ba69-264dbf013d39/service-e-testes/fbb9fbda-dd04-40d6-998f-f3d1aa6d83ef?use_case=side_bar
// https://github.com/tryber/sd-10a-live-lectures/blob/lecture/27.4/msc-tests/tests/services/movieServiceCreate.test.js

describe('Testa enpoints do produto na camada service', () => {
    describe('Testa insercao de produtos', () => {
        before(() => {
            const ID_MOCKED = '604cb554311d68f491ba5781';

            sinon.stub(productsModel, 'create').resolves({ id: ID_MOCKED });
        });
        after(() => {
            productsModel.create.restore();
        });
        
        describe('Payload informado não é válido', () => {
            const payloadProduct = {};

            it('retorna um objeto', async () => {
                const result = await productsService.create(payloadProduct);

                expect(result).to.be.a('object');
            });
            it('retorna uma mensagem de erro', async () => {
                const { err } = await productsService.create(payloadProduct);

                expect(err.code).to.be.equal('invalid_data');
            });
        });

        describe('Payload informado válido - inserido com sucesso', () => {
            it('retorna um objeto', async () => {
                const result = await productsService.create('Produto do Juracy', 25);

                expect(result).to.be.a('object');
            });

            it('o objeto possui um id válido', async () => {
                const result = await productsService.create('Produto do Juracy', 25);

                expect(result).to.have.a.property('id');
            });
        });
    });
    describe('Testa pesquisa de todos os produtos', () => {
        it('Retorna um array', async () => {
            const result = await productsService.getAll();
            
            expect(result).to.be.a('array');
        });      
    });
    describe('Testa pesquisa por id cadastrado', () => {
        describe('Id informado não é válido', () => {
            const ID_MOCKED = '312312312';
            
            it('retorna um objeto', async () => {
                const result = await productsService.getById(ID_MOCKED);
                
                expect(result).to.be.a('object');
            });

            it('retorna mensagem de erro', async () => {
                const { err } = await productsService.getById(ID_MOCKED);

                expect(err.code).to.be.equal('invalid_data');
            });
        });
        
        describe('Id informado é válido', () => {
            before(() => {
                sinon.stub(productsModel, 'getById')
                  .resolves(
                    {
                      id: '604cb554311d68f491ba5781',
                      name: 'Serra Eletrica do Louco',
                      quantity: 19,
                    }
                  );
              });
          
              after(() => {
                productsModel.getById.restore();
              })
            it('retorna objeto com sucesso', async () => {
                const result = await productsService.getById('604cb554311d68f491ba5781');
                
                expect(result).to.be.a('object');
              //  expect(result).to.be.not.empty;
              //  expect(result).to.include.all.keys('id', 'name', 'quantity');
            });
        });
    });
    describe('Testa update dos produtos', () => {
        describe('Id informado não é válido', () => {
            const ID_MOCKED = '31231231';

            it('retorna objeto', async () => {
                const result = await productsService.update(ID_MOCKED, 'Joao da Silva', 15);

                expect(result).to.be.a('object');
            });
            it('retorna mensagem de erro', async () => {
                const { err } = await productsService.update(ID_MOCKED, 'Joao da Silva', 15);
                
                expect(err.code).to.be.equal('invalid_data');
            });
        });
        describe('Id informado válido', () => {
            before(() => {
                sinon.stub(productsModel, 'update').resolves({
                    id: '604cb554311d68f491ba5781',
                    name: 'Joao da Silva',
                    quantity: 15,
                });
            });
          
            after(() => {
              productsModel.update.restore();
            });

            it('retorna objeto com sucesso', async () => {
                const { _id: id} = await productsModel.create('Joao da Silva', 15);
                const result = await productsService.update(id,'Joao da Silva', 15);

                expect(result).to.be.a('object');
            });
        });
    });
    describe('Teste remoção dos produtos', () => {
        describe('Id informado não é válido', () => {
            const ID_MOCKED = '31231231';

            it('retorna objeto', async () => {
                const result = await productsService.remove(ID_MOCKED);

                expect(result).to.be.a('object');
            });

            it('retorna mensagem de erro', async () => {
                const { err } = await productsService.remove(ID_MOCKED);

                expect(err.code).to.be.equal('invalid_data');
            });
        });
        describe('Id informado válido', () => {
            before(() => {
                sinon.stub(productsModel, 'remove').resolves({
                    id: '604cb554311d68f491ba5781',
                    name: 'Joao da Silva',
                    quantity: 15,
                });
            });
          
            after(() => {
              productsModel.remove.restore();
            });

            it('retorna objeto com sucesso', async () => {
                const { _id: id} = await productsModel.create('Joao da Silva', 15);
                const result = await productsService.remove(id);

                expect(result).to.be.a('object');
            });
        });
    });
});

