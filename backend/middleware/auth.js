import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.headers.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        req.user = { _id: token_decode.id } // Set req.user as requested
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser
