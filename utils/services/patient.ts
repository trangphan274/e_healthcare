import db from "@/lib/db";



export async function getPatientDashBoardStatistics(id: string) {
    try {
        if(!id){
            return {
                success: false,
                message: "Data not found",
                data: null,
            };
        }
        const data = await db.patient.findUnique({
            where: { id },
           select: {
            id: true,
            first_name: true,
            gender: true,
            img: true,

           },
        });
        if(!data){
            return {
                success: false,
                message: "Data not found",
                data: null,
            };
        }
        const appointments = await db.appointment.findMany({
            where: { patient_id: data?.id },
            include:{
                doctor:{
                    select:{
                        id:true,
                        name:true,
                        img: true,
                        specialization:true,
                    },
                },
            },
            orderBy: {appointment_date:"desc"},

        });
        //TODO: process appointment info
      return{
        success: true
        , data
        , appointmentsCounts:{CANCELLED:0, PENDING:0, SCHEDULED:0, COMPLETED:0}
        ,last5Records: null
        ,totalAppointments:appointments.length
        ,availableDoctor: null
        , monthlyData:null
        ,status: 200,
    };
  
    } catch (error) {
      console.log(error);
      return { success: false, message: "Internal Server Error", status: 500 };
    }
  }



export async function getPatientById(id: string) {
  try {
    const patient = await db.patient.findUnique({
        where: { id },
    });
    if(!patient){
        return {
            success: false,
            message: "Patient not found",
            status: 200,
            data: null,
        };
    }
    return{success: true, data: patient,status:200};

  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}
