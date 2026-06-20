// import { clerkClient } from "@clerk/express";

// const auth = async (req,res,next) => {
//     try {

//     const { userId , has } = req.auth();
//     const hasPrimiumplan = has({ plan: "premium" });

//     const user = await clerkClient.users.getUser(userId);

//     if(!hasPrimiumplan && user.privateMetadata.free_usage){
//         return res.status(403).json({ message: "Forbidden" });
//     }else{
//         await clerkClient.users.updateUserMetadata(userId, {
//             privateMetadata: {
//                 free_usage: 0
//             }
//         });

//         req.free_usage = 0;

//         req.plan = hasPrimiumplan ? "premium" : "free";
//     }
    
//     next();
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

