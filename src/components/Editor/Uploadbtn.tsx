import { Image } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor, useEditorState } from "@tiptap/react"
import { toast } from "sonner"
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useState } from "react";

// interface File extends Blob {
//   readonly name: string;
//   readonly size: number;
//   readonly type: string;
//   readonly lastModified: number;
// }
let pendingImages = new Map()

export const OwnImageUploadBtn = ({editor}:{editor:Editor|null}) => {

 const [progress, setProgress] = useState(0);
 const [isUploading, setIsUploading] = useState<boolean>(false);

 const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth")
      if(!response.ok){
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      if (!signature || !expire || !token || !publicKey) {
            throw new Error('Missing required auth parameters');
        }
      return { signature, expire, token, publicKey };
    }catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
   }
 }

 const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB';
    }
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return 'File type not supported. Please use JPG, PNG, GIF, WebP, or SVG';
    }

    return null;
  };

 const handleClick = () => {
    if (isUploading) {
      toast.warning('Please wait for the current upload to complete');
      return;
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = async(e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      
      if(!file){
        toast("No Image selected")
        return
      }

      const validationError = validateFile(file);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      let objectUrl: string|null = null
      let loadingToast: string | number | undefined;
      let authParams

      setIsUploading(true);
      setProgress(0);

      try {
        authParams = await authenticator()
      } catch (authError) {
        toast.error("Failed to authenticate for upload")
        console.error("Failed to authenticate for upload:", authError);
        setIsUploading(false);
        return;
      }

      const { signature, expire, token, publicKey } = authParams;
      // console.log(authParams)
      try{
        objectUrl = URL.createObjectURL(file);
        editor?.chain().focus().setImage({ src: objectUrl }).run();
        loadingToast = toast.loading('Preparing upload...', {
          duration: 30000,
        });
        console.log('Uploading with parameters:', {
          hasFile: !!file,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          authParams: {
            expire,
            hasToken: !!token && token.length,
            hasSignature: !!signature && signature.length,
            hasPublicKey: !!publicKey && publicKey.length,
            publicKeyStart: publicKey?.substring(0, 10) + '...'
          }
        });
        const uploadResponse = await upload({
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name,
          onProgress: (event) => {
            const progressPercent = Math.round((event.loaded / event.total) * 100);
            setProgress(progressPercent);
            if (loadingToast) {
              toast.loading(`Uploading image... ${progressPercent}%`, {
                id: loadingToast,
                duration: 30000,
              });
            }
          }
        }) 
        if (uploadResponse?.url) {
          editor?.chain().focus().updateAttributes('image', {src: uploadResponse.url,alt: uploadResponse.name || file.name,title: uploadResponse.name || file.name,}).run()
          if (loadingToast) toast.dismiss(loadingToast)
          toast.success('Image uploaded successfully!', {
            description: `${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
            duration: 3000,
          })
          console.log('Upload successful:', {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            size: uploadResponse.size,
            dimensions: `${uploadResponse.width}x${uploadResponse.height}`
          })
        }else{
          throw new Error('No URL received from upload response');
        }
      }catch(error){
        console.error('Upload error:', error)
        if (editor && objectUrl) {
          editor.chain().focus().deleteSelection().run()
        }
        if (loadingToast) toast.dismiss(loadingToast)
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

        toast.error(errorMessage, {
          description: 'Please try again or choose a different image',
          duration: 5000,
        })
      } finally{
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
        setIsUploading(false);
        setProgress(0);
      }
      // if (file) {
      //   const objectUrl = URL.createObjectURL(file)
      //   pendingImages.set(objectUrl, file)
      //   editor?.chain().focus().setImage({ src: objectUrl }).run()
      // }
    }
    
    input.click()
  }

  const toggleState = useEditorState({
    editor,
    selector: ({editor}) => {
        if(!editor) return null
        return {
            isImage: editor.isActive('image')
        }
    }
  })

  return (
    <Toggle 
        onClick={handleClick} 
        className="data-[state=on]:bg-amber-300 hover:bg-amber-100 dark:hover:bg-amber-300 cursor-pointer mx-1"
        pressed={toggleState?.isImage}
    >
      <Image className="dark:text-white text-black"/>
    </Toggle>
  )
}