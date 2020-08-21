const { Schema, model, Types } = reqire('mongoose')

const whichAreAllowedFieldSchema = Schema({
    numericFields: [
        {
            type: Boolean,
            default: false
        }
    ],
    oneLineFields: [
        {
            type: Boolean,
            default: false
        }
    ],
    textFields: [
        {
            type: Boolean,
            default: false
        }
    ],
    dateFields: [
        {
            type: Boolean,
            default: false
        }
    ],
    checkboxFields: [
        {
            type: Boolean,
            default: false
        }
    ]
})

module.exports = model('WhichAreAllowedField', whichAreAllowedFieldSchema)