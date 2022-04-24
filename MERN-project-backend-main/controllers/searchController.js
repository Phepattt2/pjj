
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
    console.log("Getsearch")
    res.json(posts)
  
  }
  catch(err){
      console.log('Getsearch is error!')
    } 
})

// method get
const SelectedPost = asyncHandler(async (req, res) => {
    var post = await postSchema.findById(req.params.id)
    console.log('selectedPost')
    res.json(post)
})

const SubmitJob = asyncHandler(async (req, res) => {
  var post = await postSchema.findById(req.params.id )
  console.log(post.user._id) 
  console.log('post : ',post) 
  var post2 = await postSchema.findByIdAndUpdate(req.params.id , {$push:{'userSubmit':post.user._id}} ).populate('user').populate('userSubmit')
  console.log('post2 :',post2) 
  
res.json(post2)
})

  module.exports = {GetSearch,SelectedPost,SubmitJob}

