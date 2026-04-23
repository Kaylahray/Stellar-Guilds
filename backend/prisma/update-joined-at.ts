import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateJoinedAt() {
  console.log('Starting joinedAt update...');

  // Get all memberships with null joinedAt
  const memberships = await prisma.guildMembership.findMany({
    where: {
      joinedAt: null,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  console.log(`Found ${memberships.length} records to update`);

  // Update each one
  for (const membership of memberships) {
    await prisma.guildMembership.update({
      where: { id: membership.id },
      data: { joinedAt: membership.createdAt },
    });
  }

  console.log('Update completed');

  await prisma.$disconnect();
}

updateJoinedAt().catch(console.error);