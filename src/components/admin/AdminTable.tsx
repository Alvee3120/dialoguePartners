import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { deleteAdminAction, setAdminActiveAction } from "@/lib/actions/admins";
import type { AdminUser } from "@/lib/db/schema";
import { formatDate } from "@/lib/format";
import { ADMIN_ROLE_LABELS } from "@/lib/job-options";

const roleBadgeStyles: Record<string, string> = {
  owner: "bg-accent-soft text-accent-deep",
  admin: "bg-paper text-foreground",
};

export default function AdminTable({
  admins,
  currentUserId,
}: {
  admins: AdminUser[];
  currentUserId: string;
}) {
  if (admins.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
        <p className="text-sm font-medium text-ink">No admins yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="bg-paper text-xs uppercase tracking-[0.15em] text-foreground/60">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Added</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            const isSelf = admin.id === currentUserId;
            return (
              <tr key={admin.id} className="border-t border-line align-top">
                <td className="px-4 py-4">
                  <p className="font-medium text-ink">
                    {admin.name}
                    {isSelf ? (
                      <span className="ml-2 text-xs font-normal text-foreground/50">
                        (you)
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground/70">{admin.email}</p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roleBadgeStyles[admin.role]}`}
                  >
                    {ADMIN_ROLE_LABELS[admin.role]}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      admin.isActive
                        ? "bg-accent-soft text-accent-deep"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {admin.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="px-4 py-4 text-foreground">
                  {formatDate(admin.createdAt)}
                </td>
                <td className="px-4 py-4">
                  {isSelf ? (
                    <span className="text-xs text-foreground/50">—</span>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <form action={setAdminActiveAction}>
                        <input type="hidden" name="id" value={admin.id} />
                        <input
                          type="hidden"
                          name="isActive"
                          value={admin.isActive ? "false" : "true"}
                        />
                        <button
                          type="submit"
                          className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent"
                        >
                          {admin.isActive ? "Deactivate" : "Reactivate"}
                        </button>
                      </form>

                      <form action={deleteAdminAction}>
                        <input type="hidden" name="id" value={admin.id} />
                        <ConfirmSubmitButton
                          message={`Remove ${admin.name} as an admin? This cannot be undone.`}
                          className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:border-red-400 hover:bg-red-50"
                        >
                          Delete
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
