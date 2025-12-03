import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";




const app = express();
const port = config.port;

// parser
app.use(express.json());

// 🔥 Direct Neon URL ব্যবহার করো, pooler না
const pool = new Pool({
  connectionString: config.connection_str
});

// DB init
const initDB = async () => {
  try {
    // users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // todos table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // console.log("Both tables created successfully");
  } catch (err: any) {
    console.error("DB Error:", err.message);
  }
};


initDB();


const logger = ((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`)
    next()
})



// Test route
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello, API is working");
});


//users CRUD for post
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );
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
});

// users crud for get
app.get("/users", async(req: Request, res: Response) => {

  try {
    const result = await pool.query(`SELECT * FROM users`)
    

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
})

// single user
app.get("/users/:id", async(req: Request, res: Response) => {
  
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id])

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

})


// update user
app.put("/users/:id", async(req: Request, res: Response) => {

      const {name, email} = req.body
  try {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id =$3 RETURNING *`, [name, email, req.params.id])

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
})

// delete user
app.delete("/users/:id", async(req: Request, res: Response) => {
  
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id])

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

})


// todos crud post
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );
    // console.log(result.rows[0]);
    res.status(201).json({
      success: false,
      message: "Todo Instered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// todos crud get
app.get("/todos", async(req: Request, res: Response) => {

  try {
    const result = await pool.query(`SELECT * FROM todos`)
    

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
})



// todos single user
app.get("/todos/:id", async(req: Request, res: Response) => {
  
  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [req.params.id])

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

})

// todos update user by id
app.put("/todos/:id", async(req: Request, res: Response) => {

      const {user_id, title} = req.body
  try {
    const result = await pool.query(`UPDATE todos SET user_id=$1, title=$2 WHERE id =$3 RETURNING *`, [user_id, title, req.params.id])

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
})


// delete todos user
app.delete("/todos/:id", async(req: Request, res: Response) => {
  
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [req.params.id])

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

})


// not found 
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    path: req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
