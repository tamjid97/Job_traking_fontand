export enum JobStatus {
  APPLIED = "APPLIED",
  INTERVIEWING = "INTERVIEWING",
  OFFERED = "OFFERED",
  REJECTED = "REJECTED",
  ARCHIVED = "ARCHIVED",
}

export interface Job {
  id: string;
  companyName: string;
  position: string;
  jobLink?: string | null;
  salary?: string | null;
  location?: string | null;
  status: JobStatus;
  notes?: string | null;
  interviewDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const STATUS_LABELS: Record<JobStatus, string> = {
  [JobStatus.APPLIED]: "Applied",
  [JobStatus.INTERVIEWING]: "Interviewing",
  [JobStatus.OFFERED]: "Offered",
  [JobStatus.REJECTED]: "Rejected",
  [JobStatus.ARCHIVED]: "Archived",
};

export const STATUS_STYLES: Record<JobStatus, string> = {
  [JobStatus.APPLIED]: "bg-blue-50 text-blue-700 ring-blue-600/20",
  [JobStatus.INTERVIEWING]: "bg-amber-50 text-amber-700 ring-amber-600/20",
  [JobStatus.OFFERED]: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  [JobStatus.REJECTED]: "bg-red-50 text-red-700 ring-red-600/20",
  [JobStatus.ARCHIVED]: "bg-gray-100 text-gray-600 ring-gray-500/20",
};