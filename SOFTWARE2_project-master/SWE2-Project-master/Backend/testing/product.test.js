const mongoose = require('mongoose')
const app = require('../app')
const productModel = require('../models/product')
const request = require('supertest')
require("dotenv").config(
  '{ path: "E:DownloadsSOFTWARE2_project-masterSOFTWARE2_project-masterSWE2-Project-masterBackend" }'
);

beforeAll(async () => {
    await mongoose.connect(process.env.connect_DB)
})

afterAll(async () => {
    await productModel.deleteMany({ isTest: true });
    await mongoose.connection.close();
})

describe('get all products', () => {
    it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(200);
    }),
    it ('should return failure with status code 500', async () => {
        await mongoose.connection.close(); // we can do this or we can use mocking
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(500);
        await mongoose.connect(process.env.connect_DB)
        // Example using mocking
        // const mockFind = jest.spyOn(productModel, 'find').mockRejectedValueOnce(new Error('DB error'));

        // const res = await request(app).get('/api/products');
        // expect(res.status).toBe(500);

        // Restore the original implementation
        // mockFind.mockRestore();
    })
})

describe('get a product', () => {
    it('should return a product', async () => {
        const product = await productModel.create({
            title: "product1",
            price: 200,
            description:"abcd",
            category:"abcd",
            image: "/img/product-5.png",
            isTest: true,
        })
        const res = await request(app).get(`/api/products/${product._id}`)
        expect(res.status).toBe(200)
        expect(res.body.title).toBe("product1")
    }),
    it('should return product not found', async () => {
        const res = await request(app).get(`/api/products/5050221`)
        expect(res.status).toBe(500)
    })
})

describe('post a product', () => {
    it('should create a product', async () => {
        const res = await request(app).post(`/api/products`).send({
            title: "product2",
            price: 400,
             description:"abcd",
            category:"abcd",
            image: "/img/product-7.png",
            isTest: true,
        })
        expect(res.status).toBe(200)
        expect(res.body.title).toBe("product2")
    }),
    it('should fail to create a product', async () => {
        const res = await request(app).post('/api/products');
        expect(res.status).toBe(500)
    })
})

describe('update a product', () => {
    it('should update a product', async () => {
        const product = await productModel.create({
            title: "product4",
            price: 600,
             description:"abcd",
            category:"abcd",
            image:"/img/product-5.png",
            isTest: true,
        })
        const res = await request(app).put(`/api/products/${product._id}`).send({
            title:"product5",
            price: 550,
             description:"abcd",
            category:"abcd",
            image:"/img/product-8.png",
        })
        console.log(res.body);  // أضف هذا السطر لمراجعة محتوى الاستجابة
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Product updated successfully");
    }),
    it('should return product not found', async () => {
        const res = await request(app).put(`/api/products/5d4f54d`).send({
            title: "product500",
            price: 550,
             description:"abcd",
            category:"abcd",
            image: "/img/product-8.png"
        })
        expect(res.status).toBe(500)
    })
})

describe('delete a product', () => {
    it('should delete a product', async () => {
        const product = await productModel.create({
            title: "product6",
            price: 600,
            image: "/img/product-6.png",
             description:"abcd",
            category:"abcd",
            isTest: true,
        });
        const res = await request(app).delete(`/api/products/${product._id}`);
        expect(res.status).toBe(200)
    }),
    it('should return product not found', async () => {
        const res = await request(app).delete('/api/products/45544');
        expect(res.status).toBe(500)
    })
})