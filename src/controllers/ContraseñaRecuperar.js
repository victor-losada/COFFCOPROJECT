import { conexion } from "../database/conexion.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SendEmail } from "./CorreoContraseña.js";

export const IdVerify  = async (req, res, next) => {
    
    const {numero_documento} = req.body

    try {

        const [user] = await conexion.query("select idusuarios, correo_electronico from usuarios where  numero_documento = ?", [numero_documento])

        if(user.length === 0){
            return res.status(400).json({message: "Usuario no encontrado"})
        }

        req.user = user[0]
        next()

    }catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}

export const passwordForgot = async(req, res) => {
    const { email } = req.body;

    try {
        // Consulta a la base de datos para obtener el usuario
        const [rows] = await conexion.query("SELECT idusuarios, correo_electronico FROM usuarios WHERE correo_electronico = ?", [email]);

        // Verificar si el usuario existe
        if (rows.length === 0) {
            return res.status(404).json({ message: "El correo no está registrado" });
        }

        const user = rows[0]; // Obtener el primer usuario del resultado
        const userId = user.idusuarios; // Obtener el id del usuario

        // Generar el token con la ID del usuario
        const token = jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '48h' });

        console.log("Token generado:", token); // Para verificar que el token se está generando correctamente

        // Enviar el correo con el token y el id del usuario
        await SendEmail(email, token, userId);

        return res.status(200).json({ message: "Correo de recuperación enviado" });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};



export const verifyResetToken = async (req, res, next) => {
    const { token } = req.params  

    if (!token) {
        return res.status(401).json({ message: "Formato de token inválido. Se espera un token en la URL." });
    }
    console.log("Token recibido:", req.params.token);


    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: "Token inválido o expirado", error });
        }


        req.user = decoded;  // Decodificamos el token y lo pasamos al siguiente middleware
        next();
    });
};

export const resetPassword = async (req, res) => {
    const { idusuarios, token } = req.params;  
    const { nueva_contraseña } = req.body;  

    try {
        const decoded = jwt.verify(token, process.env.SECRET);  // Verificamos el token con la misma clave secreta

        // 2. Verificar si el token es válido para el idusuarios
        if (decoded.id !== parseInt(idusuarios)) {
            return res.status(403).json({ message: "Token inválido o no coincide con el usuario" });
        }

        // 3. Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(nueva_contraseña, 10);

        // 4. Actualizar la contraseña en la base de datos
        const [result] = await conexion.query(
            "UPDATE usuarios SET contraseña = ? WHERE idusuarios = ?",
            [hashedPassword, idusuarios]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        res.status(403).json({ message: "Token inválido o expirado", error });
    }
};
