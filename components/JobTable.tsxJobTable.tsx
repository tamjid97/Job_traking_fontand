"use client";

import { useTransition } from "react";
import { Job, JobStatus, STATUS_LABELS, STATUS_STYLES } from "@/lib/types";


const STATUS_OPTIONS: JobStatus[] = [
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
  "ARCHIVED",
];

interface JobTableProps {
  jobs: Job[];
}

export default function JobTable({ jobs }: JobTableProps) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(id: string, status: JobStatus) {
    startTransition(async () => {
      await updateJobStatus(id, status);
    });
  }

  function handleDelete(id: string, companyName: string) {
    if (!confirm(`Delete application to ${companyName}? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteJob(id);
    });
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-gray-500">No applications yet. Click “Add Application” to get started.</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${isPending ? "opacity-60" : ""}`}>
      {/* Desktop table */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Position</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Applied</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">
                {job.jobLink ? (
                  <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                    {job.companyName}
                  </a>
                ) : (
                  job.companyName
                )}
              </td>
              <td className="px-4 py-3 text-gray-600">{job.position}</td>
              <td className="px-4 py-3 text-gray-600">{job.location || "—"}</td>
              <td className="px-4 py-3 text-gray-600">
                {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : "—"}
              </td>
              <td className="px-4 py-3">
                <select
                  value={job.status}
                  onChange={(e) => handleStatus_Change_Fallback(job.id, e.target.value as JobStatus)}
                  className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium ring-1 ring-inset focus:outline-none ${STATUS_STYLES[job.status]}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleDelete(job.id, job.companyName)}
                  className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="divide-y divide-gray-100 md:hidden">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{job.companyName}</p>
                <p className="text-sm text-gray-600">{job.position}</p>
              </div>
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value as JobStatus)}
                className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[job.status]}`}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{job.location || "No location"}</span>
              <button
                onClick={() => handleDelete(job.id, job.companyName)}
                className="text-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function handleStatus_Change_Fallback(id: string, status: JobStatus) {
    handleStatusChange(id, status);
  }
}