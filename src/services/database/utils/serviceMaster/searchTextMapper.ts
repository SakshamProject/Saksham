import { Prisma } from "@prisma/client";

function searchTextMapper(tableName: Prisma.ModelName, searchText: string) {
    const searchTextMap: Map<string, Prisma.ServiceWhereInput> = new Map();

    searchTextMap.set("Service", {
            OR: [
                {
                    name: {
                        contains: searchText,
                        mode: 'insensitive'
                    },
                },
                {
                    serviceType: {
                        name: {
                            contains: searchText,
                            mode: "insensitive"
                        }
                    }
                },
            ]
    });

    return searchTextMap.get(tableName);
}

export default searchTextMapper;