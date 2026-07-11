// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const type = payload?._type || payload?.type;
  const slug = payload?.slug?.current || payload?.slug;

  if (type === "post") {
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "A post slug is required" },
        { status: 400 },
      );
    }

    revalidatePath(`/dholera-sir-blogs/${slug}`);
    revalidatePath("/dholera-sir-blogs");
    revalidatePath("/sitemap.xml");
  }

  revalidateTag("redirect");
  return NextResponse.json({
    revalidated: true,
    paths:
      type === "post"
        ? [`/dholera-sir-blogs/${slug}`, "/dholera-sir-blogs", "/sitemap.xml"]
        : [],
  });
}
