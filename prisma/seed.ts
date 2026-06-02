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

  const states = [
    {
      name: "Saarland",
      slug: "saarland",
    },
]

const districts = [
    {
      name: "Saarbrücken",
      slug: "saarbruecken",
    },
    {
      name: "Saarlouis",
      slug: "saarlouis",
    },
]

const saarland = await prisma.state.upsert({
  where: {
    slug: "saarland",
  },
  update: {},
  create: {
    name: "Saarland",
    slug: "saarland",
  },
})

  await prisma.sport.createMany({
  data: sports,
  skipDuplicates: true,
})

  await prisma.state.createMany({
  data: states,
  skipDuplicates: true,
})

 await prisma.district.createMany({
  data: [
    {
      name: "Saarbrücken",
      slug: "saarbruecken",
      stateId: saarland.id,
    },
    {
      name: "Saarlouis",
      slug: "saarlouis",
      stateId: saarland.id,
    },
  ],
  skipDuplicates: true,
})

}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })