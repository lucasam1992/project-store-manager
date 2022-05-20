const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsController = require('../../controllers/productsController');

const salesService = require('../../services/salesService');
const salesController = require('../../controllers/salesController');

describe('Testa enpoints do produto na camada controller', () => {
    describe('Testa inserção de produtos', () => {
        describe('quando payload informado não é válido', () => {
            const response = {};
            const request = {};
            const mockProducts = { body: {name: 'Chapéu de Cobra', quantity: 15} };
            const messageError = { err: { message: 'invalid_data' }};

            before(() => {
                request.body = { mockProducts };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();

                sinon.stub(productsService, 'create').resolves( messageError );
            });

            after(() => {
                productsService.create.restore();
            });

            it('é chamado o status com o código 422', async () => {
                await productsController.create(request, response, () => {});

                expect(response.status.calledWith(422)).to.be.equal(true);
                
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await productsController.create(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);
            });
        });
        describe('Quando payload informado é válido', () => {
            const response = {};
            const request = {};
            const mockProducts = { body: {name: 'Chapéu de Cobra', quantity: 15} };

            before(() => {
                request.body = { mockProducts };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();

                sinon.stub(productsService, 'create').resolves(mockProducts);
            });

            after(() => {
                productsService.create.restore();
            });

            it('é chamado o status com o código 201', async () => {
                await productsController.create(request, response, () => {});

                expect(response.status.calledWith(201)).to.be.equal(true);
            });

            it('retorna objeto', async () => {
                await productsController.create(request, response, () => {});

                expect(response.json.calledWith(mockProducts)).to.be.equal(true);
            }); 

        });
    });
});


// Testando sales

describe('Testa enpoints da venda na camada controller', () => {

});