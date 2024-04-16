import {Prisma} from "@prisma/client";

function usersSearchTextMapper(searchText = ""): Prisma.UserWhereInput {
    return ({
        OR: [
            {
                OR: [
                    {
                        firstName: {
                            contains: searchText,
                            mode: "insensitive",
                        }
                    }, {
                        lastName: {
                            contains: searchText,
                            mode: "insensitive",
                        }
                    }
                    ]
            },
            {
                designation: {
                    name: {
                        contains: searchText,
                        mode: "insensitive",
                    },
                }
            },
            {
                designation: {
                    sevaKendra: {
                        name: {
                            contains: searchText,
                            mode: "insensitive",
                        }
                    }
                }
            },
            {
                designation: {
                    sevaKendra: {
                        district: {
                            name: {
                                contains: searchText,
                                mode: "insensitive",
                            }
                        }
                    }
                }
            },
            {
                designation: {
                    sevaKendra: {
                        district: {
                            state: {
                                name: {
                                    contains: searchText,
                                    mode: "insensitive",
                                }
                            }
                        }
                    }
                }
            }
        ]
    });
}

export default usersSearchTextMapper;