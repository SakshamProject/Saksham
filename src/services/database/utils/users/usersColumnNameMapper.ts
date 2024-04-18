function usersOrderByColumnMapper(orderByColumn: string, sortOrder: "asc" | "desc") {
    const sortOrderMap = new Map();
    sortOrderMap.set("name", [
        {
            firstName: sortOrder
        },
        {
            lastName: sortOrder
        }

    ]);

    sortOrderMap.set("firstName", {
        firstName: sortOrder
    });

    sortOrderMap.set("lastName", {
        lastName: sortOrder
    });

    sortOrderMap.set("createdAt", {
        createAt: sortOrder
    });

    sortOrderMap.set("updatedAt", {
        updateAt: sortOrder
    });

    sortOrderMap.set("designationName", {
        designation: {
            name: sortOrder
        }
    });

    sortOrderMap.set("sevaKendraName", {
        designation: {
            sevaKendra: {
                name: sortOrder
            }
        }
    });

    sortOrderMap.set("district", {
        designation: {
            sevaKendra: {
                district: {
                    name: sortOrder
                }
            }
        }
    });

    sortOrderMap.set("state", {
        designation: {
            sevaKendra: {
                district: {
                    state: {
                        name: sortOrder
                    }
                }
            }
        }
    });


    return sortOrderMap.get(orderByColumn);
}

export default usersOrderByColumnMapper;