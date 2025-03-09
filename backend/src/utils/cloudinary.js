import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

 // Configuration
 cloudinary.config({ 
    cloud_name: `${process.env.CLOUD_NAME}`, 
    api_key: `${process.env.API_KEY}`, 
    api_secret: `${process.env.API_SECRET}`
});


const uploadFiltToCloudinary = async (file) => {
     try {
        if(!file) throw new Error('File is required')

            return new Promise((resolve, reject) => {
                 cloudinary.uploader.upload_stream({resource_type:'auto'}, (error, result) => {
                    if(error){
                        reject(new Error(`Cloudinary upload error: ${error.message}`))
                    }else{
                        resolve(result)
                    }
                 }).end(file.buffer)
            })

     } catch (error) {
        console.log("Error uploading file to cloudinary", error.message)
     }
}

export default uploadFiltToCloudinary;