import dotenv from 'dotenv';
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;
const db_url = process.env.DB_URL;

export { jwt_secret, db_url }