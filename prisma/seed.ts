import { PrismaClient } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const sports = [
  {
    name: "Fußball",
    slug: "fussball",
  },
  {
    name: "Basketball",
    slug: "basketball",
  },
  {
    name: "Tennis",
    slug: "tennis",
  },
  {
    name: "Bouldern",
    slug: "bouldern",
  },
]

 const result = await prisma.sport.createMany({
  data: sports,
  skipDuplicates: true,
})

  console.log("Sportarten eingefügt")
  console.log(result)
  const allSports = await prisma.sport.findMany()

  console.log(allSports)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })