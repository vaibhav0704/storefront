import { PrismaClient } from "@prisma/client";
import * as crypto from "node:crypto";
import * as fs from "node:fs";

const prisma = new PrismaClient();

async function createAdmin(email: string, name: string, password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    await prisma.user.create({
        data: {
            email,
            name,
            password: hash,
            role: 'ADMIN',
            salt
        }
    });

    console.log(await prisma.user.findFirst({
        where: {
            name: 'vaibhav'
        }
    }))
};

async function addData() {
    
    const data = await fs.readFileSync(`${__dirname}/data.json`);
    const dataToSeed = JSON.parse(data.toString());

    const category =await prisma.category.createMany({
        data: dataToSeed.categories
    });

    const product = await prisma.product.createMany({
        data: dataToSeed.products
    });
}

async function setupDB() {
    await createAdmin('admin@gmail.com', 'admin', '1234')
    await addData();

    console.log('data seeded sucessfully');
};

setupDB();