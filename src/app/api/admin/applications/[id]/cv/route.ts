import { NextResponse, type NextRequest } from "next/server";
import { getApplicationById } from "@/lib/applications";
import { getSession } from "@/lib/auth";
import { getSignedObjectUrl, isR2Configured } from "@/lib/r2";
import { isUuid } from "@/lib/validation";

/**
 * CV downloads are never public: this checks the admin session, then hands back
 * a short-lived signed R2 URL (which also sets the original filename).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  if (!isUuid(id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const application = await getApplicationById(id);
  if (!application) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (!isR2Configured()) {
    return new NextResponse("Storage is not configured", { status: 503 });
  }

  const url = await getSignedObjectUrl(application.cvKey, {
    expiresInSeconds: 300,
    downloadFilename: application.cvFilename,
  });

  return NextResponse.redirect(url);
}
