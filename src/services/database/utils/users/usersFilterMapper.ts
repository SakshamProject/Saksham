import {Prisma} from "@prisma/client";
import {userListType} from "../../../../types/users/usersSchema.js";
import usersSearchTextMapper from "./usersSearchTextMapper.js";

function usersFilterMapper(columnName: string, filterOperation: string, value: string) {
    const filterUserMap: Map<string, Prisma.UserWhereInput> = new Map();

    const operation = filterOperation === "notEquals" ? "equals" : filterOperation;
    filterUserMap.set("firstName", {
        firstName: {
            [operation]: value,
            mode: 'insensitive'
        }
    });

    filterUserMap.set("lastName", {
        lastName: {
            [operation]: value,
            mode: 'insensitive'
        }
    });

    filterUserMap.set("name", {
        OR: [
            {
                firstName: {
                    [operation]: value,
                    mode: 'insensitive'
                }
            },
            {
                lastName: {
                    [operation]: value,
                    mode: 'insensitive'
                }
            },
        ]
    });

    filterUserMap.set("state", {
        designation: {
            sevaKendra: {
                district: {
                    state: {
                        name: {
                            [operation]: value,
                            mode: 'insensitive'
                        }
                    }
                }
            }
        }
    });

    filterUserMap.set("district", {
        designation: {
            sevaKendra: {
                district: {
                    name: {
                        [operation]: value,
                        mode: 'insensitive'
                    }
                }
            }
        }
    });

    filterUserMap.set("sevaKendraName", {
        designation: {
            sevaKendra: {
                name: {
                    [operation]: value,
                    mode: 'insensitive'
                }
            }
        }
    });

    filterUserMap.set("designationName", {
        designation: {
            name: {
                [operation]: value,
                mode: 'insensitive'
            }
        }
    });

    if (filterOperation === "notEquals") {
        return {
            NOT: filterUserMap.get(columnName),
        };
    }

    return filterUserMap.get(columnName);
}

function generateUserListWhereInput(body: userListType) {
    const userWhereInput: any = {
        AND: [],
    };

    if (body.filters) {
        for (const {operation, value, field} of (body.filters)) {
            userWhereInput.AND.push(
                usersFilterMapper(field, operation, value)
            );
        }
    }

    if (body.searchText) {
        if (body.searchText !== "") {
            userWhereInput.AND.push(usersSearchTextMapper(body.searchText));
        }
    }

    return userWhereInput;
}

export default generateUserListWhereInput;