"use client";

import { setApplicationStatusAction } from "@/lib/actions/applications";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABELS,
} from "@/lib/job-options";

export default function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  return (
    <form action={setApplicationStatusAction}>
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor={`status-${id}`}>
        Application status
      </label>
      <select
        id={`status-${id}`}
        name="status"
        defaultValue={status}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink outline-none transition-colors focus:border-accent-deep"
      >
        {APPLICATION_STATUSES.map((value) => (
          <option key={value} value={value}>
            {APPLICATION_STATUS_LABELS[value]}
          </option>
        ))}
      </select>
    </form>
  );
}
