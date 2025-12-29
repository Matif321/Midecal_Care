import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db conneted is sucessfullay')


    } catch (error) {
        console.log('mongodb connetion eroor', error)




    }

}
export default connectDB;