export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "plotInventory"
      ),

      S.divider(),

      S.listItem()
        .title("Plot Inventory")
        .child(
          S.list()
            .title("WestWyn Residency")
            .items([
              S.listItem()
                .title("All Plots")
                .child(
                  S.documentList()
                    .title("All Plots")
                    .filter(
                      `_type == "plotInventory" &&
                       projectSlug == $projectSlug`
                    )
                    .params({
                      projectSlug: "westwyn-residency",
                    })
                    .defaultOrdering([
                      {
                        field: "plotNumber",
                        direction: "asc",
                      },
                    ])
                ),

              S.divider(),

              S.listItem()
                .title("Available - Premium")
                .child(
                  S.documentList()
                    .title("Available - Premium")
                    .filter(
                      `_type == "plotInventory" &&
                       projectSlug == $projectSlug &&
                       saleStatus == "available" &&
                       plotTier == "premium"`
                    )
                    .params({
                      projectSlug: "westwyn-residency",
                    })
                    .defaultOrdering([
                      {
                        field: "plotNumber",
                        direction: "asc",
                      },
                    ])
                ),

              S.listItem()
                .title("Available - Super Premium")
                .child(
                  S.documentList()
                    .title("Available - Super Premium")
                    .filter(
                      `_type == "plotInventory" &&
                       projectSlug == $projectSlug &&
                       saleStatus == "available" &&
                       plotTier == "superPremium"`
                    )
                    .params({
                      projectSlug: "westwyn-residency",
                    })
                    .defaultOrdering([
                      {
                        field: "plotNumber",
                        direction: "asc",
                      },
                    ])
                ),

              S.listItem()
                .title("Sold")
                .child(
                  S.documentList()
                    .title("Sold Plots")
                    .filter(
                      `_type == "plotInventory" &&
                       projectSlug == $projectSlug &&
                       saleStatus == "sold"`
                    )
                    .params({
                      projectSlug: "westwyn-residency",
                    })
                    .defaultOrdering([
                      {
                        field: "plotNumber",
                        direction: "asc",
                      },
                    ])
                ),

              S.divider(),

              S.listItem()
                .title("Needs Attention")
                .child(
                  S.documentList()
                    .title("Plots Needing Attention")
                    .filter(
                      `_type == "plotInventory" &&
                       projectSlug == $projectSlug &&
                       (
                         !defined(saleStatus) ||
                         (
                           saleStatus == "available" &&
                           !defined(plotTier)
                         )
                       )`
                    )
                    .params({
                      projectSlug: "westwyn-residency",
                    })
                    .defaultOrdering([
                      {
                        field: "plotNumber",
                        direction: "asc",
                      },
                    ])
                ),
            ])
        ),
    ]);