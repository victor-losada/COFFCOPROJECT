import jwt from "jsonwebtoken";

export const validationToken = async (req, res, next) => {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ message: "Se requiere un token de autenticación" });
    }

    const token = header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Formato de token inválido. Se espera 'Bearer <token>'" });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: "Token inválido o expirado", error });
        }

        req.user = decoded;

        next();
    });
};
export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const { rol_idcargos } = req.user;  

        if (!rolesPermitidos.includes(rol_idcargos)) {
            return res.status(403).json({ message: "Acceso denegado. No estas autorizado para esta acción." });
        }

        next(); 
    };
};