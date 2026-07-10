import prisma from "../lib/prisma";

const email = process.argv[2];

if (!email) {
  console.error("Usage: npx ts-node scripts/set-driver.ts email@exemple.com");
  process.exit(1);
}

async function main() {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.error(`❌ Aucun compte trouvé avec l'email : ${email}`);
    process.exit(1);
  }

  await prisma.user.update({
    where: { email },
    data: { role: "DRIVER" },
  });

  console.log(`✅ ${user.name} (${email}) est maintenant DRIVER.`);
  console.log("   → Connecte-toi sur /login, tu seras redirigé vers /driver automatiquement.");
}

main().finally(() => prisma.$disconnect());
