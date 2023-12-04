import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export const pickImage = async (pastData, dispatch, type, setIsLoading) => {
    const cloudName = "dmszlhsxe";
    const uploadPreset = "tmxipvmz";
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const data = await launchImageLibrary({ mediaType: 'photo' });
    setIsLoading(true);

    // Check if the image selection was successful
    if (!data.didCancel && !data.errorCode) {
        const uri = data.assets[0].uri;

        // Create the form data to send with the request
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            type: 'image/jpeg', // Adjust the type according to your requirements
            name: 'image.jpg', // Adjust the name according to your requirements
            filename: 'image.jpg',
        });
        formData.append('upload_preset', uploadPreset);

        try {
            // Send the POST request to upload the image
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({ type: type, payload: [...pastData, response.data.url] });
        } catch (error) {
            console.error('Error uploading image:', error);
            console.log('Error response:', error.response);
            console.log('Error request:', error.request);
        }
    }
    setIsLoading(false)
};
