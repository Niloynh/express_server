import dotnev from "dotenv";
import path from "path"

dotnev.config({path: path.join(process.cwd(), ".env")});


const config = {
    connection_str : process.env.CONNECTION_STR,
    port : process.env.PORT,
    jwtSecret: process.env.JWT_SECRET
}

export default config;