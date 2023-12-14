import { useState } from 'react';
import { toast } from 'react-toastify';

const useFileHandler =(type = "multiple", initState) => {
    const [imageFile, setImageFile] = useState(initState);
    const [isFileLoading, setFileLoading] = useState(false);
    const [isPostVideo, setIsPostVideo]= useState(false)

    const removeImage = (id) => {
        if (!Array.isArray(imageFile)) return;

        const items = imageFile.filter(item => item.id !== id);

        setImageFile(items);
    };

    const clearFiles = () => {
        setImageFile(initState);
    }

    const onFileChange = (event, callback) => {
        if (!event.target.files) return;
        if ((event.target.files.length + (imageFile).length) > 5) {
            return toast.error('Maximum of 5 photos per post allowed.', { hideProgressBar: true });
        }

        // TODO ===  FILTER OUT DUPLICATE IMAGES

        const val = event.target.value;
        const img = event.target.files[0];

        if (!img) return;

        const size = img.size / 1024 / 1024;
        const regex = /(\.mp4|\.jpg|\.jpeg|\.png)$/i;
        const regexVideo= /\.mp4/i
        setFileLoading(true);
        if(regexVideo.exec(val)) {
            setIsPostVideo(true)
        }
        else {
            setIsPostVideo(false)
        }
        if (!regex.exec(val)) {
            toast.error('File type must be JPEG or PNG or MP4', { hideProgressBar: true });
            setFileLoading(false);
        } else if (size > 25) {
            toast.error('File size exceeded 25mb', { hideProgressBar: true });
            setFileLoading(false);
        } else if (type === 'single') {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImageFile({
                file,
                url,
                id: file.name
            });
            if (callback) callback(imageFile);
        } else {
            Array.from(event.target.files).forEach((file) => {
                const url = URL.createObjectURL(file);
                setImageFile((oldFiles) => ([...oldFiles, {
                    file,
                    url,
                    id: file.name
                }]));
            });
            if (callback) callback(imageFile);
            setFileLoading(false);
        }
    };

    return {
        imageFile,
        setImageFile,
        isFileLoading,
        onFileChange,
        removeImage,
        clearFiles,
        isPostVideo
    };
};

export default useFileHandler;