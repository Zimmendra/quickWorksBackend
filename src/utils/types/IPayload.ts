export interface IPayload {
  id: string;
  email: string;
  role: string;
}

export enum AuthRole {
  OPEN = 'OPEN',
  PROCUREMENT_MANAGER = 'PROCUREMENT_MANAGER',
  PROCUREMENT_ADMIN = 'PROCUREMENT_ADMIN',
  SITE_MANAGER = 'SITE_MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  SUPPLIER = 'SUPPLIER',
}

export enum Status{
  AVAILABLE = "AVAILABLE",
  ACCEPTED = 'ACCEPTED',
  APPROVED = 'APPROVED',
  ONGOING = 'ONGOING',
  PAYMENT = 'PAYMENT',
  COMPLETED = 'COMPLETED',
  TOBEAPPROVED = 'TOBEAPPROVED'
}

export interface JWT_OPTIONS {
  algorithm: string;
  issuer: string;
  audience: string;
  expiresIn: any;
}
