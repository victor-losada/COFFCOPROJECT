
subir.post('/uploads',async(req,res)=>{
    try {
        if(!req.files){
            res.status(500).json({ error: "no hay archivos"})
        }
        else{
            const file = req.files.archivo;
            console.log(file)
            file.mv(`./uploads/${file.name}`, (err) => {
                if (err) {
                    res.status(500).json({ error: err })
                }
                else {
                    res.status(200).json({ message: "archivo subido",data:{
                        name: file.name,
                        mimetype: file.mimetype,
                        size: file.size
                    } })
                }
            })
        }
    } catch (error) {
        res.status(500).json({ error: error})
    }
})


