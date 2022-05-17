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

        describe('Payload informado válido - inseri com sucesso', () => {
            it('retorna um objeto', async () => {
                const result = await productsService.create(payloadProduct);

                expect(result).to.be.a('object');
            });

            it('o objeto possui um id válido', async () => {
                const result = await productsService.create('Produto do Juracy', 25);
                console.log(result);
                expect(result).to.have.a.property('id');
            });
        });
    });
});