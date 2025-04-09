exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid resource ID'
      });
    }
  
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
  
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  };
  
  exports.notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      error: 'Endpoint not found'
    });
  };