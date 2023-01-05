import { registerAs } from '@nestjs/config';

export default registerAs(
    'database',
    (): Record<string, any> => ({
        host: process.env.DATABASE_HOST ,
        port: Number.parseInt(process.env.DATABASE_PORT),
        database: process.env.DATABASE_NAME ||'taskmanagement',
        username: process.env.DATABASE_USER ||'aishuutech',
        password: process.env.DATABASE_PASSWORD || "1234",
        debug: process.env.DATABASE_DEBUG === 'true',
        type: process.env.DATABASE_TYPE || "mysql",
        ssl: process.env.DATABASE_SSLMODE === 'true',
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true'||'false',
        autoLoadEntities: process.env.DATABASE_AUTO_LOAD === 'true',
        entities: [__dirname + '/../**/*.entity.js'],
    })
);