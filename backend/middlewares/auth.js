const jwt = require("jsonwebtoken");
const db = require("../config/db");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    //est-ce qu'on a un JWT avec la requete?
    //console.log(req.headers);
    if(authorization){
        //Ex: jeton = "Bearer njsakndskjnfjknsdlkfnklsdn"
        const jetonAValide = authorization.split(" ")[1];
        const jetonDecode = jwt.verify(jetonAValide, process.env.JWT_SECRET);
        const utilisateurVarifier = await db.collection("utilisateurs").doc(jetonDecode.id).get();
        console.log("suis la");
        if(utilisateurVarifier.exists){
            //si c'est un admin
            //ajouter la logique de programation...
           next();
        } else {
            res.statusCode=418;
            return res.json({message: "Non autorisé"})
        }
    }else {
        res.statusCode=401;
        return res.json({message: "Non autorisé"})
    }
    //valide le Jeton
    //on recupe lútilisateur dans le jeton et verifie se existe
    //si oui, next()
    //si non, on retoune une erreur non autorisees}
  } catch (erreur) {
    res.statusCode = 500;
    return res.json({message: erreur.message })
  }
};

module.exports = auth;
