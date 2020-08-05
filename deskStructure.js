import S from "@sanity/desk-tool/structure-builder";
export default () =>
  // List all Counties
  S.documentTypeList("county")
    .title("Counties")
    .child((countyId) =>
      // Make a list of items
      S.list()
        .title("Options")
        // list
        .items([
          S.listItem()
            .id(countyId)
            .title("Edit county specifics")
            .child(S.document().schemaType("county").documentId(countyId)),
          // New List of all schools in the county
          S.listItem()
            .title("Schools")
            .child(
              S.documentTypeList("school")
                .title("Schools")
                .filter("_type == $type && county._ref == $countyId")
                .defaultOrdering([{ field: "title", direction: "desc" }])
                .params({ type: "school", countyId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-by-county", { countyId }),
                ])
            ),
          // New list of all products the county want to offer
          S.listItem()
            .title("Products")
            .schemaType("product")
            .child(
              S.documentTypeList("product")
                .title("Products")
                .filter("_type == $type && county._ref == $countyId")
                .defaultOrdering([{ field: "title", direction: "desc" }])
                .params({ type: "product", countyId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-by-county", { countyId }),
                ])
            ),
          // New list of all products the county want to offer
          S.listItem()
            .title("Warranty and Insurance")
            .schemaType("warrantyAndInsurance")
            .child(
              S.documentTypeList("warrantyAndInsurance")
                .title("Warranties and Insurances")
                .filter("_type == $type && county._ref == $countyId")
                .defaultOrdering([{ field: "title", direction: "desc" }])
                .params({ type: "warrantyAndInsurance", countyId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-by-county", { countyId }),
                ])
            ),
          // Option to edit the county
        ])
    );