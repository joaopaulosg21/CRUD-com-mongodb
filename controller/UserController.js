import { ObjectId } from "mongodb";
import "dotenv/config";
import database from "../database/conexao.js";
const collection = database.collection(process.env.COLLECTION);

async function newUser(req,res){
    const {name,email} = req.body;
    try{
        const user = await collection.findOne({email:email});
        if(user){
            res.status(200).json({msg:"Email já cadastrado"});
        }else{
            await collection.insertOne({name:name,email:email});
            res.status(201).json({msg:"Novo usuario cadastrado"});
        }
    }catch(error){
        res.status(500).json({msg:"Erro no servidor"});
    }
}

function viewUsers(req,res){
    try{
        collection.find().toArray((error,result)=>{
            if(error){
                res.status(200).json({msg:error});
            }else{
                res.status(200).json(result);
            }
        });
    }catch(error){
        res.status(500).json({msg:"Houve um erro no servidor"});
    }
}

async function updateUser(req,res){
    const id = new ObjectId(req.params.id);
    const {name,email} = req.body;
    try{
        const user = await collection.findOne({_id:id});
        if(user){
            await collection.updateOne({_id:id},{$set:{name:name,email:email}});
            res.status(200).json({msg:"Usuario atualizado"});
        }else{
            res.status(404).json({msg:"Usuario não existe"});
        }
    }catch(error){
        res.status(500).json({msg:"Erro no servidor"});
    }
}

async function deleteUser(req,res){
    const id = new ObjectId(req.params.id);
    try{
        const user = await collection.findOne({_id:id});
        if(user){
            await collection.deleteOne({_id:id});
            res.status(200).json({msg:"Usuario deletado"});
        }else{
            res.status(404).json({msg:"Usuario não existe"});
        }
    }catch(error){
        res.status(500).json({msg:"Erro no servidor"})
    }
}
export {newUser,viewUsers,updateUser,deleteUser};