
const asyncHandler = require('express-async-handler')
const postSchema = require('../models/postModel')


const GetSearch = asyncHandler(async (req, res) => {
    
  try{  
    if(req.body.wageMin >=0 || req.body.wageMax >= 0){
      if (req.body.wageMin >=0 && req.body.wageMax >= 0 ){
        console.log('case1')
        var posts = await postSchema.find(req.body).populate('user')
        .where({'wageMin':{$gte:req.body.wageMin} 
        , 'wageMax':{$lte:req.body.wageMax}})
      }
      else if (req.body.wageMin >=0  ){
        console.log('case2')
        var posts = await postSchema.find(req.body).populate('user')
        .where({'wageMin':{$gte:req.body.wageMin}  })
      }
      else if (req.body.wageMax >= 0 ){
        console.log('case3')
        var posts = await postSchema.find(req.body).populate('user')
        .where({ 'wageMax':{$lte:req.body.wageMax}})
      }
  }
    else{
      var posts = await postSchema.find(req.body).populate('user')
    }
    console.log(posts , "post length : ",posts.length)
    res.status(200).json(posts)
  
  }
  catch(err){
      console.log('Getsearch is error!')
      
    } 
})

// method get
const SelectedPost = asyncHandler(async (req, res) => {
    var post = await postSchema.findById(req.params.id).populate('user')
    console.log(post)
    console.log(post.user.id)
    res.status(200).json(post)
})

const SubmitJob = asyncHandler(async (req, res) => {
  var post = await postSchema.findById(req.params.id ).populate('user')
  console.log(post.user.id) 

  var post2 = await postSchema.findByIdAndUpdate(req.params.id , {$push:{'userSubmit':post.user.id}} )
  console.log(post2) 
  
res.status(200).json(post2)
})

  module.exports = {GetSearch,SelectedPost,SubmitJob}

