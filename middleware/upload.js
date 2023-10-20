import multer from "multer";
var storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage: storage
}).single('doctorPrescriptionImage');

export const upload2 = multer({
    storage:storage
}).single('report');

