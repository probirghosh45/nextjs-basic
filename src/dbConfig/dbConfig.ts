import mongoose from 'mongoose';

export async function connect (){
    try{
      mongoose.connect(process.env.MONGO_URI!)
      const connection = mongoose.connection

      connection.on("connect", () => {
        console.log("mongodb connected successfully")
      })

      connection.on("error", (error) => {
        console.log("mongodb connection failed!" + error)
        process.exit;
      })
    } catch (error) {
         console.log("somethings wents wrong")
         
         if (error instanceof Error) {
             console.log(error.message);
         } else {
             console.log("Unknown error", error);
         }

    }
}