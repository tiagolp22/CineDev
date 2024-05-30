const jwt = require("jsonwebtoken");
const db = require("../config/db");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // Vérifie si l'en-tête d'autorisation existe
    if (!authorization) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const token = authorization.split(" ")[1];

    // Vérifie si le token a été fourni
    if (!token) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Le token a expiré" });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Token invalide" });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }

    // Recherche l'utilisateur dans la base de données
    const userDoc = await db.collection("utilisateurs").doc(decodedToken.id).get();

    // Vérifie si l'utilisateur existe
    if (!userDoc.exists) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    // Attache les informations de l'utilisateur à la requête
    req.user = userDoc.data();
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
