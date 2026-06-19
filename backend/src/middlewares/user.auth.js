// import { getAuth } from '@clerk/express';

// const requireAuth = (req, res, next) => {
//     const { userId } = getAuth(req);

//     if (!userId) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // ✅ Attach user info to request for use in handlers
//     req.userId = userId;
//     next();
// };

// export default requireAuth;