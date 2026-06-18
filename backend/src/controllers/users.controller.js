import { Webhook } from 'svix';
import User from '../models/user.model.js';

const clerkWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.WEBHOOK_SECRET);
        const payload = req.body.toString();

        const event = whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = event;

        if (type === "user.created") {
            const { id, email_addresses, image_url, first_name, last_name } = data;

            if (!email_addresses || email_addresses.length === 0) {
                return res.status(400).json({ message: "No email address provided!" });
            }

            const newUser = await User.create({
                data: {  // ✅ Fixed: wrapped in data
                    id: id,
                    email: email_addresses[0].email_address,
                    firstName: first_name,
                    lastName: last_name,
                    photo: image_url
                }
            });

            if (newUser) {
                return res.status(200).json({
                    success: true,
                    message: "User created successfully in database!"
                });
            }
        }

        if (type === "user.updated") {
            const { id, email_addresses, image_url, first_name, last_name } = data;

            if (!email_addresses || email_addresses.length === 0) {
                return res.status(400).json({ message: "No email address provided!" });
            }

            const updatedUser = await User.update({
                where: { id: id },
                data: {
                    email: email_addresses[0].email_address,
                    firstName: first_name,
                    lastName: last_name,
                    photo: image_url
                }
            });

            if (updatedUser) {
                return res.status(200).json({
                    success: true,
                    message: "User updated successfully in database!"
                });
            }
        }

        if (type === "user.deleted") {
            const { id } = data;

            const deletedUser = await User.delete({
                where: { id: id }
            });

            if (deletedUser) {
                return res.status(200).json({
                    success: true,
                    message: "User deleted successfully from database!"
                });
            }
        }

        if (type === "session.created") {
            // Handle session creation if needed
        }
        
    } catch (err) {
        console.error(`Error message: ${err.message}`);
        return res.status(400).json({ message: err.message || "Webhook verification failed!" });
    }
};

export { clerkWebhook };