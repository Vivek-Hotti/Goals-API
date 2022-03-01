const asyncHandler = require('express-async-handler')

// @desc    get Goals
// @desc    GET /api/goals
// @desc    Private
const getGoals = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Got all Goals'});
})

// @desc    set Goals
// @desc    POST /api/goals
// @desc    Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Set Goal'});
})

// @desc    update Goals
// @desc    PUT /api/goals/:id
// @desc    Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update Goal ${req.params.id}`});
})

// @desc    delete Goals
// @desc    DELETE /api/goals/:id
// @desc    Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete Goal ${req.params.id}`});
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}