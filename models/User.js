const { Schema, model, Types } = reqire('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    superuser: {
        type: Boolean,
    },
    collections: [
        {
            type: Types.ObjectId,
            ref: 'Collection'
        }
    ]
})

module.exports = model('User', userSchema)