
const create_query_id_body = (table) => {
    return `${table.slice(0, table.length - 1)}_id`
}

module.exports = {
    create_query_id_body
}