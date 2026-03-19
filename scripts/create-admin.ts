import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const adminEmail = 'admin@carbivio.com';
    const adminPassword = 'admin123456'; // Changez ce mot de passe en production!

    // Vérifier si l'admin existe déjà
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      console.log('L\'admin existe déjà avec l\'email:', adminEmail);
      return;
    }

    // Créer l'admin
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        name: 'Admin Carbivio',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('Admin créé avec succès!');
    console.log('Email:', adminEmail);
    console.log('Mot de passe:', adminPassword);
    console.log('ID:', admin.id);

  } catch (error) {
    console.error('Erreur lors de la création de l\'admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
