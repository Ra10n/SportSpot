import { PrismaClient } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

export default async function Home() {
  const sports = await prisma.sport.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        SportSpot
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {sports.map((sport) => (
          <li key={sport.id} className="mb-2">
            {sport.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

