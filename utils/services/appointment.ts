import db from "@/lib/db";

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
  