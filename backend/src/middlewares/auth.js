// import { clerkClient } from "@clerk/express";

// const auth = async (req,res,next) => {
//     try{
//         const { userId , has } = req.auth();
//         const haspremiumPlan = has({plan:"premium"});

//         if(!haspremiumPlan){
//             req.credits = user.privateMetadata.credits;
//         }else{
//             await clerkClient.users.updateUserMetadata(userId, {
//                 privateMetadata: {
//                     credits: 10
//                 }
//             });
//             req.credits = 10;
//         }

//         req.plan = haspremiumPlan ? "premium" : "free";
//         next()

//     }catch(error){
//         next(error)
//     }
// }

// export default auth;