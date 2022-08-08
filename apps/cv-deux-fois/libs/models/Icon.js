
// models/User.js

import { Schema, model, models } from 'mongoose';

const icons = new Schema({
    _id: Schema.Types.ObjectId,
    img_link: String,
    name: String,
    border_color: String,
    category: String,
})

module.exports = models.icons || model('icons', icons)