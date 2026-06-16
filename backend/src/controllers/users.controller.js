import { PrismaClient } from '@prisma/client';
import { Webhook } from 'svix';

const prisma = new PrismaClient();

const createUser = (req, res) => {
    const wbHook = new Webhook(process.env.SVIX_WEBHOOK_SECRET);

    res.json({ message: "Create user" });
};

export default {
    createUser
};