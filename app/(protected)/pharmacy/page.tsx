import SearchInput from "@/components/search-input";
import { Table } from "@/components/tables/table";
import { Pagination } from "@/components/pagination";
import { getPharmacyMedicines } from "@/utils/services/medicine";
import { ViewDetailMedicine } from "@/components/view-detail-medicine";

const columns = [
  {
    header: "Medicine",
    key: "name",
  },
  {
    header: "Price/unit",
    key: "price",
    className: "hidden md:table-cell",
  },
  {
    header: "Unit",
    key: "unit",
  },
  {
    header: "Detail",
    key: "action",
  },
];

interface DataProps {
  id: string;
  name: string;
  price: number;
  unit: number;
}

const Pharmacy = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const searchQuery = searchParams?.q || "";
  const page = searchParams?.p || "1";

  const { data, totalPages, totalRecord, currentPage } = await getPharmacyMedicines({
    page,
    search: searchQuery,
  });

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-600">No medicines found</h2>
      </div>
    );
  }

  const renderItem = (item: DataProps) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 hover:bg-slate-100">
      <td className="py-2">{item.name}</td>
      <td className="hidden md:table-cell">${item.price.toFixed(2)}</td>
      <td>{item.unit}</td>
      <td>
        <div className="flex items-center gap-2">
          <ViewDetailMedicine id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Pharmacy</h2>
        <SearchInput />
      </div>
      <div className="mt-6">
        <Table columns={columns} renderRow={renderItem} data={data} />
        {data.length > 0 && (
          <Pagination
            totalRecords={totalRecord}
            currentPage={currentPage}
            totalPages={totalPages}
            limit={10}
          />
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
