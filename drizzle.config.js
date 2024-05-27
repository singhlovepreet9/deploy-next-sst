const drizzleConfig = {
    schema: './src/app/models/schema.js',
    out: './src/migrations',
    dialect: 'postgresql',
}

export default drizzleConfig