// bookstore.js (Node.js + Express based API for bookshop)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.json());

// 👇 Root route to show welcome message
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Bookstore API! Use /books to get started.');
});

let books = {
  "12345": { title: "Node for Beginners", author: "John Doe", reviews: {} },
  "67890": { title: "Express in Action", author: "Jane Smith", reviews: {} }
};

let users = {}; // username: password

// Task 1: Get book list
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2: Get books by ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});

// Task 3: Get books by author
app.get('/books/author/:author', (req, res) => {
  const result = Object.values(books).filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  res.json(result);
});

// Task 4: Get books by title
app.get('/books/title/:title', (req, res) => {
  const result = Object.values(books).filter(b => b.title.toLowerCase() === req.params.title.toLowerCase());
  res.json(result);
});

// Task 5: Get book review
app.get('/books/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  book ? res.json(book.reviews) : res.status(404).json({ message: 'Book not found' });
});

// Task 6: Register new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(400).json({ message: 'User already exists' });
  users[username] = password;
  res.json({ message: 'User registered successfully' });
});

// Task 7: Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Task 8: Add/modify review
app.put('/review/:isbn', (req, res) => {
  const { username, review } = req.body;
  const book = books[req.params.isbn];
  if (book) {
    book.reviews[username] = review;
    res.json({ message: 'Review added/updated' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Task 9: Delete review
app.delete('/review/:isbn/:username', (req, res) => {
  const { isbn, username } = req.params;
  const book = books[isbn];
  if (book && book.reviews[username]) {
    delete book.reviews[username];
    res.json({ message: 'Review deleted' });
  } else {
    res.status(404).json({ message: 'Book or review not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
