// // import { SignIn } from '@clerk/nextjs';
// import { PrismaClient } from '@prisma/client';
// // import { create } from 'domain';
// // import { start } from 'repl';
// // const { fakerDE: faker } = require('@faker-js/faker');

// const prisma = new PrismaClient();

// async function seed() {
//   console.log('Seeding data...');


// type Role = 'NURSE' | 'CASHIER' | 'LAB_TECHNICIAN';
// const staffRoles: Role[] = ['NURSE', 'CASHIER', 'LAB_TECHNICIAN'];
//   for (const role of staffRoles) {
//    const mobile = faker.phone.phoneNumber();

//    await prisma.staff.create({
//         data: {
//             id: faker.string?.uuid(),
//             email: faker.internet.email(),
//             name: faker.name.fullName(),
//             phone: mobile,
//             address: faker.address.streetAddress(),
//             department: faker.company.name(),
//             role: role,
//             status: 'ACTIVE',
//         },
//     });
//   }

//   const doctors = [];
//   for (let i = 0; i < 10; i++){
//     const doctor = await prisma.doctor.create({
//         data: {
//             id: faker.string.uuid(),
//             email: faker.internet.email(),
//             name: faker.name.fullName(),
//             specialization: faker.company.jobType(),
//             license_number: faker.string.uuid(),
//             phone: faker.phone.phoneNumber(),
//             address: faker.address.streetAddress(),
//             department: faker.company.name(),
//             availability_status: 'ACTIVE',
//             type: i % 2 === 0 ? 'FULL' : 'PART',
//             working_days:{
//                 create: [
//                     {
//                         day:"MONDAY",
//                         start_time: "08:00",
//                         close_time: "17:00"
//                     },
//                     {
//                         day:"Wednesday",
//                         start_time: "08:00",
//                         close_time: "17:00"
//                     },


//                 ],
//             },
//   },
// });
// doctors.push(doctor);}

// const patients = [];
// for (let i = 0; i<20; i++){
//     const patient = await prisma.patient.create({
//         data: {
//             id: faker.string.uuid(),
//             first_name: faker.name.firstName(),
//             last_name: faker.name.lastName(),
//             date_of_birth: faker.date.birthdate(),
//             gender: i%2 === 0 ? "MALE" : "FEMALE",
//             phone: faker.phone.phoneNumber(),
//             email: faker.internet.email(),
//             marital_status: i%3 === 0 ? "SINGLE" : "MARRIED",
//             address : faker.address.streetAddress(),
//             emergency_contact_name: faker.name.fullName(),
//             emergency_contact_number: faker.phone.number(),
//             relation: "Sibling",
//             blood_group: i%4 === 0 ? "0+" : "A+",
//             allergies: faker.lorem.words(2),
//             medical_conditions:faker.lorem.words(3),
//             privacy_consent: true,
//             service_consent: true,
//             medical_consent: true,
//         },
// });

// patients.push(patient);
// }

// for(let i = 0; i<20; i++){
//     const doctor = doctors[Math.floor(Math.random() * doctors.length)];
//     const patient = patients[Math.floor(Math.random() * patients.length)];

//     await prisma.appointment.create({
//         data: {
//             patient_id: patient.id,
//             doctor_id: doctor.id,
//             appointment_date: faker.date.soon(),
//             time: "10:00",
//             status: i%4 === 0 ? "PENDING" : "SCHEDULED",
//             type:"Checkup",
//             reason:faker.lorem.sentence(),

// },
//     });
// }

// console.log('Seeding completed !');
// await prisma.$disconnect();}
// seed().catch((e) => {
//     console.error(e);
//     prisma.$disconnect();
//     process.exit(1);
// });