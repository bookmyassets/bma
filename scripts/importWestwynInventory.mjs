import { createClient } from "@sanity/client";

import { westwynInventoryStatus } from "./data/westwynInventoryStatus.js";
import { westwynEstateInventoryStatus } from "./data/westwynEstateInventoryStatus.js";
import { westwynCountyInventoryStatus } from "./data/westwynCountyInventoryStatus.js";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
}

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

/*
|--------------------------------------------------------------------------
| PROJECT INVENTORY CONFIG
|--------------------------------------------------------------------------
*/

const PROJECTS = {
  "westwyn-residency": {
    title: "WestWyn Residency",

    inventory: westwynInventoryStatus,

    minPlotNumber: 1,
    maxPlotNumber: 290,
    expectedPlotCount: 290,

    usesPlotTier: true,
  },

  "westwyn-estate": {
    title: "WestWyn Estates",

    inventory: westwynEstateInventoryStatus,

    minPlotNumber: 101,
    maxPlotNumber: 229,
    expectedPlotCount: 129,

    usesPlotTier: false,
  },
  "westwyn-county": {
    title: "WestWyn County",
    inventory: westwynCountyInventoryStatus,
    minPlotNumber: 1,
    maxPlotNumber: 126,
    expectedPlotCount: 130,
    usesPlotTier: false,
    hasAlphaPlots: true,
  },
};

/*
|--------------------------------------------------------------------------
| PROJECT FROM COMMAND LINE
|--------------------------------------------------------------------------
|
| Example:
|
| node scripts/importPlotInventory.js westwyn-residency
|
| node scripts/importPlotInventory.js westwyn-estate
|
*/

const PROJECT_SLUG = process.argv[2];

if (!PROJECT_SLUG) {
  throw new Error(
    [
      "Missing project slug.",
      "",
      "Use:",
      "node scripts/importPlotInventory.js westwyn-residency",
      "or:",
      "node scripts/importPlotInventory.js westwyn-estate",
    ].join("\n"),
  );
}

const project = PROJECTS[PROJECT_SLUG];

if (!project) {
  throw new Error(`Unsupported inventory project: ${PROJECT_SLUG}`);
}

const {
  title,
  inventory,
  minPlotNumber,
  maxPlotNumber,
  expectedPlotCount,
  usesPlotTier,
  hasAlphaPlots = false,
} = project;

/*
|--------------------------------------------------------------------------
| ALLOWED VALUES
|--------------------------------------------------------------------------
*/

const allowedSaleStatuses = new Set(["available", "sold"]);

const allowedPlotTiers = new Set(["premium", "superPremium"]);

/*
|--------------------------------------------------------------------------
| INVENTORY VALIDATION
|--------------------------------------------------------------------------
*/

const validateInventory = () => {
  const seenPlots = new Set();

  for (const item of inventory) {
    /*
    ----------------------------------------------------------------
    Plot number
    ----------------------------------------------------------------
    */

    const isAlphaPlot =
      typeof item.plotNumber === "string" &&
      /^[0-9]+[A-Z]+$/.test(item.plotNumber);

    const isNumericPlot = Number.isInteger(item.plotNumber);

    if (!isNumericPlot && !isAlphaPlot) {
      throw new Error(`${title}: invalid plot number ${item.plotNumber}.`);
    }

    if (
      !isAlphaPlot &&
      (item.plotNumber < minPlotNumber || item.plotNumber > maxPlotNumber)
    ) {
      throw new Error(`${title}: invalid plot number ${item.plotNumber}.`);
    }

    /*
    ----------------------------------------------------------------
    Sale status
    ----------------------------------------------------------------
    */

    if (!allowedSaleStatuses.has(item.saleStatus)) {
      throw new Error(
        `${title}: invalid saleStatus for Plot ${item.plotNumber}: ${item.saleStatus}`,
      );
    }

    /*
    ----------------------------------------------------------------
    Residency tier validation
    ----------------------------------------------------------------
    */

    if (usesPlotTier) {
      if (
        item.saleStatus === "available" &&
        !allowedPlotTiers.has(item.plotTier)
      ) {
        throw new Error(
          `${title}: Plot ${item.plotNumber} is available but has no valid plotTier.`,
        );
      }

      if (item.plotTier != null && !allowedPlotTiers.has(item.plotTier)) {
        throw new Error(
          `${title}: invalid plotTier for Plot ${item.plotNumber}: ${item.plotTier}`,
        );
      }
    }

    /*
    ----------------------------------------------------------------
    Estate must NOT contain plot tier
    ----------------------------------------------------------------
    */

    if (!usesPlotTier && item.plotTier != null) {
      throw new Error(
        `${title}: Plot ${item.plotNumber} should not contain plotTier.`,
      );
    }

    /*
    ----------------------------------------------------------------
    Duplicate plot protection
    ----------------------------------------------------------------
    */

    if (seenPlots.has(item.plotNumber)) {
      throw new Error(`${title}: duplicate Plot ${item.plotNumber} found.`);
    }

    seenPlots.add(item.plotNumber);
  }
};

