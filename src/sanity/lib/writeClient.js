import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Don't read token at module level — read it at call time
export const hasSanityWriteToken = () =>
  Boolean(process.env.SANITY_API_WRITE_TOKEN);

export const receiptCounterClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
 
  get token() {
    return process.env.SANITY_API_WRITE_TOKEN;
  },
});