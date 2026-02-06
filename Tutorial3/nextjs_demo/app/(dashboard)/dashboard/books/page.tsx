import React from 'react'

type Book = {
    id: number;
    name: string;
};

const Books = async () => {
    const response = await fetch("http://localhost:3000/api/books", { cache: "no-store" });
    const books: Book[] = await response.json();
    return (
        <main>
            {books.map((book) => (
                <p key={book.id}>{book.name}</p>
            ))}
        </main>
    )
}

export default Books