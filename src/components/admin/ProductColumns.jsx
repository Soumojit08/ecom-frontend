const ProductColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => getValue()?.replaceAll("-", " ") || "-",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      const price = Number(getValue());
      return Number.isFinite(price) ? `₹${price.toLocaleString("en-IN")}` : "-";
    },
  },
  {
    accessorKey: "rating_count",
    header: "Ratings",
    cell: ({ getValue }) => Number(getValue() || 0).toLocaleString("en-IN"),
  },
];

export default ProductColumns;
