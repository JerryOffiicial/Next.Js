import books from "../db";

export const GET = async () => {
    return Response.json(books)
}

export const POST = async (request: Request) => {
    const book = await request.json();
    books.push(book)

    return Response.json(books)
}

  