import mongoose from 'mongoose'


export const connectionString='mongodb://127.0.0.1:27017/coderSession';
try {
    await mongoose.connect(connectionString)
    console.log("conectado a la base de datos de mongo DB");
} catch (error) {
    console.log(error);
}