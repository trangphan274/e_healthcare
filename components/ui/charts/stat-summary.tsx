"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

export const StatSummary = ({ data, total }: { data: any; total: number }) => {
  const dataInfo = [
    { name: "Total", count: total || 100, fill: "#000000" },
    {
      name: "Appointments",
      count: (data?.PENDING + data?.SCHEDULED || 50),
      fill: "#000000",
    },
    { name: "Completed", count: data?.COMPLETED || 50, fill: "#2563eb" },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Summary</h1>
        <Button asChild size="sm" variant="outline" className="font-normal text-xs">
          <Link href="record/appointments">See details</Link>
        </Button>
      </div>
      <div className="relative w-full h-[90%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={dataInfo}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Users
          size={30}
          className="absolute top-1/2 left-1/2 translate-x-[-15px] translate-y-[-15px] text-gray-50"
        />
      </div>
    </div>
  );
};
