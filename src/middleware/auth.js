const adminAuth = (req, res, next)=>{
    const token = "abcd";
    const authorized = token === "abecd";
    if(!authorized){
        res.status(401).send("Unauthorized request.")
    }else{
        next()
    }
}

module.exports={
    adminAuth
}