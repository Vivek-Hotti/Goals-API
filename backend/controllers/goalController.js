const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    get Goals
// @desc    GET /api/goals
// @desc    Private
const getGoals = asyncHandler (async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals);
})

// @desc    set Goals
// @desc    POST /api/goals
// @desc    Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal);
})

// @desc    update Goals
// @desc    PUT /api/goals/:id
// @desc    Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }


    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateGoal);
})

// @desc    delete Goals
// @desc    DELETE /api/goals/:id
// @desc    Private
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

        // Check for user
        const user = await User.findById(req.user.id)
        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }
    
        // Make sure the logged in user matches the goal user
        if(goal.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

    await goal.remove()
    // const deleteGoal = await Goal.findByIdAndRemove(req.params.id)

    res.status(200).json({id: req.params.id});
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}