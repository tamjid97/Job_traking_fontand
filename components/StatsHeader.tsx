"use client";

import { Job, JobStatus } from "@/lib/types";
import { Briefcase, Clock, CheckCircle2, XCircle, Archive, LayoutGrid } from "lucide-react";

interface StatsHeaderProps {
  jobs: Job[];
}

export function StatsHeader({ jobs }: StatsHeaderProps) {
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "APPLIED").length,
    interviewing: jobs.filter((j) => j.status === "INTERVIEWING").length,
    offered: jobs.filter((j) => j.status === "OFFERED").length,
    rejected: jobs.filter((j) => j.status === "REJECTED").length,
  };

  const statCards = [
    { label: "Total Applications", value: stats.total, icon: LayoutGrid, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Applied", value: stats.applied, icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Interviewing", value: stats.interviewing, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Offered", value: stats.offered, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {statCards.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}