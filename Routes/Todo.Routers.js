const  { Router } = require("express");
const { TodoModule } = require("../modules/Todo.modules");


require("dotenv").config()

const todoController = Router();

//get data
todoController.get("/",async(req,res)=>{
    const todo= await TodoModule.find({userId:req.body.userId})
    res.send(todo)
})

//post data
todoController.post("/create",async(req,res)=>{
    const{taskname,status,tag,userId}= req.body;
    const todo = new TodoModule({
        taskname,
        tag,
        status,
        userId
    })
    try{
        await todo.save()
        res.send({"msg":"task created"})
    }
    catch(err){
        res.send({"msg":"something went wrong"})
        console.log(err)
    }
})

//patch data
todoController.patch("/edit/:todoId",async(req,res)=>{
    const {todoId} = req.params;
    const updateTodo = await TodoModule.findOneAndUpdate({_id:todoId, userId:req.body.userId},req.body)
    if(updateTodo){
        res.send({"msg":"task updated"})
    }else{
        res.send({"msg":"something went worng"})
    }
})

//delete data
todoController.delete("/delete/:todoId",async(Req,res)=>{
    const{todoId}=req.params;

    const  deleteTodo = await TodoModule.findOneAndDelete({_id:todoId,userId:req.body.userId});
    if(deleteTodo){
        res.send({"msg":"task Deleted"})
    }else{
        res.send({"msg":"unable to delete"})
    }
})


module.exports = {todoController}