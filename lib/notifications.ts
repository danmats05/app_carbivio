import { EventEmitter } from "events";

// Singleton global — survit au hot-reload Next.js en dev
const g = globalThis as unknown as { _carbivioEmitter?: EventEmitter };
if (!g._carbivioEmitter) {
  g._carbivioEmitter = new EventEmitter();
  g._carbivioEmitter.setMaxListeners(50);
}
export const notificationEmitter = g._carbivioEmitter;

export interface OrderNotification {
  id: string;
  clientName: string;
  serviceType: string;
  location: string;
  createdAt: string;
}

export interface DriverAssignmentNotification {
  requestId: string;
  driverId: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

export interface DriverStatusNotification {
  requestId: string;
  driverName: string;
  clientName: string;
  serviceType: string;
  newStatus: "IN_PROGRESS" | "COMPLETED";
  updatedAt: string;
}
