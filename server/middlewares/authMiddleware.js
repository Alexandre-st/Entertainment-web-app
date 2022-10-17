import jwt from 'jsonwebtoken';


const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers);
    // To get the token from the header
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const CustomAuth = token.length < 500;

    let decodedData;

    // To verify the token
    if (token && CustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);
    }

    req.userId = jwt.decode(token);

    next();
  } catch (error) {
    console.error(error);
  }
};

export default authMiddleware;