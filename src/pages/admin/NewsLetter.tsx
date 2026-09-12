import { useState } from "react";
import { toast } from "sonner";
import {
  PageHeader,
  Panel,
  StatCard,
  StatusPill,
  inputClass,
  btnClass,
} from "@/components/admin/ui";
import { downloadCsv, formatDate, toCsv } from "@/lib/admin/csv";
import { Download, Loader2, Search, Trash2, Users } from "lucide-react";
import {
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
  useGetSubscriberStatsQuery,
} from "@/store/api/subscriptionApi";
import type { SubscriberStatus } from "@/types";

const PAGE_SIZE = 10;

export function NewsletterPage() {
  const [search, setSearch] = useState("");
  const [status] = useState<"all" | SubscriberStatus>("all");
  const [page, setPage] = useState(1);

  // Fetch subscribers with filters
  const { data: subscribersData, isLoading, isFetching } = useGetSubscribersQuery({
    status: status === "all" ? undefined : status,
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });
  console.log("search update:", search);
  // Fetch stats
  const { data: statsData } = useGetSubscriberStatsQuery();


  // Update subscriber mutation
  // const [updateSubscriberStatus, { isLoading: isUpdating }] = useUpdateSubscriberStatusMutation();

  // Delete subscriber mutation
  const [deleteSubscriber, { isLoading: isDeleting }] = useDeleteSubscriberMutation();

  const subscribers = subscribersData?.data?.data || [];
  const total = subscribersData?.data?.data.length || 0;
  const totalPages = subscribersData?.data?.totalPages || 1;
  const stats = statsData?.data.stats;

  // Handle status update (Unsubscribe/Resubscribe)
  // const handleStatusUpdate = async (id: string, currentStatus: SubscriberStatus) => {
  //   try {
  //     const nextStatus = currentStatus === "subscribed" ? "unsubscribed" : "subscribed";
  //     await updateSubscriberStatus({
  //       id,
  //       data: {
  //         status: nextStatus,
  //       },
  //     }).unwrap();
  //     toast.success(`Subscriber ${nextStatus === "subscribed" ? "resubscribed" : "unsubscribed"} successfully`);
  //   } catch (error) {
  //     toast.error("Failed to update subscriber status");
  //   }
  // };

  // Handle delete
  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} from the list?`)) return;
    try {
      await deleteSubscriber(id).unwrap();
      toast.success("Subscriber removed successfully");
    } catch (error) {
      toast.error("Failed to delete subscriber");
    }
  };

  // Export CSV
  const exportCsv = () => {
    const csvData = subscribers.map((item:any) => ({
      name: item.name || "",
      email: item.email,
      status: item.status,
      created_at: item.created_at,
    }));

    downloadCsv(
      `subscribers-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(csvData, ["name", "email", "status", "created_at"]),
    );
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Handle status filter change
  // const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setStatus(e.target.value as "all" | SubscriberStatus);
  //   setPage(1);
  // };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-plum" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Money Simplified letter"
        title="Newsletter"
        description="Your list, and the letters you write to it."
      />

      {/* Stats Cards */}
      {stats && (
        <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <StatCard label="Total" value={stats.total} icon={<Users size={17} />} />
          {/* <StatCard label="subscribed" value={stats.subscribed} icon={<Mail size={17} />} tone="emerald" /> */}
          {/* <StatCard
            label="Unsubscribed"
            value={stats.unsubscribed}
            icon={<MailX size={17} />}
            tone="gold"
          /> */}
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or email"
            className={`${inputClass} w-full pl-10`}
          />
        </div>
        {/* <select
          value={status}
          onChange={handleStatusChange}
          className={inputClass}
        >
          <option value="all">All statuses</option>
          <option value="subscribed">subscribed</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select> */}
        <button onClick={exportCsv} className={btnClass}>
          <Download size={14} /> Export CSV
        </button>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
          {total} subscriber{total !== 1 ? "s" : ""}
          {isFetching && " (loading...)"}
        </span>
      </div>

      {/* Subscribers Table */}
      <Panel>
        {subscribers.length === 0 ? (
          <p className="px-6 py-14 text-center text-[0.9rem] text-muted-foreground">
            No subscribers match these filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-[color:var(--tint)]">
                  {["Name", "Email", "Status", "Joined", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s:any) => (
                  <tr key={s.id} className="border-b border-line/70 transition hover:bg-[color:var(--tint)]">
                    <td className="px-5 py-3.5 text-[0.9rem] font-semibold text-plum">
                      {s.name ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-[0.85rem] text-muted-foreground">{s.email}</td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={s.status} />
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[0.75rem] text-muted-foreground">
                      {formatDate(s.created_at)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* <button
                          onClick={() => handleStatusUpdate(s.id, s.status)}
                          disabled={isUpdating}
                          className="rounded-lg px-2.5 py-1.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.06em] text-plum transition hover:bg-plum/8 disabled:opacity-50"
                        >
                          {s.status === "subscribed" ? "Unsubscribe" : "Resubscribe"}
                        </button> */}
                        <button
                          onClick={() => handleDelete(s.id, s.email)}
                          disabled={isDeleting}
                          aria-label="Delete"
                          className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`${btnClass} disabled:opacity-40`}
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`${btnClass} disabled:opacity-40`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsletterPage;