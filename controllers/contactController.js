const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10, sort } = req.query;
  let query = { user_id: req.user.id };

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    query = {
      ...query,
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { phone: { $regex: searchRegex } },
      ],
    };
  }
  let sortOption;

  switch (sort) {
    case 'name':
      sortOption = { name: 1 };
      break;
    case 'newAdded':
      sortOption = { createdAt: -1 };
      break;
    case 'lastAdded':
      sortOption = { createdAt: 1 };
      break;
    default:
      sortOption = {}; 
  }

  console.log('sort:', sort);
  console.log('sortOption:', sortOption);

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit));

  const totalContacts = await Contact.countDocuments(query);

  res.status(200).json({
    contacts,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalContacts / limit),
  });
});

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};