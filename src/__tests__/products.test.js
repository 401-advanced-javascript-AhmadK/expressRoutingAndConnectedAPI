'use strict';

const { server } = require('../server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Products API', () => {
  it('post a new product item', () => {
    let testObj = { name: 'apple', price: 25, quantity_in_stock: 200 };
    return mockRequest.post('/api/v1/products')
      .send(testObj)
      .then(data => {
        let record = data.body;
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });
      });
  });
  it('respond properly to a get request to /api/v1/products', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
        expect(typeof results.body).toBe('object');

      });
  });
  it('get one product item', () => {
    let testObj = { name: 'apple', price: 25, quantity_in_stock: 200 };
    return mockRequest.post('/api/v1/products')
      .send(testObj)
      .then(data => {
        return mockRequest.get(`/api/v1/products/${data.body._id}`)
          .then(data => {
            let record = data.body[0];
            Object.keys(testObj).forEach(key => {
              expect(record[key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('respond properly to a delete request to /api/v1/products/:id', () => {
    let obj = { name: 'dates', price: 125, quantity_in_stock: 2000 };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest
          .delete(`/api/v1/products/${data.body._id}`)
          .send(obj)
          .then(() => {
            return mockRequest.get(`/api/v1/products/${data.body._id}`)
              .then(results => {
                expect(results.status).toBe(200);
                expect(results.body[0]).toBe();
              });
          });
      });
  });
  it('respond properly to a update request to /api/v1/products/:id', () => {
    let obj = {name: 'apple', price: 25, quantity_in_stock: 200 };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data=>{
        return mockRequest.put(`/api/v1/products/${data.body._id}`)
          .send({ name: 'Item is UPDATED', price: 10, quantity_in_stock: 999})
          .then(results=>{
            expect(results.status).toBe(200);
            expect(results.body.name).toEqual('Item is UPDATED');
            expect(results.body.price).toEqual(10);
            expect(results.body.quantity_in_stock).toEqual(999);
          });
      });
  });
});