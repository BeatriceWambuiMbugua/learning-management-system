
const {PrismaClient} = require('@prisma/client')

const database = new PrismaClient()
async function main() {
    try {
        await database.category.createMany({
            data: [
                { "name": "Web Development" },
                { "name": "Computer Science" },
                { "name": "Data Science" },
                { "name": "UI/UX Design" },
                { "name": "Software Engineering" },
                { "name": "Artificial Intelligence" },
                { "name": "Mobile Development" }
            ]
        })

        console.log("Success")
    } catch (error) {
        console.log("Error Seeding Database", error);
    } finally {
        await database.$disconnect()
    }
}

main()