import prisma from "@/lib/prisma";

export async function getUserRequests(userId: string) {
  return prisma.serviceRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllRequests() {
  return prisma.serviceRequest.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createRequest(data: {
  userId: string;
  serviceType: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  price?: number;
}) {
  return prisma.serviceRequest.create({
    data: {
      ...data,
      status: "APPROVED", // Automatiquement approuvée
    },
  });
}

export async function updateRequestStatus(
  id: string,
  status: any,
  adminId: string,
) {
  const req = await prisma.serviceRequest.update({
    where: { id },
    data: { status },
  });

  await prisma.adminLog.create({
    data: {
      adminId,
      action: `UPDATED_REQUEST_STATUS_TO_${status}`,
      targetId: id,
    },
  });

  return req;
}

export async function deleteRequest(id: string, adminId: string) {
  const req = await prisma.serviceRequest.delete({
    where: { id },
  });

  await prisma.adminLog.create({
    data: {
      adminId,
      action: `DELETED_REQUEST`,
      targetId: id,
    },
  });

  return req;
}
