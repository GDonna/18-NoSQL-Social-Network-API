const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtbyID,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

const {
    addReaction,
    deleteReaction,
} = require('../../controllers/reactionController');

router.route('/').get(getAllThoughts);

// api thoughts/:id
router.route('/:id')
    .get(getThoughtbyID)
    .put(updateThought)
    .delete(deleteThought);

// api thoughts/:userId
router.route('/:userId')
    .post(createThought);

// api thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// api thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;