const Book = require('../models/Book');
const { bookSchema, updateBookSchema } = require('../utils/validationSchemas');

// Get all books (with pagination)
exports.getAllBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find().skip(skip).limit(limit),
      Book.countDocuments()
    ]);

    res.json({
      success: true,
      count: books.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: books
    });
  } catch (err) {
    next(err);
  }
};

// Get a single book by ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    res.json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
};

// Create a new book
exports.createBook = async (req, res, next) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
};

// Update a book
exports.updateBook = async (req, res, next) => {
  try {
    const { error } = updateBookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
};

// Delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    next(err);
  }
};