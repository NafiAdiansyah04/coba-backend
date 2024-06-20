const mongoose = require('mongoose');
const { Schema } = mongoose;

const Articles = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pictureId: {
      type: String,
      required: false,
    },
    publisherName: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    userReviews: [
      {
        _id: false,
        reviewId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
      },
    ],
  }, {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Articles', Articles);