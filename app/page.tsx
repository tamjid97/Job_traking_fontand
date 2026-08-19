import { getJobs } from "./actions";
import { JobDashboard } from "@/components/JobDashboard";
import { Job } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const jobs = await getJobs();
  
  return <JobDashboard initialJobs={jobs as unknown as Job[]} />;
}