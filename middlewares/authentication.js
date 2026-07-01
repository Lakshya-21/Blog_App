const { validateToken } = require("../services/authenticaton");

function checkForAuthnticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }catch(error){}
        next();
    }
}


module.exports = {
    checkForAuthnticationCookie,
}