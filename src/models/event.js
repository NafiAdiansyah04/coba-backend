const mongoose = require('mongoose');
const { Schema } = mongoose;

const Events = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    timezone: {
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
  
  module.exports = mongoose.model('Events', Events);