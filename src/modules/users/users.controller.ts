import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./users.service";

const createUsers = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const result = await userService.createUsers(req.body)
    // console.log(result.rows[0]);
    res.status(201).json({
      success: false,
      message: "Data Instered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getUser = async(req: Request, res: Response) => {

  try {
    const result = await userService.getUser()
    

    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: result.rows
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
}

const getSingleUser = async(req: Request, res: Response) => {
  
  try {
    const result = await userService.getSingleUser(req.params.id as string)

    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
        message: "User now found"
      })
    }else {
      res.status(200).json({
        success: true,
        message: "Users fetch successfully",
        data: result.rows[0]
      })
    }
    
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

}

const updateUser =  async(req: Request, res: Response) => {

      const {name, email} = req.body
  try {
    const result = await userService.updateUser(name, email, req.params.id!)

    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
        message: "User not found"
      })
    }else{
      res.status(200).json({
        success: true,
        message: "User Updated successfully",
        data: result.rows[0]
      })
    }

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}



const deleteUser = async(req: Request, res: Response) => {
  
  try {
    const result = await userService.deleteUser(req.params.id!)

    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
        message: "User now found"
      })
    }else {
      res.status(200).json({
        success: true,
        message: "Users Deleted successfully",
        data: result.rows
      })
    }
    
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

}


 const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    // Validate user exists
    const userCheck = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [user_id]
    );

    if (userCheck.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found. Invalid user_id.",
      });
    }

    // Call service
    const todo = await userService.createTodo(user_id, title);

    res.status(201).json({
      success: true,
      message: "Todo inserted successfully",
      data: todo,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTodo = async(req: Request, res: Response) => {

  try {
    const result = await userService.getTodo()
    

    res.status(201).json({
      success: true,
      message: "Todos Created successfully",
      data: result.rows
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
}

const getTodoById = async(req: Request, res: Response) => {
  
  try {
 
    const result = await userService.getTodoById(req.params.id!)
    //    console.log("Received ID:", req.params.id); 
    // console.log("ID Type:", typeof req.params.id);

    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
        message: "User now found"
      })
    }else {
      res.status(200).json({
        success: true,
        message: "Todos fetch successfully",
        data: result.rows[0]
      })
    }
    
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

}


const updateTodo = async(req: Request, res: Response) => {

      const {user_id, title} = req.body
  try {
    const result = await userService.updateTodo(user_id, title, req.params.id!)

    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
        message: "User not found"
      })
    }else{
      res.status(200).json({
        success: true,
        message: "Todos Updated successfully",
        data: result.rows[0]
      })
    }

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}


const deleteTodo = async(req: Request, res: Response) => {
  
  try {
    const result = await userService.deleteTodo(req.params.id!)

    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
        message: "User now found"
      })
    }else {
      res.status(200).json({
        success: true,
        message: "Todos Deleted successfully",
        data: result.rows
      })
    }
    
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

}

const updateTodoById =  async(req: Request, res: Response) => {

      const {user_id, title} = req.body
  try {
    const result = await userService.updateTodoById(user_id, title, req.params.id!)

    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
        message: "User not found"
      })
    }else{
      res.status(200).json({
        success: true,
        message: "Todos Updated successfully",
        data: result.rows[0]
      })
    }

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export const userController = {
    createUsers,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,

   createTodo,
   getTodo,
   getTodoById, 
   updateTodo,
   deleteTodo,
  updateTodoById
}