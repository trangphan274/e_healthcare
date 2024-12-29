import { getAppointmentById } from '@/utils/services/appointment';
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { CalculateAge, formatDateTime } from '@/utils';
import { ProfileImage } from './profile-image';
import { Calendar, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { AppointmentStatusIndicator } from './appoiment-status-indicator';
import { checkRole } from '@/utils/roles';
import { auth } from '@clerk/nextjs/server';
import { AppointmentAction } from './appointment-action';

export const ViewAppointment = async ({id}: {id: string | undefined }) => {
    const {data}= await getAppointmentById(Number(id));
    const {userId} = await auth()

    if(!data) return null 
  return(
  <Dialog>
    <DialogTrigger asChild>
        <Button 
        variant="outline"
        className="flex items-center justify-center rounded-full bg-blur-500/10 hover:underline text-blue-600 px-1.5 py-1 text-xs md:text-sm"
        >View
        </Button>
    </DialogTrigger>
    <DialogContent className="max-w-[425px] max-h-[95%] md:max-w-3xl p-8 overflow-y-auto">
      <>
      <DialogHeader>
        <DialogTitle>
          Patient Appointment
        </DialogTitle>
        <DialogDescription>
          This appointment was booked on the {""}
          {formatDateTime(data?.created_at.toString())}
        </DialogDescription>
        </DialogHeader>
        {
          data?.status ==="CANCELLED" && 
          (<div className="bg-yellow-100 p-4 mt-4 rounded-md">
            <span className ="font-semibold text-sm">
              This appointment was cancelled
            </span >

            <p className="text-sm">
              <strong>
                Reason
              </strong>:{data?.reason}
            </p>
          </div>

       ) }
       <div className=" grid gap-4 py-4">
        <p className="w-fit bg-blue-100 text-blue-600py-1 rounded text-xs md:text-sm">
          Personal Information
        </p>
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="flex gap-1 w-full md:w-1/2">
          <ProfileImage url={data?.patient?.img!}
          name={data?.patient?.first_name +" "+ data.patient?.last_name}
          className="size-20 bg-blue-500 rounded-full"
          textClassName="text-2xl"
          />
          <div className="space-y-0.5">
            <h2 className="text-lg md:text-xl font-semibold uppercase">
              {data?.patient?.first_name +" "+ data.patient?.last_name}
              
            </h2>
            <p className="flex items-center gap-2 text-gray-600">
              <Calendar size={20} className="text-gray-500"/>
              {CalculateAge(data?.patient?.date_of_birth)}
            </p>

            <span className="flex items-cennter text-sm gap-2">
              <Phone size={16} className="text-gray-500"/>{" "}
              {data?.patient?.phone}
            </span>

          </div>
          
        </div>

        <div>
          <span className="text-sm text-gray-500">Address</span>
          <p className="text-gray-600 capitalize">
            {data?.patient?.address}
          </p>
        </div>




       </div>
       <p className="w-fit bg-blue-100 text-blue-600 py-1 rounded text-xs md:text-sm">
        Appointment Information
        </p>


        <div className="grid grid-cols-3 gap-10">
          <div>
            <span className="text-sm text-gray-500">Date</span>
            <p className ="text-sm text-gray-600">
              {format(data?.appointment_date,"MMM dd,yyyy")}
            </p>
          </div>
        <div>
        <span className="text-sm text-gray-500">Date</span>
            <p className ="text-sm text-gray-600">
              {data?.time}
              </p>
           
            </div>
            <div>
        <span className="text-sm text-gray-500">Status</span>
           <AppointmentStatusIndicator status={data?.status}/>
           </div>
           </div>

           {data?.note && (
            <div>
              <span className ="text-sm text-gray-500">Note from Patient</span>
              <p>{data?.note}</p>
              </div>
           )}


           <p className="w-fit bg-blue-100 text-blue-600 py-1 px-2 rounded text-xs md:text-sm mt-16">
            Physician Information
           </p>
           <div className="w-fu;; flex flex-col md:flex-row gap-8 mb-8">
            <ProfileImage 
            url={data?.doctor?.img!}
            name={data?.doctor?.name}
            className="xl:size-20 bg-emerald-300 rounded-full"
            textClassName="xl:text-2xl "
            />
            <div className="">
              <h2 className="text-lg uppercase font-medium">{
                data?.doctor?.name
              }</h2>
              <p className=" flex items-center gap-2 text-gray-600 capitalize">
                {data?.doctor?.specialization}
              </p>
            </div>
           </div>
       </div>


       {(await checkRole("ADMIN") ||data?.doctor_id === userId)&&(
        <>
        <p className="w-fit bg-blue-100 text-blue-600 py-1 px-2 rounded text-xs md:text-sm mt-4">
          Perform Action
        </p>
        <AppointmentAction id={data.id} status={data?.status}/>
        </>
        
       )}
      </>

    </DialogContent>

  </Dialog>
  );
  };


