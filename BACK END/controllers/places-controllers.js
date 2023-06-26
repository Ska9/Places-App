const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const Place = require("../models/place");
const User = require("../models/user");

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input", 422));
  }
  const { title, description, location, address, creator } = req.body;
  const createdPlace = new Place({
    title: title,
    description: description,
    location: location,
    address: address,
    creator: creator,
    image: "https://media.timeout.com/images/101705309/1024/576/image.jpg",
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Couldn't find user id provided!", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User doesn't exist!", 404);
    return next(error);
  }

  try {
    const ss = await mongoose.startSession();
    ss.startTransaction();
    await createdPlace.save({ session: ss });
    user.places.push(createdPlace);
    await user.save({ session: ss });
    await ss.commitTransaction();
  } catch (err) {
    const error = new HttpError("Failed to create new place!", 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something wrong, try again!", 500);
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Could not find place for the place id provided!",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Fetching failed!", 500);
    return next(error);
  }
  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find place for the user id provided!",
      404
    );
    return next(error);
  }
  res.json({ places: places.map((place) => place.toObject()) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422);
    return next(error);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let updatedPlace;

  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Fetching for this id failed!", 500);
    return next(error);
  }

  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (err) {
    const error = new HttpError("Something wrong when saving updated place!");
    return next(error);
  }

  res.status(200).json({ place: updatedPlace.toObject() });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError("Could not find id", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Something wrong!", 404);
    return next(error);
  }

  try {
    const ss = await mongoose.startSession();
    ss.startTransaction();
    await Place.deleteOne({ _id: placeId }, { session: ss });
    place.creator.places.pull(place);
    await place.creator.save({ session: ss });
    await ss.commitTransaction();
  } catch (err) {
    const error = new HttpError("Deleting place failed!", 500);
    return next(error);
  }

  res.status(200).json({ message: "Place deleted!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
