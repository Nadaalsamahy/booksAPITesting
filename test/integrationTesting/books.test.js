require('../../config/config');
const booksService = require ('../../src/api/resources/books/books.service')
const Book = require ('../../src/api/resources/books/books.model')

//afterEach(()=>{});
beforeEach(async()=>{
    await Book.deleteMany({})

});
afterAll(async()=>{
    await Book.deleteMany({})

})

describe('getBooks',()=>{
it('should return empty array',async () => {

    const books = await booksService.getBooks();
    expect(books.length).toBe(0);
});
it('should return 2 books ',async ()=>{
    await Book.insertMany([{title:'book1'}, {title:'book2'}])
    const books=await booksService.getBooks();
    expect(books.length).toBe(2);
    expect(books[0]).toMatchObject({title:'book1'})

})
})
describe('createBooks',()=>{

    it('should be create book with title java ',async ()=>{
        await booksService.createBook({title:'java'});
        const books = await Book.find({});
        expect(books.length).toBe(1);
        expect(books[0]).toMatchObject({title:'java'});


    });
});