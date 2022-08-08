
// models/User.js

import { Schema, model, models } from 'mongoose';

const techs = new Schema({
    value: String,
    text: String
})

module.exports = models.techs || model('techs', techs)