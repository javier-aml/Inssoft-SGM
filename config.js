module.exports = {
    URL_CREDENTIAL: `postgres://${process.env.DATABASE_USER_SGM}:${process.env.DATABASE_PASSWORD_SGM}@${process.env.DATABASE_HOST_SGM}:${process.env.DATABASE_PORT_SGM}/${process.env.DATABASE_NAME_SGM}`
    // URL_CREDENTIAL: 'postgres://schtelemetria:Sch3m@T3l3m3tr1@@localhost:5432/dbtelemetria'
}