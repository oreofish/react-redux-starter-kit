"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Schema
 */
var DocumentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  picture: { type: String, default: '' },
  attachments: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

DocumentSchema.pre("save", function(next) {
  this.updated = new Date();
  next();
});

mongoose.model("Document", DocumentSchema);
