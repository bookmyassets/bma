import { createClient } from "@sanity/client";
import { westwynInventoryStatus } from "./data/westwynInventoryStatus.js";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const PROJECT_SLUG = "westwyn-residency";

const inventory = westwynInventoryStatus;

const allowedSaleStatuses = new Set(["available", "sold"]);
const allowedPlotTiers = new Set(["premium", "superPremium"]);

const validateInventory = () => {
  const seenPlots = new Set();

  for (const item of inventory) {
    if (
      !Number.isInteger(item.plotNumber) ||
      item.plotNumber < 1 ||
      item.plotNumber > 290
    ) {
      throw new Error(`Invalid plot number: ${item.plotNumber}`);
    }

    if (!allowedSaleStatuses.has(item.saleStatus)) {
      throw new Error(
        `Invalid saleStatus for Plot ${item.plotNumber}: ${item.saleStatus}`
      );
    }

    if (
      item.saleStatus === "available" &&
      !allowedPlotTiers.has(item.plotTier)
    ) {
      throw new Error(
        `Plot ${item.plotNumber} is available but has no valid plotTier`
      );
    }

    if (item.plotTier != null && !allowedPlotTiers.has(item.plotTier)) {
      throw new Error(
        `Invalid plotTier for Plot ${item.plotNumber}: ${item.plotTier}`
      );
    }

    if (seenPlots.has(item.plotNumber)) {
      throw new Error(`Duplicate Plot ${item.plotNumber} found`);
    }

    seenPlots.add(item.plotNumber);
  }
};

const validateCompleteInventory = () => {
  if (inventory.length !== 290) {
    throw new Error(`Expected 290 plots but found ${inventory.length}`);
  }

  const plotNumbers = new Set(inventory.map((item) => item.plotNumber));

  for (let plotNumber = 1; plotNumber <= 290; plotNumber += 1) {
    if (!plotNumbers.has(plotNumber)) {
      throw new Error(`Plot ${plotNumber} is missing`);
    }
  }
};

const createPlotDocument = (item) => ({
  _id: `plotInventory-${PROJECT_SLUG}-${item.plotNumber}`,
  _type: "plotInventory",
  projectSlug: PROJECT_SLUG,
  plotNumber: item.plotNumber,
  saleStatus: item.saleStatus,
  ...(item.plotTier ? { plotTier: item.plotTier } : {}),
});

const run = async () => {
  validateInventory();
  validateCompleteInventory();

  const BATCH_SIZE = 50;
  let processed = 0;

  console.log(`Importing ${inventory.length} plots...`);

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

  console.log("Inventory import complete.");
};

run().catch((error) => {
  console.error("Inventory import failed:", error);
  process.exit(1);
});