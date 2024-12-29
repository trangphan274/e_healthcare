import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { Table } from './table';
import { Appointment } from '@/types/data-types';
import { ProfileImage } from '../profile-image';
import { format } from 'date-fns';
import { AppointmentStatus } from '@prisma/client';
import { AppointmentStatusIndicator } from '../appoiment-status-indicator';
import { ViewAppointment } from '../view-appointment';


interface DataProps{
    data: any[];
}
const columns=[
  {
    header:"Info",
    key:"name"
  },
  {
   header:"Date",
   key:"appoiment_date",
   className: "hidden md:table-cell",
  },
  {
    header:"Time",
    key:"time",
    className: "hidden md:table-cell",
   },
  {
    header:"Doctor",
    key:"doctor",
    className: "hidden md:table-cell",
  },
  {
    header:"Status",
    key:"status",
  },
  {
    header:"Action",
    key:"action",
  },
  ];
export const RecentAppointments = ({data}: DataProps) => {
  // console.log(data);
  const renderRow = (item: Appointment) => {

    const name= item?.patient?.first_name + "" + item?.patient?.last_name
    return(
    <tr key={item?.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-slate-50 "

    >
      <td className="flex items-center gap-2 2xl:gap-4 py-2 xl:py-4">
     <ProfileImage url={item?.patient.img!}name={name} className="bg-violet-600"
     
     />

        <div>
          <h3 className="text-sm md:text-base md:font-medium uppercase">
            {name}

          </h3>
          <span className="text-xs capitalize">
            {item?.patient?.gender?.toLowerCase()}
          </span>
        </div>
      </td>

      <td className="hidden md:table-cell ">
        {format(item?.appointment_date,"yyyy-MM-dd")}
      </td>
      <td className="hidden md:table-cell lowercase">
        {item?.time}
        </td>
        <td className="hidden md:table-cell items-center py-2">
          <div className="flex items-center gap-2 2x:gap-4">
            <ProfileImage
            url={item?.doctor.img!}
            name={item?.doctor.name }
            className="bg-blue-600"
           
            />
            <div>
              <h3 className="font-medium uppercase">
                {item?.doctor.name}
                </h3>
                <span className="text-xs capitalize">
                  {item?.doctor.specialization}
                </span>
             
            </div>
          </div>
        
        </td>
        <td className= {"hidden xl:table-cell"}>
                  
          <AppointmentStatusIndicator status={item?.status} />
        </td>
        <td>
          <div className="flex items-center gap-x-2">
            <ViewAppointment id={item?.id}/>
            <Link href={`/record/appointment/${item?.id}` } className="">
            See all
            </Link>

          </div>
        </td>

    </tr>
  )};
  return (
     <div className="bg-white rounded-xl p-2 2xl:p-4">
    <div className="flex justify-between items-center">
      <h1 className="text-lg font-semibold">Recent Appointments</h1>
      
      <Button asChild variant ={"outline"}>
        <Link href="/record/appointments">View All</Link>
      </Button>

    </div>
    <Table columns={columns} renderRow={renderRow} data={data} />

  </div>
  );
};

