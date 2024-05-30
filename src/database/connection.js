import sql from "mssql";

const dbSettings = {
    user: "sa",
    password: "yourStrong#Password",
    server: "localhost",
    database: "webstore",
    options: { //nos sirve para arreaglar el error
        encrypt: false,
        trustServerCertificate: true
    }

}
export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings)

        //para hacer la prueba si todo esta bien
        // const result = await pool.request().query("SELECT GETDATE()")
        // console.log(result)

        return pool
    } catch (error) {
        console.log(error)
    }
}