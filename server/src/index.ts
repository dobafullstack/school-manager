require('reflect-metadata');
require('dotenv').config();
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import MongoStore from 'connect-mongo';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import Logger from './Configs/Logger';
import { COOKIES_NAME, __prod__ } from './Constants/';
import entities from './Entities';
import resolvers from './Resolvers';
import { Context } from './Types/Context';

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'school_manager',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: !__prod__,
        synchronize: true,
        entities,
    });

    const app = express();
    const PORT = process.env.PORT || 4000;

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: resolvers as any,
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        context: ({ req, res }): Context => ({ req, res }),
    });

    //session
    const mongoUrl = process.env.MONGODB_URL as string;
    await mongoose.connect(mongoUrl);

    Logger.success('MongoDB is connected');

    app.use(
        session({
            name: COOKIES_NAME,
            store: MongoStore.create({ mongoUrl }),
            cookie: {
                maxAge: 1000 * 60 * 60, //one hour
                httpOnly: true,
                secure: __prod__,
                sameSite: 'lax',
            },
            secret: process.env.SESSION_SECRET as string,
            saveUninitialized: false,
            resave: false,
        })
    );

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(PORT, () =>
        Logger.success(`Server is running on: http://localhost:${PORT}${apolloServer.graphqlPath}`)
    );
};

main().catch((err) => Logger.error(err));
