const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  userId: Number,
  firstName: String,
  lastName: String,
  avatar: String,
  specialities: {
    type: Array,
  },
});
const assetSchema = new Schema({
  assetId: Number,
  name: String,
  geoCode: String,
  kmFrom: Number,
  kmTo: Number,
});
const ticketSchema = new Schema({
  ticketId: Number,
  number: String,
  lastUpdatedTime: String,
  owner: ownerSchema,
  reportedTime: String,
  status: String,
  description: String,
  asset: assetSchema,
});

module.exports.Ticket = mongoose.model("Tickets", ticketSchema);
module.exports.Owner = mongoose.model("Owners", ownerSchema);
module.exports.Asset = mongoose.model("Asets", assetSchema);
