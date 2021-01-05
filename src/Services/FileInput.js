import React, { useCallback, useState } from 'react';
import Alert from '@material-ui/lab/Alert';

const validType = ['image/jpg', 'image/jpeg', 'image/png'];
const maxSize = 5242880;

function FileInput({ onChange }) {
    const [imageErrors, setImageErrors] = useState({
        img: '',
    });

    const handleChange = useCallback(
        (e) => {
            for (let index = 0; index < e.target.files.length; index++) {
                let file = e.target.files[index];

                if (file?.size <= maxSize && validType.some((v) => file?.type.includes(v))) {
                    onChange(file);
                    setImageErrors((imageErrors) => ({ ...imageErrors, img: '' }));
                    return;
                }
                if (file?.size > maxSize) {
                    setImageErrors((formErrors) => ({
                        ...formErrors,
                        img: 'size can not be biggest than 5 mb',
                    }));
                    return;
                }
                if (!validType.some((v) => file?.type.includes(v))) {
                    setImageErrors((formErrors) => ({
                        ...formErrors,
                        img: 'file type is incorrect',
                    }));
                    return;
                }
            }
        },
        [onChange],
    );

    return (
        <>
            <input
                type="file"
                value=""
                //title=" "
                name="image"
                onChange={handleChange}
                accept=".jpg, .jpeg, .png"
                placeholder=" "
            />
            {imageErrors.img && <Alert severity="error">{imageErrors.img}</Alert>}
        </>
    );
}

export default FileInput;
