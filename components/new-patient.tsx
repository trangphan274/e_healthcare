"use client";
import { useUser } from '@clerk/nextjs';
import { Patient } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';


interface DataProps{
  data?: Patient;
  type:"create" | "update" ;
}



export const NewPatient = ({data, type }: DataProps) => {
  const{ user} =useUser()
  const[ loading, setLoading] = useState(false)
  const[imgURl, setImgURL]=useState<any>();

  const router = useRouter()
  const userData ={
    first_name: user?.firstName || "",
    last_name: user?.lastName || "",
    email: user?.emailAddresses[0] || "",
    phone: user?.phoneNumbers?.toString() || "",
   
  }

  return <Card className =" max -w -6xl w- full p-4">
    <CardHeader>
      <CardTitle>Patient Registration</CardTitle>
      <CardDescription>
        Please provide all the information below to help us understand better and provide good and quality service to you.
      </CardDescription>
    </CardHeader>
    
  </Card>
  
};
