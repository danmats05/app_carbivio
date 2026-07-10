import prisma from "@/lib/prisma";

export async function getUserRequests(userId: string) {
  return prisma.serviceRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllRequests() {
  return prisma.serviceRequest.findMany({
    include: {
      user: { select: { name: true, email: true } },
      driver: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDriverRequests(driverId: string) {
  return prisma.serviceRequest.findMany({
    where: { driverId },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function assignDriverToRequest(
  requestId: string,
  driverId: string,
  adminId: string,
) {
  const req = await prisma.serviceRequest.update({
    where: { id: requestId },
    data: { driverId },
    include: { user: { select: { name: true, email: true } } },
  });

  await prisma.adminLog.create({
    data: {
      adminId,
      action: "ASSIGNED_DRIVER",
      targetId: requestId,
    },
  });

  return req;
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

export async function updateRequestStatusByDriver(
  id: string,
  status: "IN_PROGRESS" | "COMPLETED",
) {
  return prisma.serviceRequest.update({
    where: { id },
    data: { status },
  });
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
