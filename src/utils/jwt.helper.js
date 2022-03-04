import jwt from 'jsonwebtoken';
import { jwt_secret } from '../../config.js';


function decodeToken(token) {
    return jwt.decode(token.replace('Bearer ', ''));
}

function getJWTToken(data) {
    const token = `Bearer ${jwt.sign(data, jwt_secret)}`;
    return token;
}

export { decodeToken, getJWTToken, };
