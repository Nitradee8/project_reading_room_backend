exports.getProduct = async (req, res, next) => {
    try {
        
        res.status(200).json({DONE:"okay"})
    } catch (error) {
        next(error)
    }
}
