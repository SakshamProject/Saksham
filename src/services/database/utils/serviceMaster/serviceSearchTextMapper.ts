import { Prisma } from "@prisma/client";

function searchTextMapper(tableName: Prisma.ModelName, searchText: string = "") {
    const searchTextMap: Map<Prisma.ModelName, Prisma.ServiceTypeWhereInput> = new Map();
    searchTextMap.set("ServiceType", {
            OR: [
                {
                    name: {
                        contains: searchText,
                        mode: 'insensitive'
                    },
                },
                {
                    service: {
                        some: {
                            name: {
                                contains: searchText,
                                mode: "insensitive"
                            }
                        }
                    }
                },
            ]
    });

    return searchTextMap.get(tableName);
}

export default searchTextMapper;