import { pool } from "../../config/db"
import bcrypt from "bcryptjs";

const createUsers = async(payload: Record<string, unknown>)  =>{
    const {name, role, email, password} = payload;

    const hashed = await bcrypt.hash(password as string, 10)
    const result = await pool.query(
          `INSERT INTO users(name, role, email, password) VALUES($1, $2, $3, $4) RETURNING *`,
          [name, role, email, hashed]    
)
   return result 

}


const getUser = async () => {
    const result = pool.query(`SELECT * FROM users`)
    return result
}

const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return result
}

const updateUser = async (name: string, email: string, id: string) => {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id =$3 RETURNING *`, [name, email, id])
    return result
}

const deleteUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return result;
}

const createTodo = async (user_id: number, title: string) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
    [user_id, title]
  );

  return result.rows[0];
};

const getTodo =  async() => {
    const result = await pool.query(`SELECT * FROM todos`)
    return result 
}

const getTodoById = async(id: string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id])
    return result
}

const updateTodo = async(user_id: number, title: string, id: string) => {
  const result = await  pool.query(`UPDATE todos SET user_id=$1, title=$2 WHERE id =$3 RETURNING *`, [user_id, title, id])

    return result
}

const updateTodoById = async(user_id: number, title: string, id: string) => {
    const result =  await pool.query(`UPDATE todos SET user_id=$1, title=$2 WHERE id =$3 RETURNING *`, [user_id, title, id])

    return result
}


const deleteTodo = async(id: string) => {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [id])

    return result
}

export const userService = {
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