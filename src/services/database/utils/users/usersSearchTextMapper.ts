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
                    sevaKendra: {
                        OR: [
                            {
                                name: {
                                    contains: searchText,
                                    mode: "insensitive",
                                },
                                district: {
                                    OR: [
                                        {
                                            name: {
                                                contains: searchText,
                                                mode: "insensitive",
                                            },
                                            state: {
                                                OR: [
                                                    {
                                                        name: {
                                                            contains: searchText,
                                                            mode: "insensitive",
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        ]
    });
}

export default usersSearchTextMapper;