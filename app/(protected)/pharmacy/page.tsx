// import React from 'react'

// const columns = [
//   {
//     header: "Name",
//     key: "name",
//   },
//   {
//     header: "Price",
//     key: "price",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Instock",
//     key: "quantity",
//     className: "hidden md:table-cell",
//   },
  
//   {
//     header: "Actions",
//     key: "action",
//   },
// ];

// const Pharmacy = async( props:{
//   searchParams?: { [key: string]: string | undefined };
// })=> {

//   const searchParams = await props.searchParams;
//   const page =(searchParams.p || "1") as string;
//   const searchQuery = searchParams.q || "";

//   return (
//     <div>Pharmacy</div>
//   )
// }

// export default Pharmacy

import SearchInput from "@/components/search-input";
import { Table } from "@/components/tables/table";
import { Pagination } from "@/components/pagination";
import { ProfileImage } from "@/components/profile-image";
import { Medicine } from "@prisma/client";
import { getPharmacyMedicines } from "@/utils/services/medicine";

const columns = [
  {
    header: "Medicine",
    key: "name",
  },
  {
    header: "Description",
    key: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Price",
    key: "price",
    className: "hidden md:table-cell",
  },
  {
    header: "Quantity",
    key: "quantity",
  },
  {
    header: "Actions",
    key: "action",
  },
];

interface DataProps extends Medicine {}

const Pharmacy = async (props: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;


 const searchQuery = searchParams?.q || "";

  const { data, totalPages, totalRecord, currentPage } = await getPharmacyMedicines({
    page,
    search: searchQuery,
  });

  if (!data) return null;

  const renderItem = (item: DataProps) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 hover:bg-slate-100">
      <td className="py-2">{item.name}</td>
      <td className="hidden md:table-cell">{item.description}</td>
      <td className="hidden md:table-cell">{item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* Add actions here (e.g., View, Edit, Delete) */}
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
