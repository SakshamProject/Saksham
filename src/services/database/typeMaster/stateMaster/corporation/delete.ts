import prisma from "../../../database.js";

const deleteCorporationDB = async (id: string) => {
  const deletedCorporation = await prisma.corporation.delete({
    where: { id: id },
  });
};
export { deleteCorporationDB };
