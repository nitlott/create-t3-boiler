import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt'

import { prisma } from "../../server/db/client";

const SALTROUNDS = 10
export default function signup(req: any, res: any) {

    // try {
    hash(req.body.password, SALTROUNDS, async function (err, hash) {
        if (!req.body.password) {
            return res.status(400).json({ status: 'Must have a password between 8-20chars!' })
        } else if (req.body.password.length < 2) {
            return res.status(400).json({ status: 'Password is too short!' })
        } else if (req.body.password.length > 20) {
            return res.status(400).json({ status: 'Password is too long!.' })
        }
        req.body.password = hash;
        console.log('Creating user!')
        try {
            const user = await prisma.user.create({
                data: {
                    email: req.body.email,
                    //@ts-expect-error: cant know whats in the object before you get it
                    password: req.body.password,
                },
            });
            if (user) {
                res.redirect(303, '/')
            }

        } catch (error) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    console.log('There is a unique constraint violation, a new user cannot be created with this email!')
                    return res.status(400).json({ "code": 'User not created!' })
                    //res.redirect(303, '/auth/signup')
                }
            }
        }
    })

    // throw e
}
