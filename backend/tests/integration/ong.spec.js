const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('Shuld be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Focinhos Carentes",
        email: "apad@sdkfj.com",
        whatsapp: "47997358508",
        city: "Jaraguá do Sul",
        uf: "SC"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});