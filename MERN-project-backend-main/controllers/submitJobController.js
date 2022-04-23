const asyncHandler = require('express-async-handler')
const postSchema = require('../models/postModel')

const SubmitJob =  asyncHandler(async (req, res) =>{
    // param id = post id 
      // console.log(req.user.id)
      // await postSchema.findByIdAndUpdate(req.params.id,{$push:{userSubmitted : req.body.userSubmitted }})
      // res.status(200).json(post) 
      console.log('job submitted')
     
    })
module.exports = SubmitJob
