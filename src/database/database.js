import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "node",
    host: "localhost",
    database: "m7_d6_operaciones_transaccionales",
    password: "123456",
    port: 5432,
    max: 5,
});

export default pool;
