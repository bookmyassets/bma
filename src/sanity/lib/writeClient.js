import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_WRITE_TOKEN;

export const hasSanityWriteToken = Boolean(token);

export const receiptCounterClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});
