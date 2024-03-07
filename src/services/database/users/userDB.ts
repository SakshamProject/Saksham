import prisma from "../database.js";
const getUserDB = async () => {
    const users = await prisma.user.findMany();
    console.log(users);
    return "success"
} 
export { getUserDB };