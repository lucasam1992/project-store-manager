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
            const mockProducts = { products: [{name: 'Chapéu de Cobra', quantity: 15}] };
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
            const mockProducts = { products: [{name: 'Chapéu de Cobra', quantity: 15}] };

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

    describe('Testa busca por todos os produtos', () => {
        describe('retorna confirmação positiva', () => {
            const request = {};
            const response = {};
            const mockProducts = { products: [{name: 'Chapéu de Cobra', quantity: 15}] };

            before(() => {
                request.body = { mockProducts };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();

                sinon.stub(productsService, 'getAll').resolves(mockProducts);
            });

            after(() => {
                productsService.getAll.restore();
            });

            it('é chamado o status com o código 200', async () => {
                await productsController.getAll(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });

            it('retorna array', async () => {
                await productsController.create(request, response, () => {});

                expect(response.json.calledWith({products: mockProducts})).to.be.equal(true);
            });
        });
    });
    describe('testa busca por id', () => {
        describe('quando id informado não é válido', () => {
            const response = {};
            const request = {};
            const messageError = { err: { message: 'invalid_data' }};
            const ID_MOCKED = '1233377';

            before(() => {
                request.params = {ID_MOCKED};
                
                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(productsService, 'getById').resolves(messageError);
            });

            after(() => {
                productsService.getById.restore();
            });

            it('é chamado o status com o código 422', async () => {
                await productsController.getById(request, response, () => {});

                expect(response.status.calledWith(422)).to.be.equal(true);
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await productsController.getById(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);
            });
        });

        describe('quando id informado é válido', () => {
            const response = {};
            const request = {};
            const ID_MOCKED = '604cb554311d68f491ba5781';
            const mockProducts = { products: [{name: 'Chapéu de Cobra', quantity: 15}] };

            before(() => {
                request.params = {ID_MOCKED};
                
                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(productsService, 'getById').resolves(mockProducts);
            });
            
            after(() => {
                productsService.getById.restore();
            });
            
            
            it('é chamado o status com o código 200', async () => {
                await productsController.getById(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });
            it('retorna objeto', async () => {
                await productsController.getById(request, response, () => {});

                expect(response.json.calledWith(mockProducts)).to.be.equal(true);
            });
        });
    });
    describe('Testa update de produtos', () => {
        describe('quando id informado não é válido', () => {
            const request = {};
            const response = {};
            const mockProducts = { products: [{name: 'Chapéu de Cobra', quantity: 15}] };
            const messageError = { err: { message: 'invalid_data' }};
            const ID_MOCKED = '1233377';

            before(() => {
                request.params = {ID_MOCKED};
                request.body = {mockProducts};

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(productsService, 'update').resolves(messageError);
            });

            after(() => {
                productsService.update.restore();
            });



            it('é chamado o status com o código 422', async () => {
                await productsController.update(request, response, () => {});

                expect(response.status.calledWith(422)).to.be.equal(true);
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await productsController.update(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);
            });
        });
        describe('quando id informado é válido', () => {
            const request = {};
            const response = {};
            const mockProducts = { products: [{name: 'Chapéu de Cobra', quantity: 15}] };
            const ID_MOCKED = '604cb554311d68f491ba5781';

            before(() => {
                request.params = {ID_MOCKED};
                request.body = {mockProducts};

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(productsService, 'update').resolves(mockProducts);
            });

            after(() => {
                productsService.update.restore();
            });
            it('é chamado o status com o código 200', async () => {
                await productsController.update(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });
            it('retorna um array', async () => {
                await productsController.update(request, response, () => {});

                expect(response.json.calledWith(mockProducts)).to.be.equal(true);
            });
        });
    });
    describe('Testa a remoção de produtos', () => {
        describe('quando id informado não é válido', () => {
            const request = {};
            const response = {};
            const ID_MOCKED = '123123';
            const messageError = { err: { message: 'invalid_data' }};

            before(() => {
                request.params = { ID_MOCKED };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(productsService, 'remove').resolves(messageError);
            });

            after(() => {
                productsService.remove.restore();
            });

            it('é chamado status com o código 422', async () => {
                await productsController.remove(request, response, () => {});

                expect(response.status.calledWith(422)).to.be.equal(true);
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await productsController.remove(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);                
            });
        });
        describe('quando id informado é válido', () => {
            const request = {};
            const response = {};
            const mockProducts = { products: [{name: 'Chapéu de Cobra', quantity: 15}] };
            const ID_MOCKED = '604cb554311d68f491ba5781';

            before(() => {
                request.params = { ID_MOCKED };

                response.status = sinon.stub().returns(response); 
                response.json = sinon.stub().returns();

                sinon.stub(productsService, 'remove').resolves(mockProducts);
            });

            after(() => {
                productsService.remove.restore();
            });

            it('é chamado o status com o código 200', async () => {
                await productsController.remove(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });
            it('retorna objeto', async () => {
                await productsController.remove(request, response, () => {});

                expect(response.json.calledWith(mockProducts)).to.be.equal(true);
            });
        });
    });
});


// Testando sales

describe('Testa enpoints da venda na camada controller', () => {
    describe('Testa inserção de vendas', () => {
        describe('quando payload informado não é válido', () => {
            const response = {};
            const request = {};
            const itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];
            const messageError = { err: { message: 'invalid_data' }};

            before(() => {
                request.body = { itensSold };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();

                sinon.stub(salesService, 'create').resolves( messageError );
            });

            after(() => {
                salesService.create.restore();
            });

            it('é chamado o status com o código 422', async () => {
                await salesController.create(request, response, () => {});

                expect(response.status.calledWith(422)).to.be.equal(true);
                
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await salesController.create(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);
            });
        });
        
        describe('quando há problema de estoque', () => {
            const response = {};
            const request = {};
            const itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];
            const messageError = { err: { code: 'stock_problem' , message: 'invalid_data' }};

            before(() => {
                request.body = { itensSold };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();

                sinon.stub(salesService, 'create').resolves( messageError );
            });

            after(() => {
                salesService.create.restore();
            });

            it('é chamado o status com o código 404', async () => {
                await salesController.create(request, response, () => {});

                expect(response.status.calledWith(404)).to.be.equal(true);
            });
        });

        describe('quando payload informado é válido', () => {
            const response = {};
            const request = {};
            const itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];
            before(() => {
                request.body = { itensSold };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();

                sinon.stub(salesService, 'create').resolves(itensSold);
            });

            after(() => {
                salesService.create.restore();
            });

            it('é chamado o status com o código 200', async () => {
                await salesController.create(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });

            it('retorna objeto', async () => {
                await salesController.create(request, response, () => {});

                expect(response.json.calledWith(itensSold)).to.be.equal(true);
            }); 

        });
    });

    describe('Testa busca por todos as vendas', () => {
        describe('retorna confirmação positiva', () => {
            const request = {};
            const response = {};
            const itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];

            before(() => {
                request.body = { itensSold };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();

                sinon.stub(salesService, 'getAll').resolves(itensSold);
            });

            after(() => {
                salesService.getAll.restore();
            });

            it('é chamado o status com o código 200', async () => {
                await salesController.getAll(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });

            it('retorna array', async () => {
                await salesController.create(request, response, () => {});

                expect(response.json.calledWith(itensSold)).to.be.equal(true);
            });
        });
    });

    describe('testa busca por id', () => {
        describe('quando id informado não é válido', () => {
            const response = {};
            const request = {};
            const messageError = { err: { message: 'invalid_data' }};
            const ID_MOCKED = '1233377';

            before(() => {
                request.params = {ID_MOCKED};
                
                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(salesService, 'getById').resolves(messageError);
            });

            after(() => {
                salesService.getById.restore();
            });

            it('é chamado o status com o código 404', async () => {
                await salesController.getById(request, response, () => {});

                expect(response.status.calledWith(404)).to.be.equal(true);
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await salesController.getById(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);
            });
        });

        describe('quando id informado é válido', () => {
            const response = {};
            const request = {};
            const ID_MOCKED = '604cb554311d68f491ba5781';
            const itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];

            before(() => {
                request.params = {ID_MOCKED};
                
                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(salesService, 'getById').resolves(itensSold);
            });
            
            after(() => {
                salesService.getById.restore();
            });
            
            
            it('é chamado o status com o código 200', async () => {
                await salesController.getById(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });
            it('retorna objeto', async () => {
                await salesController.getById(request, response, () => {});

                expect(response.json.calledWith(itensSold)).to.be.equal(true);
            });
        });
    });
    describe('Testa update das vendas', () => {
        describe('quando id informado não é válido', () => {
            const request = {};
            const response = {};
            const  itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];

            const messageError = { err: { message: 'invalid_data' }};
            const ID_MOCKED = '1233377';

            before(() => {
                request.params = {ID_MOCKED};
                request.body = {itensSold};

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(salesService, 'update').resolves(messageError);
            });

            after(() => {
                salesService.update.restore();
            });



            it('é chamado o status com o código 422', async () => {
                await salesController.update(request, response, () => {});

                expect(response.status.calledWith(422)).to.be.equal(true);
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await salesController.update(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);
            });
        });
        describe('quando id informado é válido', () => {
            const request = {};
            const response = {};
            const itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];

            const ID_MOCKED = '604cb554311d68f491ba5781';

            before(() => {
                request.params = {ID_MOCKED};
                request.body = {itensSold};

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(salesService, 'update').resolves(itensSold);
            });

            after(() => {
                salesService.update.restore();
            });
            it('é chamado o status com o código 200', async () => {
                await salesController.update(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });
            it('retorna um array', async () => {
                await salesController.update(request, response, () => {});

                expect(response.json.calledWith(itensSold)).to.be.equal(true);
            });
        });
    });
    describe('Testa a remoção das vendas', () => {
        describe('quando id informado não é válido', () => {
            const request = {};
            const response = {};
            const ID_MOCKED = '123123';
            const messageError = { err: { message: 'invalid_data' }};

            before(() => {
                request.params = { ID_MOCKED };

                response.status = sinon.stub().returns(response);
                response.json = sinon.stub().returns();
                
                sinon.stub(salesService, 'remove').resolves(messageError);
            });

            after(() => {
                salesService.remove.restore();
            });

            it('é chamado status com o código 422', async () => {
                await salesController.remove(request, response, () => {});

                expect(response.status.calledWith(422)).to.be.equal(true);
            });
            it('é chamado json com a mensagem de erro genérica', async () => {
                await salesController.remove(request, response, () => {});

                expect(response.json.calledWith(messageError)).to.be.equal(true);                
            });
        });
        describe('quando id informado é válido', () => {
            const request = {};
            const response = {};
            const itensSold = [{
                productId: '604cb554311d68f491ba5781',
                quantity: 15,
            }];
            const ID_MOCKED = '604cb554311d68f491ba5781';

            before(() => {
                request.params = { ID_MOCKED };

                response.status = sinon.stub().returns(response); 
                response.json = sinon.stub().returns();

                sinon.stub(salesService, 'remove').resolves(itensSold);
            });

            after(() => {
                salesService.remove.restore();
            });

            it('é chamado o status com o código 200', async () => {
                await salesController.remove(request, response, () => {});

                expect(response.status.calledWith(200)).to.be.equal(true);
            });
            it('retorna objeto', async () => {
                await salesController.remove(request, response, () => {});

                expect(response.json.calledWith(itensSold)).to.be.equal(true);
            });
        });
    });
});
