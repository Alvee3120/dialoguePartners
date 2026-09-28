import ContactMessageTable from "@/components/admin/ContactMessageTable";
import { requireAdmin } from "@/lib/auth";
import { listContactMessages } from "@/lib/contact-messages";

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await listContactMessages();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        Messages
      </h1>
      <p className="mt-1 text-sm text-foreground">
        {messages.length} from the contact form. &ldquo;Not sent&rdquo; means
        the notification email to the team inbox didn&rsquo;t go out — the
        message itself is still saved here.
      </p>

      <div className="mt-6">
        <ContactMessageTable messages={messages} />
      </div>
    </div>
  );
}
