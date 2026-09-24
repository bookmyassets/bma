import { NextResponse } from "next/server";

import { getPlotInventoryByProject } from "@/sanity/lib/api";

const ALLOWED_PROJECTS = new Set([
  "westwyn-residency",
  "westwyn-estate",
  "westwyn-county",
]);

export async function GET(_request, context) {
  const { projectSlug } = await context.params;

  if (!ALLOWED_PROJECTS.has(projectSlug)) {
    return NextResponse.json(
      {
        message: "Unknown project",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const plots =
      await getPlotInventoryByProject(projectSlug);

    return NextResponse.json(
      {
        projectSlug,
        plots,
      },
      {
        headers: {
          "Cache-Control":
            "private, no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Failed to fetch plot inventory",
      error
    );

    return NextResponse.json(
      {
        message: "Unable to load plot inventory",
      },
      {
        status: 500,
      }
    );
  }
}