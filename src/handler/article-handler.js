const { nanoid } = require('nanoid');
const Articles = require('../models/article');

// Adding New Article
const insertNewArticle = async (request, h) => {
  const {
    name,
    description,
    pictureId,
    publisherName,
    publishDate,
    categories,
  } = request.payload;
  const userReviews = [];

  const articles = new Articles({
      name,
      description,
      pictureId,
      publisherName,
      publishDate,
      categories,
      userReviews,
  });

  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Failed Adding Article. Please insert name of the article',
    }).code(400);
  }

  const result = await articles.save();

  try {
    return h.response({
      error: false,
      status: 'success',
      message: 'New Article has been Added',
      articleId: result.id,
    }).code(201);
  } catch (err) {
    return err;
  }
};

// Get All Articles
const getAllArticles = async (request, h) => {
  const result = await Articles.find();

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Show all article data',
      contentArticles: result,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Get Detail Article By Id
const getDetailArticleById = async (request, h) => {
  const { articleId } = request.params;
  const result = await Articles.findById(articleId);

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Show article data by ID',
      detailArticle: result,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Update or Edit Article Item By Id
const updateArticleById = async (request, h) => {
  const { articleId } = request.params;
  const {
    name,
    description,
    pictureId,
    publisherName,
    publishDate,
    categories,
  } = request.payload;

  await Articles.findByIdAndUpdate(articleId, {
    name,
    description,
    pictureId,
    publisherName,
    publishDate,
    categories,
  });

  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Failed Adding Article. Please insert name of the article',
    }).code(400);
  }

  try {
    const findIdArticle = await Articles.findById(articleId);
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Article has been updated',
      detailArticle: findIdArticle,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Delete Article By Id
const removeArticleById = async (request, h) => {
  const { articleId } = request.params;
  await Articles.findByIdAndRemove(articleId);

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Selected article has been removed',
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Adding Review Article
const insertArticleReview = async (request, h) => {
  const {
    _id,
    name,
    review,
  } = request.payload;

  const reviewId = nanoid(6).toLowerCase();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date().toLocaleDateString('en-GB', options);

  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Review article failed to added. Please insert your name',
    }).code(400);
  }
  
  if (!_id) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Review article failed to added. Article ID not found',
    }).code(404);
  }

  await Articles.findByIdAndUpdate({ _id }, {
    $push: {
      userReviews: {
        reviewId,
        name,
        date,
        review,
      },
    },
  });

  const isReviewArticleAdded = await Articles.findById({ _id }, {
      userReviews: {
        reviewId,
        name,
        date,
        review,
      },
  });

  try {
    return h.response({
      error: false,
      status: 'success',
      message: 'New comment Added. Show commment of selected article',
      userReviews: isReviewArticleAdded.userReviews,
    }).code(201); 
  } catch (err) {
    return err;
  }
};

// Get Selected Categories Article
const getCategoriesArticle = async (request, h) => {
  const { categories } = request.query;
  const result = await Articles.find({ categories });

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Show article data',
      contentArticles: result,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { 
    insertNewArticle,
    getAllArticles,
    getDetailArticleById,
    updateArticleById,
    removeArticleById,
    insertArticleReview,
    getCategoriesArticle,
};