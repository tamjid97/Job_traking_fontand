"use server";

import { PrismaClient, JobStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// ১. সব জব ফেচ করা
export async function getJobs() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jobs;
  } catch (error) {
    throw new Error("Failed to fetch jobs");
  }
}

// ২. নতুন জব তৈরি করা
export async function createJob(data: {
  companyName: string;
  position: string;
  jobLink?: string | null;
  salary?: string | null;
  location?: string | null;
  status: JobStatus;
  notes?: string | null;
  interviewDate?: string | null;
}) {
  try {
    await prisma.job.create({
      data: {
        companyName: data.companyName,
        position: data.position,
        jobLink: data.jobLink || null,
        salary: data.salary || null,
        location: data.location || null,
        status: data.status,
        notes: data.notes || null,
        interviewDate: data.interviewDate ? new Date(data.interviewDate) : null,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to create job application");
  }
}

// ৩. জবের স্ট্যাটাস আপডেট করা
export async function updateJobStatus(id: string, status: JobStatus) {
  try {
    await prisma.job.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to update status");
  }
}

// ৪. জব ডিলিট করা
export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({
      where: { id },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to delete job");
  }
}