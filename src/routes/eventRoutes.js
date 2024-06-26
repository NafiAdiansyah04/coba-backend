const Joi = require('joi');
const { 
    insertNewEvent,
    getAllEvents,
    getDetailEventById,
    updateEventById,
    removeEventById,
    insertEventReview,
    getCategoriesEvent,
} = require('../handler/event-handler');

const EventRoutes = [
  // Event
  {
    method: 'POST',
    path: '/events',
    handler: insertNewEvent,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          location: Joi.string().required(),
          date: Joi.string().required(),
          time: Joi.string().required(),
          timezone: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          categories: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/events',
    handler: getAllEvents,
  },
  {
    method: 'GET',
    path: '/events/{eventId}',
    handler: getDetailEventById,
  },
  {
    method: 'PUT',
    path: '/events/{eventId}',
    handler: updateEventById,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          location: Joi.string().required(),
          date: Joi.string().required(),
          time: Joi.string().required(),
          timezone: Joi.string().required(),
          description: Joi.string().required(),
          pictureId: Joi.string().optional(),
          categories: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/events/{eventId}',
    handler: removeEventById,
  },
  
  // Review Event
  {
    method: 'POST',
    path: '/review-events',
    handler: insertEventReview,
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

  // Find Categories Events
  {
    method: 'GET',
    path: '/events/find',
    handler: getCategoriesEvent,
  },
];
 
module.exports = EventRoutes;
