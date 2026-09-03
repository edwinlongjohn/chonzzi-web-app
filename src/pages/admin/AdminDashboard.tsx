import { Link } from "react-router-dom";
import { PageHeader, StatCard, Panel } from "@/components/admin/ui";
import { formatDate } from "@/lib/admin/csv";
import { Users, Mail, UserCheck, Loader2, ArrowRight } from "lucide-react";
import { useGetWaitlistEntriesQuery } from "@/store/api/waitlistApi";
import { useGetBlogStatsQuery } from "@/store/api/blogApi";
import { useGetSubscribersQuery } from "@/store/api/subscriptionApi";
import type { WaitlistEntry, Subscriber } from "@/types";

export default function AdminDashboard() {
  // Fetch waitlist data
  const { 
    data: waitlistData, 
    isLoading: waitlistLoading,
    error: waitlistError 
  } = useGetWaitlistEntriesQuery({
    page: 1,
    limit: 100, // Fetch enough for the dashboard
  });

  // Fetch subscribers data
  const { 
    data: subscribersData, 
    isLoading: subscribersLoading,
    error: subscribersError 
  } = useGetSubscribersQuery({
    page: 1,
    limit: 10, // Fetch only 10 for the dashboard
  });

  // Fetch blog stats (for subscriber info)
  const { 
    data: statsData, 
    isLoading: statsLoading,
    error: statsError 
  } = useGetBlogStatsQuery();

  const isLoading = waitlistLoading || subscribersLoading || statsLoading;
  const error = waitlistError || subscribersError || statsError;

  // Get waitlist entries
  const waitlist = waitlistData?.data?.data || [];
  const totalWaitlist = Array.isArray(waitlistData?.data?.data) ? waitlistData?.data?.data.length : waitlistData?.data?.total || 0;

  // Get subscribers
  const subscribers = subscribersData?.data?.data || [];
  const totalSubscribers = Array.isArray(subscribersData?.data?.data) ? subscribersData?.data?.data.length : subscribersData?.data?.total || 0;

  // Calculate waitlist stats
  const pending = waitlist.filter((w: WaitlistEntry) => w.status === "pending").length;
  const enrolled = waitlist.filter((w: WaitlistEntry) => w.status === "enrolled").length;

  // Calculate subscriber stats
  const active = subscribers.filter((s: Subscriber) => s.status === "subscribed").length;
  const unsubscribed = subscribers.filter((s: Subscriber) => s.status === "unsubscribed").length;

  // Get blog stats (for additional info if needed)
  //const stats = statsData?.data;
  // const totalSubscribers = stats?.total || 0; // Use subscribersData instead
  // const activeSubscribers = stats?.published || 0; // Use subscribersData instead

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-plum" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">Error loading dashboard data. Please refresh.</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="A quick read on who is waiting, who is reading, and what needs your attention."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Waitlist total"
          value={totalWaitlist}
          hint={`${pending} still pending`}
          icon={<Users size={17} />}
        />
        <StatCard
          label="Enrolled"
          value={enrolled}
          hint="Moved from waitlist to course"
          icon={<UserCheck size={17} />}
          tone="emerald"
        />
        <StatCard
          label="Subscribers"
          value={totalSubscribers}
          hint={`${active} active`}
          icon={<Mail size={17} />}
          tone="gold"
        />
        <StatCard
          label="Unsubscribed"
          value={unsubscribed}
          hint="Left the letter"
          icon={<Mail size={17} />}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h3 className="m-0 text-[1rem]">Latest waitlist</h3>
            <Link
              to="/chonzzi-admin/waitlist"
              className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em] text-emerald no-underline"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {waitlist.slice(0, 5).map((w: WaitlistEntry) => (
              <li key={w.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="m-0 truncate text-[0.9rem] font-semibold text-plum">{w.name}</p>
                  <p className="m-0 truncate text-[0.8rem] text-muted-foreground">{w.email}</p>
                </div>
                <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                  {formatDate(w.created_at)}
                </span>
              </li>
            ))}
            {waitlist.length === 0 && (
              <li className="px-5 py-8 text-center text-[0.88rem] text-muted-foreground">
                No registrations yet.
              </li>
            )}
          </ul>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h3 className="m-0 text-[1rem]">Latest subscribers</h3>
            <Link
              to="/chonzzi-admin/newsletter"
              className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em] text-emerald no-underline"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {subscribers.slice(0, 3).map((s: Subscriber) => (
              <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="m-0 truncate text-[0.9rem] font-semibold text-plum">
                    {s.name || s.email}
                  </p>
                  <p className="m-0 truncate text-[0.8rem] text-muted-foreground">{s.email}</p>
                </div>
                <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                  {formatDate(s.created_at)}
                </span>
              </li>
            ))}
            {subscribers.length === 0 && (
              <li className="px-5 py-8 text-center text-[0.88rem] text-muted-foreground">
                No subscribers yet.
              </li>
            )}
          </ul>
        </Panel>
      </div>
    </>
  );
}