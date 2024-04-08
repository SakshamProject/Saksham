type Defaults = {
    skip: number,
    take: number,
    minFieldLength: number,
    sortOrder: "asc" | "desc"
}
const defaults: Defaults = {
    skip : 0,
    take : 10,
    minFieldLength: 3,
    sortOrder: "asc"
}

export default defaults;