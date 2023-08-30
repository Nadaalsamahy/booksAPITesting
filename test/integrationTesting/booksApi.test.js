const request =require ('supertest');
const mongoose =require ('../../config/config');
const server = require ('../../app');
const Book = require ('../../src/api/resources/books/books.model')

afterEach(async () => {
    await Book.deleteMany({});
});
afterAll(async () => {
    server.close();
    await mongoose.disconnect();
});
describe('getBook', () => {
it('should return 200 and get book from db ', async() => {
   const book =await Book.create({title:'My Book'});
   const res = await request(server).get(`/api/books/${book.id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch('book retrieved successfully');
    expect(res.body.data.book).toMatchObject({title: 'My Book'});

}) ;
it('should return 404 if book not found ', async() => {

    const res = await request (server).get('/api/books/64ee9288508eb2f616ccf74b');
    expect (res.status).toBe(404);
    expect(res.body.message).toMatch('not found');
});
});
describe('updateBook', () => {
    it('should return 404 if book not found ', async () => {
        const res = await request (server).put(
            '/api/books/64ee612cce24a2f6dd8fc289'
            );
        expect (res.status).toBe(404);
        expect(res.body.message).toMatch('not found');
    });
    it ('should be return 200 and update the book ',async ()=> { 
        const book =await Book.create({title:'My Book'});

        const res = await request(server)
        .put(`/api/books/${book.id}`)
        .send({title: 'My book updated'});
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('book updated successfully');
        expect(res.body.data.book).toMatchObject({title: 'My book updated'}); 




    });
});
describe('deleteBook', () =>{

    it('should return 200 and delete the book',async () =>{
        const book =await Book.create({title:'My Book'});

        const res = await request (server).delete(`/api/books/${book.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('book deleted successfully');

    });

})