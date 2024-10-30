// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';


// Create __dirname equivalent
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


const routeNotFound = (_, res) => {

    const responseData = {
        status: false,
        message: 'Api Route Not Found! 🔴',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found! 🔴',
            },
        ],
    };

    res.status(404).json(responseData);

    // res
    //     .status(httpStatus.NOT_FOUND)
    //     .sendFile(path.join(__dirname, '..', '..', '..', '..', 'public', '404.html'));
};


export default routeNotFound;