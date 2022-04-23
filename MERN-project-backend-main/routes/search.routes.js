
const express = require('express')
const router = express.Router()

const { GetSearch, SelectedPost, SubmitJob } = require('../controllers/searchController')

router.post('/',GetSearch)
router.get('/:id',SelectedPost)
router.put('/:id',SubmitJob)

module.exports = router

