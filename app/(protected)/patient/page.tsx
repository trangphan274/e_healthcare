import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { getPatientDashBoardStatistics } from "@/utils/services/patient";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Briefcase, BriefcaseBusiness, BriefcaseMedical } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

const PatientDashboard = async () => {
  const user = await currentUser();

  const {
    data,
    appointmentsCounts,
    last5Records,
    totalAppointments,
    availableDoctor,
  } = await getPatientDashBoardStatistics(user?.id!);

  if (user && !data) {
    redirect("/patient/registration");
  }

  if (!data) return null;

  const cardData = [
    {
      title: "Appointments",
      value: totalAppointments,
      icon: Briefcase,
      className: "bg-blue-600/25",
      iconClassName: "bg-blue-600 text-blue-600",
      note: "Total appointments",
      link: "#",
    },
    {
      title: "Cancelled",
      value: appointmentsCounts?.CANCELLED,
      icon: Briefcase,
      className: "bg-rose-600/25",
      iconClassName: "bg-rose-600 text-rose-600",
      note: "Cancelled appointments",
      link: "#",
    },
    {
      title: "Pending",
      value: appointmentsCounts?.PENDING! + appointmentsCounts?.SCHEDULED!,
      icon: BriefcaseBusiness,
      className: "bg-yellow-600/15",
      iconClassName: "bg-yellow-600 text-yellow-600",
      note: "Pending appointments",
      link: "#",
    },
    {
      title: "Completed",
      value: appointmentsCounts?.COMPLETED!,
      icon: BriefcaseMedical,
      className: "bg-emerald-600/15",
      iconClassName: "bg-emerald-600 text-emerald-600",
      note: "Successful appointments",
      link: "#",
    },
  ];

  return (
    <div className="py-6 px-3 flex flex-col items-center">
      <div className="bg-white rounded-lg p-6 mb-8 w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl xl:text-2xl font-semibold">
            Welcome {data?.first_name || user?.firstName}
          </h1>
          <div className="space-x-2">
            <Button size={"sm"}>{new Date().getFullYear()}</Button>
            <Button size="sm" variant="outline" className="hover:underline">
              <Link href="/patient/self">View Profile</Link>
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-between gap-4">
          {cardData.map((el, id) => (
            <StatCard notes={""} key={id} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
