import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import db from "@/lib/db";

interface MedicineDetailProps {
  id: string;
}

const getMedicineDetail = async (id: string) => {
  try {
    const medicine = await db.medicine.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return medicine;
  } catch (error) {
    console.log("Error fetching medicine detail:", error);
    return null;
  }
};

export const ViewDetailMedicine = async ({ id }: MedicineDetailProps) => {
  const medicine = await getMedicineDetail(id);

  if (!medicine) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center rounded-full bg-blue-50 text-blue-600 px-2 py-1 text-xs md:text-sm hover:underline"
        >
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <>
          <DialogHeader>
            <DialogTitle>{medicine.name}</DialogTitle>
          </DialogHeader>
          <p className="mt-4 text-gray-700">{medicine.description}</p>
        </>
      </DialogContent>
    </Dialog>
  );
};
