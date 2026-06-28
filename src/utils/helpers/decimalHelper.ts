export const validateDecimal = (_: any, value: any) => {
    const regex = /^-?\d*\.?\d+$/;
    if (regex.test(value) || value === '') {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid decimal number'));
};
