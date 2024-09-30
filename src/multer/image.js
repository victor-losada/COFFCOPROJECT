import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,res, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-' + file.originalname)   
    }
})

const upload2 = multer({storage: storage})


export default upload2