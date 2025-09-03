import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { toast } from "sonner";
import { getImageKitAuthParams } from "./imagekit-auth";

const authenticator = async () => {
    try {
        const response = await getImageKitAuthParams()
        if(!response.success){
        const errorText =  response.error;
        throw new Error(`Request failed : ${errorText}`);
        }
        const { signature, expire, token, publicKey } = response;
        if (!signature || !expire || !token || !publicKey) {
            throw new Error('Missing required auth parameters');
        }
        return { signature, expire, token, publicKey };
    }catch (error) {
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
}

export async function uploadToImageKit(file:File, name:string){
    let authParams
    try {
        authParams = await authenticator()
    } catch (authError) {
        toast.error("Failed to authenticate for upload")
        console.error("Failed to authenticate for upload:", authError);
        return;
    }
    
    const { signature, expire, token, publicKey } = authParams;
    try {
        const uploadResponse = await upload({
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: name,
        }) 
        return uploadResponse.url
    }catch(error){
        console.error('Upload error:', error)
        let errorMessage = 'Failed to upload image'
        if (error instanceof ImageKitAbortError) {
          errorMessage = 'Upload was cancelled';
          console.error("Upload aborted:", error.reason);
        } else if (error instanceof ImageKitInvalidRequestError) {
          errorMessage = 'Invalid upload request';
          console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
          errorMessage = 'Network error during upload';
          console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
          errorMessage = 'Server error during upload';
          console.error("Server error:", error.message);
        } else {
          console.error("Upload error:", error);
          if (error instanceof Error) {
            errorMessage = error.message;
          }
        }
    }
}