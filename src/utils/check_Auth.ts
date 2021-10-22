require('dotenv')
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY



export default (headers) => {
    if (headers) {
        if (headers.authorization) {
            const token = headers.authorization.split('Bearer ')[1];
            if (token) {
                try{
                    const user = jwt.verify(token, key);
                    return user
                } catch(err){
                    throw new Error('Invalid/Expired Token')
                }
            }
            throw new Error('Authentication token must be \'Bearer [token]') 
        }
        throw new Error('Authorization header must be provied')
    }
    throw new Error('Headers must be provieded')
}
