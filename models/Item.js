const { Schema, model, Types } = reqire('mongoose')
const validate = require('mongoose-validator')

const itemSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    tags: [
        {
            type: Types.ObjectId,
            ref: 'Tag'
        }
    ],
    numericFields: [
        {
            value: Number,

        }
    ]
})

module.exports = model('Item', itemSchema)