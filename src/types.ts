import { FieldValue } from "firebase/firestore/lite";

export interface FamilyMember {
  id?: string;
  name: string;
  relation: string;
  contactNumber?: string;
  isWhatsApp?: boolean;
  dateOfBirth?: string;
  education?: string;
  profession?: string;
  address?: string;
  village?: string;
  taluko?: string;
  district?: string;
}

export interface Family {
  id?: string;
  headOfFamily: FamilyMember;
  address?: string;
  village?: string;
  taluko?: string;
  district?: string;
  members?: FamilyMember[];
  createdAt: FieldValue;
}
