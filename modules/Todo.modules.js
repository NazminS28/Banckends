const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    userId: {
        type:String,
        require : true
    },
    taskname: {
        type:String,
        require : true
    },
    status: {
        type:String,
        require : true
    },
    tag: {
        type:String,
        require : true
    }
})

const TodoModule = mongoose.model("todo", TodoSchema)

module.exports = {TodoModule}