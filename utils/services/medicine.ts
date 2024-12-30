import db from "@/lib/db";
import { Prisma } from "@prisma/client";

interface PharmacyQueryProps {
  page: number | string;
  limit?: number | string;
  search?: string;
}

const buildPharmacyQuery = (search?: string) => {
  const searchConditions: Prisma.MedicineWhereInput = search
    ? {
        OR: [
          {
            name: { contains: search, mode: "insensitive" },
          },
          {
            description: { contains: search, mode: "insensitive" },
          },
        ],
      }
    : {};

  return searchConditions;
};

export async function getPharmacyMedicines({
  page,
  limit,
  search,
}: PharmacyQueryProps) {
  try {
    const PAGE_NUMBER = Number(page) <= 0 ? 1 : Number(page);
    const LIMIT = Number(limit) || 10;
    const SKIP = (PAGE_NUMBER - 1) * LIMIT;

    const [data, totalRecord] = await Promise.all([
      db.medicine.findMany({
        where: buildPharmacyQuery(search),
        skip: SKIP,
        take: LIMIT,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
        },
        orderBy: { name: "asc" },
      }),
      db.medicine.count({
        where: buildPharmacyQuery(search),
      }),
    ]);

    if (!data) {
      return {
        success: false,
        message: "Medicine data not found",
        status: 200,
        data: null,
      };
    }

    const totalPages = Math.ceil(totalRecord / LIMIT);
    return { success: true, data, totalPages, currentPage: PAGE_NUMBER, totalRecord, status: 200 };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}
