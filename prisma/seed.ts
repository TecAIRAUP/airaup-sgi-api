import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const airaup_districts = [4845, 4851, 4895, 4905, 4921, 4945, 4975]

async function run() {
    for (let districtId of airaup_districts) {
        await prisma.district.upsert({
            where: { id: districtId },
            update: {},
            create: {
                id: districtId,
            },
        });
    }

    const club = await prisma.club.findFirst({
        where: { name: "AiraUP", districtId: 4975 },
    });
    if (!club) {
        await prisma.club.create({
            data: {
                name: "Plaza de la Aviación Comercio",
                districtId: 4975,
            },
        });
    }
}

run()
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });