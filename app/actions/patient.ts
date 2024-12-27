"use server";
import db from "@/lib/db";
import { PatientFormSchema } from "@/lib/schema";
import { clerkClient } from "@clerk/nextjs/server";

export async function createNewPatient(data: any, pid: string) {
    try {
        // Validate dữ liệu đầu vào
        const validateData = PatientFormSchema.safeParse(data);

        if (!validateData.success) {
            return {
                success: false,
                error: true,
                msg: "Provide all required fields",
            };
        }

        const patientData = validateData.data;
        let patient_id = pid;

        if (pid === "new-patient") {
            // Tạo user mới trên Clerk
            const client = await clerkClient();
            const user = await client.users.createUser({
                emailAddress: [patientData.email],
                password: patientData.phone,
                firstName: patientData.first_name,
                lastName: patientData.last_name,
                publicMetadata: { role: "patient" },
            });

            patient_id = user?.id;
        } else {
            // Cập nhật user đã tồn tại
            const client = await clerkClient();
            await client.users.updateUser(pid, {
                publicMetadata: { role: "patient" },
            });
        }

        // Tạo patient trong database
        await db.patient.create({
            data: {
                ...patientData,
                id: patient_id,
            },
        });

        return { success: true, error: false, msg: "Patient created successfully" };
    } catch (error: any) {
        console.error(error);
        return { success: false, error: true, msg: error?.message };
    }
}
