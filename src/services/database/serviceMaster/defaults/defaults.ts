
const serviceMasterDefaults = {
    orderBy: "createdAt",
    select: {
        id: true,
        name: true,
        serviceType: {
            select: {
                name: true,
            },
        },
    }
}

export default serviceMasterDefaults;