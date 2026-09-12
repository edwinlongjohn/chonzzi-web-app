import {useState} from "react";
import { toast } from "sonner";
import {
  PageHeader,
  Panel,
  StatusPill,
  inputClass,
  btnClass,
} from "@/components/admin/ui";
import { downloadCsv, formatDate, toCsv } from "@/lib/admin/csv";
import { Download, Loader2, Search, Trash2, X } from "lucide-react";
import {
  useGetWaitlistEntriesQuery,
  useUpdateWaitlistStatusMutation,
  useUpdateWaitlistNotesMutation,
  useDeleteWaitlistEntryMutation,
  useGetWaitlistStatsQuery,
} from "@/store/api/waitlistApi";
import type { WaitlistStatus, WaitlistEntry } from "@/types";

const STATUSES: WaitlistStatus[] = ["pending", "contacted", "enrolled", "archived"];
const PAGE_SIZE = 10;

export function WaitlistPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | WaitlistStatus>("all");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<WaitlistEntry | null>(null);

  // Fetch waitlist entries with filters & pagination
  const { data: entriesData, isLoading, refetch } = useGetWaitlistEntriesQuery({
    status: status === "all" ? undefined : status,
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  // Fetch stats
  const { data: statsData } = useGetWaitlistStatsQuery();

  // Mutations
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateWaitlistStatusMutation();
  const [updateNotes, { isLoading: isUpdatingNotes }] = useUpdateWaitlistNotesMutation();
  const [deleteEntry, { isLoading: isDeleting }] = useDeleteWaitlistEntryMutation();

  const entries = entriesData?.data?.data || [];
  const total = entriesData?.data?.data?.length || 0;
  const totalPages = entriesData?.data?.totalPages || 1;
  const stats = statsData?.data.stats;
  console.log("entries data", entriesData?.data);
  // Handle status update with notes
  const handleUpdateStatus = async (id: string, newStatus: WaitlistStatus, adminNotes?: string) => {
    try {
      await updateStatus({
        id,
        data: {
          status: newStatus,
          admin_notes: adminNotes,
        },
      }).unwrap();
      
      toast.success("Status updated successfully");
      refetch();
      setDetail(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  // Handle notes update only
  const handleUpdateNotes = async (id: string, adminNotes: string) => {
    try {
      await updateNotes({
        id,
        data: { admin_notes: adminNotes },
      }).unwrap();
      
      toast.success("Notes updated successfully");
      refetch();
      setDetail(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update notes");
    }
  };

  // Handle delete
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the waitlist?`)) return;
    try {
      await deleteEntry(id).unwrap();
      toast.success("Registrant removed");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  // Export CSV
  const exportCsv = () => {
    const csvData = entries.map((item) => ({
      name: item.name,
      email: item.email,
      status: item.status,
      note: item.admin_notes || "",
      created_at: item.created_at,
    }));

    downloadCsv(
      `waitlist-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(csvData as any, ["name", "email", "status", "note", "created_at"]),
    );
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-plum" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Bootcamp"
        title="Waitlist"
        description="Everyone who asked to be told when the next bootcamp opens."
        actions={
          <button onClick={exportCsv} className={btnClass}>
            <Download size={14} /> Export CSV
          </button>
        }
      />

      {/* Stats Cards */}
      {stats && (
        <div className="mb-5 grid gap-4 sm:grid-cols-4">
          <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </Panel>
          <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-gold">{stats.pending}</p>
          </Panel>
          <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Contacted</p>
            <p className="text-2xl font-bold text-blue-500">{stats.contacted}</p>
          </Panel>
          <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Enrolled</p>
            <p className="text-2xl font-bold text-emerald">{stats.enrolled}</p>
          </Panel>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email"
            className={`${inputClass} w-full pl-10`}
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as "all" | WaitlistStatus);
            setPage(1);
          }}
          className={inputClass}
        >
          <option value="all">All status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
          {total} record{total === 1 ? "" : "s"}
        </span>
      </div>

      <Panel>
        {entries.length === 0 ? (
          <p className="px-6 py-14 text-center text-[0.9rem] text-muted-foreground">
            Nothing matches these filters yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-[color:var(--tint)]">
                  {["Name", "Email",  "Status", "Joined", ""].map((h) => (
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
                {entries.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setDetail(r)}
                    className="cursor-pointer border-b border-line/70 transition hover:bg-[color:var(--tint)]"
                  >
                    <td className="px-5 py-3.5 text-[0.9rem] font-semibold text-plum">
                      {r.name}
                    </td>
                    <td className="px-5 py-3.5 text-[0.85rem] text-muted-foreground">{r.email}</td>
                    
                    <td className="px-5 py-3.5">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[0.75rem] text-muted-foreground">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(r.id, r.name);
                        }}
                        disabled={isDeleting}
                        aria-label="Delete"
                        className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

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

      {detail && (
        <DetailDrawer
          row={detail}
          onClose={() => setDetail(null)}
          onUpdateStatus={(newStatus, notes) => handleUpdateStatus(detail.id, newStatus, notes)}
          onUpdateNotes={(notes) => handleUpdateNotes(detail.id, notes)}
          saving={isUpdatingStatus || isUpdatingNotes}
        />
      )}
    </>
  );
}

function DetailDrawer({
  row,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  saving,
}: {
  row: WaitlistEntry;
  onClose: () => void;
  onUpdateStatus: (status: WaitlistStatus, notes?: string) => void;
  onUpdateNotes: (notes: string) => void;
  saving: boolean;
}) {
  const [status, setStatus] = useState<WaitlistStatus>(row.status);
  const [notes, setNotes] = useState(row.admin_notes ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Check if status changed
    if (status !== row.status) {
      onUpdateStatus(status, notes);
    } else if (notes !== (row.admin_notes ?? "")) {
      // Only notes changed
      onUpdateNotes(notes);
    } else {
      toast.info("No changes to save");
      setIsSaving(false);
      return;
    }
    
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-plum-deep/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative h-full w-full max-w-md overflow-y-auto bg-white p-7 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-[color:var(--tint)]"
        >
          <X size={16} />
        </button>
        <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Registrant
        </p>
        <h2 className="mt-2 text-[1.4rem]">{row.name}</h2>
        <dl className="mt-5 space-y-3 text-[0.88rem]">
          {[
            ["Email", row.email],
            ["Joined", formatDate(row.created_at)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-line pb-2.5">
              <dt className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                {k}
              </dt>
              <dd className="m-0 text-right text-plum">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <label className="mb-1.5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-plum">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as WaitlistStatus)}
            className={`${inputClass} w-full`}
            disabled={saving}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-plum">
            Admin notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Internal only. Add notes about this registrant."
            className={`${inputClass} w-full resize-y`}
            disabled={saving}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving || isSaving}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-plum px-5 py-3 font-mono text-[0.78rem] font-bold uppercase tracking-[0.08em] text-white disabled:opacity-60"
        >
          {(saving || isSaving) && <Loader2 size={14} className="animate-spin" />}
          {saving || isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default WaitlistPage;