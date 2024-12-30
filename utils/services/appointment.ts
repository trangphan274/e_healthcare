import db from "@/lib/db";
import { Prisma } from "@prisma/client";


interface AllAppointmentProps {
    page:number | string;
    limit?:number | string;
    search?:string;
    id?:string;
}
const buildQuery =(id?: string, search?:string)=>{
    const searchConditions:Prisma.AppointmentWhereInput = search?{
        OR:[
            {
                patient:{
                    first_name:{ contains: search, mode:"insensitive"},

                },
            },
            {
                patient:{
                    last_name:{contains:search, mode:"insensitive"},
                },
            },
            {doctor:{
                name:{ contains: search, mode:"insensitive"},
            },
        },
            
        ],
    }:{};

const idConditions:  Prisma.AppointmentWhereInput =id
?{
    OR:[{patient_id:id}, {doctor_id:id}],
}
:{};

const combinedQuery :Prisma.AppointmentWhereInput = id || search
? {
    AND:[
        ...(Object.keys(searchConditions).length >0
    ? [searchConditions]
    :[]),
    ...(Object.keys(idConditions).length >0 ?[idConditions]:[]),
    ],
    
}:{};
return combinedQuery;
};

export async function getPatientAppointment(
    {page,limit, search,id}:AllAppointmentProps
) {
    try {
        const PAGE_NUMBER = Number(page)<= 0?1:Number(page)
        const LIMIT = Number(limit) || 10;
        const SKIP = (PAGE_NUMBER -1) *LIMIT

      const [data,totalRecord] = await Promise.all([
        db.appointment.findMany({
            where:buildQuery(id, search),
            skip:SKIP,
            take:LIMIT,
            select:{
                id:true,
                patient_id:true,
                doctor_id:true,
                type:true,
                appointment_date:true,
                time:true,
                status: true,
                patient:{
                    select:{
                        id:true,
                        first_name:true,
                        last_name:true,
                        date_of_birth:true,
                        gender:true,
                        img:true,
                        phone:true,
                    }
                },
                doctor:{
                    select:{
                        id:true,
                        name:true,
                        specialization:true,
                        colorCode:true,
                        img:true,
                    }
                }

            },
            orderBy:{appointment_date:"desc"},
        }),
        db.appointment.count({
            where:buildQuery(id,search ),
        }),
      ])
      if(!data){
          return {
              success: false,
              message: "Appointment data not found",
              status: 200,
              data: null,
          };
      }(totalRecord)
      const totalPages = Math.ceil(totalRecord/LIMIT)
      return{success: true, data,
        totalPages, currentPage:PAGE_NUMBER, totalRecord,status:200};


    } catch (error) {
      console.log(error);
      return { success: false, message: "Internal Server Error", status: 500 };
    }
  }
                 
 export async function getAppointmentById(id: number ) {
                    try {
                        if(!id){
                            return {
                                success:false,
                                message:" Appointment not found",
                                status: 404,
                            };
                        }
                
                
                      const data = await db.appointment.findUnique({
                          where: { id },
                          include: {
                            doctor:{
                                select:{id:true, name:true,specialization:true,img:true},
                            },
                            patient:{
                                select:{
                                    first_name:true,
                                    last_name:true,
                                    date_of_birth:true,
                                    gender:true,
                                    img:true,
                                    address:true,
                                    phone:true,
                                },
                            },
                       
                        },
                      });
                      if(!data){
                          return {
                              success: false,
                              message: "Appointment data not found",
                              status: 200,
                              data: null,
                          };
                      }
                      return{success: true, data,status:200};
                  
                    } catch (error) {
                      console.log(error);
                      return { success: false, message: "Internal Server Error", status: 500 };
                    }
                  }
                                  function startOfyear(arg0: Date) {
                                      throw new Error("Function not implemented.");
                                  }
  