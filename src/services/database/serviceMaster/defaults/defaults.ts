
const serviceMasterDefaults = {
    orderBy: "createdAt",
    select: {
        id: true,
        name: true,
        service: {
            select: {
                name: true,
                id: true
            },
        },
    }
}

export default serviceMasterDefaults;