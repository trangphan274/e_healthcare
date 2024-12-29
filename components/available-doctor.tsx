import { AvailableDoctorProps } from '@/types/data-types';
import { checkRole } from '@/utils/roles';
import { Link } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ProfileImage } from './profile-image';
import { daysOfweek } from '@/utils';


const getToday=()   => { 

    const today = new Date().getDay();
    return daysOfweek[today];
};
const todayDay = getToday();
interface Days{
    day: string;
    start_time: string;
    close_time: string;
}

interface DataProps{
    data:AvailableDoctorProps;
}
const availableDays= ({data}:{data:Days[]})=>{
    const isTodayWorkingDay = data?.find((dayObj)=>dayObj?.day===todayDay)
return isTodayWorkingDay ? `${isTodayWorkingDay?.start_time} - ${isTodayWorkingDay?.close_time}` 
: "Not Available";
}

export const AvailableDoctor = async ({
    data,
}: { data:
    AvailableDoctorProps;

})=>{
    return     (
   <div className ="bg-white rounded-xl p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">
            Available Doctors
            </h1> 
            {( await checkRole("ADMIN")) &&(
               <Button asChild
               variant={"outline"}
               disabled={data?.length === 0}
               className="disabled:cursor-not-allowed disable:text-gray-200"
               >
                    <Link href ="/record/doctors">
                    View All
                    </Link>
                </Button>
            )} 
        </div>
        <div className="w-full space-y-5 md:space-y-0 md:gap-6 flex flex-cpl md:flex-row md:flex-wrap">
    {
        data?.map((doc,id)=>(
            <Card key={id} className=" border-none w-full md:w-[300px] min-h-28 xl:w-full p-4 flex gap-4 odd:bg-emerald-600/5 even:bg-yellow-600/5" >
            
            <ProfileImage 
            url={doc?.img}
            name={doc?.name}
            className="md:flex min-w-14 min-h-14 md:min-w-16 md:min-h-16 bg-blue-600 rounded-full"
            textClassName='text-2xl font-semibold'
            />
            <div>
                <h2 className="font-semibold text-lg md:text-xl">
                    {doc?.name}
                    <p className ="text-base capitalize text-gray-600">
                        {doc?.specialization}
                    </p>
                    <p className=" text-sm flex items-center">
                        <span className="hidden lg:flex">Available Time:</span>
                        {availableDays({data:doc?.working_days})}
                    </p>
                </h2>
            </div>
            </Card>
        
    ))
}
    
    </div>
    </div>
);  
};

