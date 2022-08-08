
// models/User.js

import { Schema, model, models } from 'mongoose';

const projects = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    date: String,
    description: String,
    image: String,
    link: String,
    icons: Array
})

module.exports = models.projects || model('projects', projects)