import books from "../../db";

export const PUT = async (request: Request, context: { params: { id: string } }) => {
    const id = +context.params.id;//+converts the string to number
    const book = await request.json();

    const index = books.findIndex((b) => b.id === id)
    books[index] = book;
    return Response.json(books)
}

export const DELETE = (
    request: Request,
    context: { params: { id: string } }) => {

    const id = +context.params.id;//+converts the string to number

    const index = books.findIndex((b) => b.id === id)
    books.splice(index, 1);
    return Response.json(books)

}