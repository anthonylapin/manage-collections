const { Schema, model, Types } = reqire('mongoose')
const validate = require('mongoose-validator')

const collectionSchema = Schema({
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        validate: descriptionValidator
    },
    topic: {
        type: Types.ObjectId,
        ref: 'Topic',
    },
    imageUrl: {
        type: String,
        trim: true
    },
    numericFieldKeys: [
        {
            type: String,
            trim: true
        }
    ],
    oneLineFieldKeys: [
        {
            type: String,
            trim: true
        }
    ],
    TextFieldKeys: [
        {
            type: String,
            trim: true
        }
    ],
    DateFieldKeys: [
        {
            type: String,
            trim: true
        }
    ],
    BooleanCheckboxesFieldKeys: [
        {
            type: String,
            trim: true
        }
    ],
    items: [
        {
            type: Types.ObjectId,
            ref: 'Item'
        }
    ]
})

let descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 140],
        message: 'Description field has to be between 0 and 140 characters'
    })
]

module.exports = model('Collection', collectionSchema)