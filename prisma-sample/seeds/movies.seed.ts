import { PrismaClient } from '@prisma/client';
import { movies } from './fake.data.json';

const prisma = new PrismaClient();
async function run() {
  for (let i = 0, l = movies.length; i < l; i++) {
    const movie = movies[i];
    await prisma.movie.create({ data: movie });
  }
}

run()
  .then(async () => {
    await prisma.$disconnect();
    console.log('...wait for script to exit');
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.error('seed error', error);
    process.exit(1);
  });
