import User from '../models/user.model.js';

const userCredits = async (req,res) => {
    const { userId } = req.auth();

    if(!userId){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }

    try{
        const user = await User.findOne({clerkId : userId});

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found!"
            })
        }
        return res.status(200).json({
            success : true,
            credits : user.credits
        })
    }catch(err){
        console.error(`Error fetching user credits: ${err.message}`);
        return res.status(500).json({
            success : false,
            message : "Failed to fetch user credits!"
        })
    }
}

const creditsUpdation = async (req , res) => {
    const { userId } = req.auth();
    
    if(!userId){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }
    
    try{
        const user = await User.findOne({clerkId : userId});
        
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found!"
            })
        }
        
        // Update credits logic here
        // For example, increment by 1:
        user.credits -= 1;
        await user.save();
        
        return res.status(200).json({
            success : true,
            credits : user.credits
        })
    }catch(err){
        console.error(`Error updating user credits: ${err.message}`);
        return res.status(500).json({
            success : false,
            message : "Failed to update user credits!"
        })
    }
}

export { userCredits , creditsUpdation }
