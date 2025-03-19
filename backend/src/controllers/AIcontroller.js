const {codeReviewer} = require("../services/AIservice")

module.exports.getReview = async(req,res)=>{

    const code= req.body.code; 
    if(!code) return res.status(400).send("code is requierd!!");
    
    const response = await codeReviewer(code);
    res.send(response)
}

