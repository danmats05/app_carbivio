const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkAndCreateAdmin() {
  try {
    console.log('Vérification de l\'utilisateur admin...');
    
    const adminEmail = 'admin@carbivio.com';
    
    // Vérifier si l'admin existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      console.log('✅ Admin trouvé:');
      console.log('Email:', existingAdmin.email);
      console.log('Nom:', existingAdmin.name);
      console.log('Rôle:', existingAdmin.role);
      console.log('ID:', existingAdmin.id);
      
      // Vérifier le mot de passe
      const isValid = await bcrypt.compare('admin123456', existingAdmin.password);
      console.log('Mot de passe valide:', isValid);
      
      if (!isValid) {
        console.log('🔄 Mise à jour du mot de passe...');
        const hashedPassword = await bcrypt.hash('admin123456', 12);
        await prisma.user.update({
          where: { email: adminEmail },
          data: { password: hashedPassword }
        });
        console.log('✅ Mot de passe mis à jour');
      }
    } else {
      console.log('❌ Admin non trouvé, création...');
      
      const hashedPassword = await bcrypt.hash('admin123456', 12);

      const admin = await prisma.user.create({
        data: {
          name: 'Admin Carbivio',
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN'
        }
      });

      console.log('✅ Admin créé:');
      console.log('Email:', adminEmail);
      console.log('Mot de passe: admin123456');
      console.log('ID:', admin.id);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndCreateAdmin();
