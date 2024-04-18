import { Prisma } from "@prisma/client";


function usersOrderByColumnMapper(orderByColumn: string, sortOrder: "asc" | "desc") {
    const sortOrderMap = new Map();
    sortOrderMap.set("name", [
        {
        user: {
            firstName: sortOrder
        }
    },
        {
            lastName: sortOrder
        }

    ]);

    sortOrderMap.set("firstName", {
        user: {
            firstName: sortOrder
        }
    });

    sortOrderMap.set("lastName", {
        user: {
            lastName: sortOrder
        }
    });

    sortOrderMap.set("createdAt", {
        user: {
            createAt: sortOrder
        }
    });

    sortOrderMap.set("updatedAt", {
        user: {
            updateAt: sortOrder
        }
    });

    sortOrderMap.set("designationName", {
        user: {
            designation: {
                name: sortOrder
            }
        }
    });

    sortOrderMap.set("sevaKendraName", {
        user: {
            designation: {
                sevaKendra: {
                    name: sortOrder
                }
            }
        }
    });

    sortOrderMap.set("district", {
        user: {
            designation: {
                sevaKendra: {
                    district: {
                        name: sortOrder
                    }
                }
            }
        }
    });

    sortOrderMap.set("state", {
        user: {
            designation: {
                sevaKendra: {
                    district: {
                        state: {
                            name: sortOrder
                        }
                    }
                }
            }
        }
    });


    return sortOrderMap.get(orderByColumn);
}

export default usersOrderByColumnMapper;