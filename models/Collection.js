const { Schema, model, Types } = reqire('mongoose')

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
        trim: true
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

module.exports = model('Collection', collectionSchema)