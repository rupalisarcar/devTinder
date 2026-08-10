const mongoose =  require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://rupalisarcar:Sarcar2026@namastenode.ioll67s.mongodb.net/devTinder");
}

module.exports=  connectDB