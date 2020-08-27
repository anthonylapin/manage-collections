const {Router} = require('express')
const { check, validationResult } = require('express-validator')
const router = Router()

router.post('/create',
    [
      check('name', 'Name should exist').exists(),
      check('description', 'Description must be non-empty and maximum 140 characters.').isLength({
          min: 1,
          max: 140
      }),
      check('topic', 'Topic must exist.').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during creating new collection.'
                })
            }
        } catch(e) {
            res.status(500).json({
                message: 'Something went wrong, try again.'
            })
        }
    }
)

module.exports = router