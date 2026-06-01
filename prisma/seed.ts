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
    districts: [
      {
        name: "Saarbrücken",
        slug: "saarbruecken",
      },
      {
        name: "Saarlouis",
        slug: "saarlouis",
      },
      {
        name: "Saarpfalz-Kreis",
        slug: "saarpfalz-kreis",  
      },
      {
        name: "Neunkirchen",
        slug: "neunkirchen",  
      },
      {
        name: "Merzig-Wadern",
        slug: "merzig-wadern",   
      },
      {
        name: "St. Wendel",
        slug: "st-wendel",  
      }
    ],
  }
]



 const resultSports = await prisma.sport.createMany({
  data: sports,
  skipDuplicates: true,
})

const resultStates = await prisma.state.createMany({
  data: states,
  skipDuplicates: true,
})

  console.log("Sportarten eingefügt")
  console.log(resultSports)
  console.log("Landkreise eingefügt")
  console.log(resultStates)
  const allSports = await prisma.sport.findMany()
  const allStates = await prisma.state.findMany()
  

  console.log(allSports)
  console.log(allStates)
  
}



main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })