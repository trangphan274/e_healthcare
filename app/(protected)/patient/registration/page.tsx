
import { NewPatient } from "@/components/new-patient";
import { getPatientById } from "@/utils/services/patient";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Registration = async () => {
  const { userId } = await auth();
  // const data = null;
  const {data} = await getPatientById(userId!)
  // console.log(data);
  // const response = await getPatientById(userId!);
  // const data = response?.data;
  return (
    <div className="py-6 px-3 min-h-full flex justify-center">
      <NewPatient data={data!} type={!data ? "create" : "update"} />
    </div>
  );
};


export default Registration;