/*
|--------------------------------------------------------------------------
| COMPLETE INVENTORY VALIDATION
|--------------------------------------------------------------------------
*/

const validateCompleteInventory = () => {
  if (inventory.length !== expectedPlotCount) {
    throw new Error(
      `${title}: expected ${expectedPlotCount} plots but found ${inventory.length}.`,
    );
  }

  const plotNumbers = new Set(inventory.map((item) => String(item.plotNumber)));

  if (hasAlphaPlots) {
    const requiredAlphaPlots = ["70A", "70B", "70C", "70D"];

    for (const plot of requiredAlphaPlots) {
      if (!plotNumbers.has(plot)) {
        throw new Error(`${title}: Plot ${plot} is missing.`);
      }
    }
  }

  for (
    let plotNumber = minPlotNumber;
    plotNumber <= maxPlotNumber;
    plotNumber++
  ) {
    if (!plotNumbers.has(String(plotNumber))) {
      throw new Error(`${title}: Plot ${plotNumber} is missing.`);
    }
  }
};

/*
|--------------------------------------------------------------------------
| CREATE SANITY DOCUMENT
|--------------------------------------------------------------------------
*/

const createPlotDocument = (item) => {
  const document = {
    _id: `plotInventory-${PROJECT_SLUG}-${item.plotNumber}`,

    _type: "plotInventory",

    projectSlug: PROJECT_SLUG,

    plotNumber: item.plotNumber,

    saleStatus: item.saleStatus,
  };

  /*
  ----------------------------------------------------------------
  Only Residency gets plotTier
  ----------------------------------------------------------------
  */

  if (usesPlotTier && item.plotTier) {
    document.plotTier = item.plotTier;
  }

  return document;
};

/*
|--------------------------------------------------------------------------
| IMPORT
|--------------------------------------------------------------------------
*/

const run = async () => {
  validateInventory();

  validateCompleteInventory();

  const BATCH_SIZE = 50;

  let processed = 0;

  const availableCount = inventory.filter(
    (item) => item.saleStatus === "available",
  ).length;

  const soldCount = inventory.filter(
    (item) => item.saleStatus === "sold",
  ).length;

  console.log("");
  console.log(`Importing ${title}`);

  console.log(`Project slug: ${PROJECT_SLUG}`);

  console.log(`Total plots: ${inventory.length}`);

  console.log(`Available: ${availableCount}`);

  console.log(`Sold: ${soldCount}`);

  console.log("");

  for (let index = 0; index < inventory.length; index += BATCH_SIZE) {
    const batch = inventory.slice(index, index + BATCH_SIZE);

    let transaction = client.transaction();

    for (const item of batch) {
      transaction = transaction.createOrReplace(createPlotDocument(item));
    }

    const result = await transaction.commit();

    processed += result.results.length;

    console.log(`Processed ${processed}/${inventory.length}`);
  }

  console.log("");
  console.log(`${title} inventory import complete.`);
};

run().catch((error) => {
  console.error("Inventory import failed:", error);

  process.exit(1);
});
