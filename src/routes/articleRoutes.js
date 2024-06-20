const Joi = require('joi');
const { 
    insertNewArticle,
    getAllArticles,
    getDetailArticleById,
    updateArticleById,
    removeArticleById,
    insertArticleReview,
    getCategoriesArticle,
} = require('../handler/article-handler');

const ArticleRoutes = [
  
  // Article
  {
    method: 'POST',
    path: '/api/articles',
    handler: insertNewArticle,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          publisherName: Joi.string().required(),
          publishDate: Joi.string().required(),
          categories: Joi.string().required(),
        }),
      },
  },
  },
  {
    method: 'GET',
    path: '/api/articles',
    handler: getAllArticles,
  },
  {
    method: 'GET',
    path: '/api/articles/{articleId}',
    handler: getDetailArticleById,
  },
  {
    method: 'PUT',
    path: '/api/articles/{articleId}',
    handler: updateArticleById,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          publisherName: Joi.string().required(),
          publishDate: Joi.string().required(),
          categories: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/articles/{articleId}',
    handler: removeArticleById,
  },
  
  // Review Article
  {
    method: 'POST',
    path: '/api/review-articles',
    handler: insertArticleReview,
    options: {
      validate: {
        payload: Joi.object({
          _id: Joi.string().required(),
          name: Joi.string().required(),
          review: Joi.string().required(),
        }),
      },
    },
  },

  // Find Categories Articles
  {
    method: 'GET',
    path: '/api/articles/find',
    handler: getCategoriesArticle,
  },
];
 
module.exports = ArticleRoutes;