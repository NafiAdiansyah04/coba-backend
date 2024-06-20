const { nanoid } = require('nanoid');
const Events = require('../models/event');

// Adding New Event
const insertNewEvent = async (request, h) => {
  const {
    name,
    location,
    date,
    time,
    timezone,
    description,
    pictureId,
    categories,
  } = request.payload;
  const userReviews = [];

  const events = new Events({
    name,
    location,
    date,
    time,
    timezone,
    description,
    pictureId,
    categories,
    userReviews,
  });

  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Failed Adding Event. Please insert name of the event',
    }).code(400);
  }

  const result = await events.save();

  try {
    return h.response({
      error: false,
      status: 'success',
      message: 'New Event has been Added',
      eventId: result.id,
    }).code(201);
  } catch (err) {
    return err;
  }
};

// Get All events
const getAllEvents = async (request, h) => {
  const result = await Events.find();

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Show all event data',
      contentEvents: result,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Get Detail Event By Id
const getDetailEventById = async (request, h) => {
  const { eventId } = request.params;
  const result = await Events.findById(eventId);

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Show event data by ID',
      detailEvent: result,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Update or Edit Event Item By Id
const updateEventById = async (request, h) => {
  const { eventId } = request.params;
  const {
    name,
    location,
    date,
    time,
    timezone,
    description,
    pictureId,
    categories,
  } = request.payload;
  
  await Events.findByIdAndUpdate(eventId, {
    name,
    location,
    date,
    time,
    timezone,
    description,
    pictureId,
    categories,
  });

  if (!name) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Failed Adding Event. Please insert name of the event',
    }).code(400);
  }
  
  try {
    const findIdEvent = await Events.findById(eventId);
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Event has been updated',
      detailEvent: findIdEvent,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Delete Event By Id
const removeEventById = async (request, h) => {
  const { eventId } = request.params;
  await Events.findByIdAndRemove(eventId);

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Selected event has been removed',
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

// Adding Review Event
const insertEventReview = async (request, h) => {
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
      message: 'Review event failed to added. Please insert your name',
    }).code(400);
  }
  
  if (!_id) {
    return h.response({
      error: true,
      status: 'fail',
      message: 'Review event failed to added. Event ID not found',
    }).code(404);
  }

  await Events.findByIdAndUpdate({ _id }, {
    $push: {
      userReviews: {
        reviewId,
        name,
        date,
        review,
      },
    },
  });

  const isReviewInserted = await Events.findById({ _id }, {
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
      message: 'New comment Added. Show commment of selected event',
      userReviews: isReviewInserted.userReviews,
    }).code(201); 
  } catch (err) {
    return err;
  }
};

// Get Selected Categories Event
const getCategoriesEvent = async (request, h) => {
  const { categories } = request.query;
  const result = await Events.find({ categories });

  try {
    const response = h.response({
      error: false,
      status: 'success',
      message: 'Show article data',
      contentEvents: result,
    });
    response.code(200);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { 
  insertNewEvent,
  getAllEvents,
  getDetailEventById,
  updateEventById,
  removeEventById,
  insertEventReview,
  getCategoriesEvent,
};