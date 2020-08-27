const {Router} = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth.middleware')
const Collection = require('../models/Collection')
const router = Router()

router.post('/create',
    auth,
    [
      check('name', 'Name should exist').exists().isLength({
          min: 1
      }),
      check('description', 'Description must be non-empty and maximum 140 characters.').isLength({
          min: 1,
          max: 140
      }),
      check('topic', 'Topic must exist.').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during creating new collection.'
            })
        }
        try {
            const newCollection = await createNewCollection(req.body)
            res.status(201).json({
                message: `New collection ${newCollection.name} is created.`
            })
        } catch(e) {
            res.status(500).json({
                message: 'Something went wrong, try again.'
            })
        }
    }
)

async function createNewCollection(body) {
    const newCollection = new Collection({
        name: body.name,
        owner: user.userId,
        description: body.description,
        topic: body.topicId,
        image: body.imageUrl,
        numericField1: body.numericField1,
        numericField2: body.numericField2,
        numericField3: body.numericField3,
        oneLineField1: body.oneLineField1,
        oneLineField2: body.oneLineField2,
        oneLineField3: body.oneLineField3,
        textField1: body.textField1,
        textField2: body.textField2,
        textField3: body.textField3,
        dateField1: body.dateField1,
        dateField2: body.dateField2,
        dateField3: body.dateField3,
        checkboxField1: body.checkboxField1,
        checkboxField2: body.checkboxField2,
        checkboxField3: body.checkboxField3
    })
    await newCollection.save()
    return newCollection
}

module.exports = router