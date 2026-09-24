import { PLOT_INVENTORY_PROJECTS } from "./plotInventoryProjects";

const createProjectInventoryItem = (S, project) => {
  const {
    title,
    value,
    usesPlotTier,
  } = project;

  const items = [
    /*
    |--------------------------------------------------------------------------
    | ALL PLOTS
    |--------------------------------------------------------------------------
    */

    S.listItem()
      .id(`${value}-all-plots`)
      .title("All Plots")
      .child(
        S.documentList()
          .title(`${title} - All Plots`)
          .schemaType("plotInventory")
          .filter(
            `_type == "plotInventory" &&
             projectSlug == $projectSlug`,
          )
          .params({
            projectSlug: value,
          })
          .defaultOrdering([
            {
              field: "plotNumber",
              direction: "asc",
            },
          ]),
      ),

    S.divider(),
  ];

  /*
  |--------------------------------------------------------------------------
  | PROJECT-SPECIFIC AVAILABLE FILTERS
  |--------------------------------------------------------------------------
  */

  if (usesPlotTier) {
    items.push(
      S.listItem()
        .id(`${value}-premium`)
        .title("Available - Premium")
        .child(
          S.documentList()
            .title(
              `${title} - Available - Premium`,
            )
            .schemaType("plotInventory")
            .filter(
              `_type == "plotInventory" &&
               projectSlug == $projectSlug &&
               saleStatus == "available" &&
               plotTier == "premium"`,
            )
            .params({
              projectSlug: value,
            })
            .defaultOrdering([
              {
                field: "plotNumber",
                direction: "asc",
              },
            ]),
        ),

      S.listItem()
        .id(`${value}-super-premium`)
        .title("Available - Super Premium")
        .child(
          S.documentList()
            .title(
              `${title} - Available - Super Premium`,
            )
            .schemaType("plotInventory")
            .filter(
              `_type == "plotInventory" &&
               projectSlug == $projectSlug &&
               saleStatus == "available" &&
               plotTier == "superPremium"`,
            )
            .params({
              projectSlug: value,
            })
            .defaultOrdering([
              {
                field: "plotNumber",
                direction: "asc",
              },
            ]),
        ),
    );
  } else {
    items.push(
      S.listItem()
        .id(`${value}-available`)
        .title("Available")
        .child(
          S.documentList()
            .title(`${title} - Available`)
            .schemaType("plotInventory")
            .filter(
              `_type == "plotInventory" &&
               projectSlug == $projectSlug &&
               saleStatus == "available"`,
            )
            .params({
              projectSlug: value,
            })
            .defaultOrdering([
              {
                field: "plotNumber",
                direction: "asc",
              },
            ]),
        ),
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SOLD
  |--------------------------------------------------------------------------
  */

  items.push(
    S.listItem()
      .id(`${value}-sold`)
      .title("Sold")
      .child(
        S.documentList()
          .title(`${title} - Sold`)
          .schemaType("plotInventory")
          .filter(
            `_type == "plotInventory" &&
             projectSlug == $projectSlug &&
             saleStatus == "sold"`,
          )
          .params({
            projectSlug: value,
          })
          .defaultOrdering([
            {
              field: "plotNumber",
              direction: "asc",
            },
          ]),
      ),

    S.divider(),
  );

  /*
  |--------------------------------------------------------------------------
  | NEEDS ATTENTION
  |--------------------------------------------------------------------------
  */

  const needsAttentionFilter = usesPlotTier
    ? `
      _type == "plotInventory" &&
      projectSlug == $projectSlug &&
      (
        !defined(saleStatus) ||
        (
          saleStatus == "available" &&
          !defined(plotTier)
        )
      )
    `
    : `
      _type == "plotInventory" &&
      projectSlug == $projectSlug &&
      !defined(saleStatus)
    `;

  items.push(
    S.listItem()
      .id(`${value}-needs-attention`)
      .title("Needs Attention")
      .child(
        S.documentList()
          .title(
            `${title} - Plots Needing Attention`,
          )
          .schemaType("plotInventory")
          .filter(needsAttentionFilter)
          .params({
            projectSlug: value,
          })
          .defaultOrdering([
            {
              field: "plotNumber",
              direction: "asc",
            },
          ]),
      ),
  );

  return S.listItem()
    .id(`plot-inventory-${value}`)
    .title(title)
    .child(
      S.list()
        .title(title)
        .items(items),
    );
};

export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      /*
       * Keep all your existing document types.
       * Exclude plotInventory because we provide the custom menu below.
       */
      ...S.documentTypeListItems().filter(
        (listItem) =>
          listItem.getId() !== "plotInventory",
      ),

      S.divider(),

      S.listItem()
        .id("plot-inventory")
        .title("Plot Inventory")
        .child(
          S.list()
            .title("Plot Inventory")
            .items(
              PLOT_INVENTORY_PROJECTS.map((project) =>
                createProjectInventoryItem(
                  S,
                  project,
                ),
              ),
            ),
        ),
    ]);