import crypto from 'crypto'

export const encriptFormData = (formData) => {
    let encryptedData = crypto.createHash('sha512').update(formData).digest('base64');
    return encryptedData;
}
