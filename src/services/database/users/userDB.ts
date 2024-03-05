import prisma from "../database.js";

const getUserDB = async () => {
    const users = await prisma.user.findMany();
    return users
} 

export { getUserDB };