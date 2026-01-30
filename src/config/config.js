import dotenv from 'dotenv';

dotenv.config()

export const config = {
    app : {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    mongoDB : {
        uri : process.env.MONGO_URI,
        password: process.env.DB_PASSWORD
    }
};
