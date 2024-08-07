import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Setting a timeout of 2 minutes (120000 milliseconds)
        // const response = await cloudinary.uploader.upload(localFilePath, {
        //     timeout: 60000 // Timeout in milliseconds
        // });
        const res = await cloudinary.uploader.upload(localFilePath, {timeout:60000}, function(error,result){
            console.log(result);
        });

        console.log(res);

        // File has been uploaded successfully
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export { uploadOnCloudinary };
