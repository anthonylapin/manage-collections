const {Schema, model, Types} = require('mongoose')

const tagSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    items: [
        {
            type: Types.ObjectId,
            ref: 'Item'
        }
    ]
})

module.exports = model('Tag', tagSchema)