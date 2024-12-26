import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-blue-700 text-5xl md:text-6xl">
              CliCare
            </span>
          </h1>
        </div>
        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
          At CliCare, we prioritize your health above all. Our mission is to provide easy access to high-quality medications and personalized healthcare services, ensuring every client receives the best care and attention they deserve. Your well-being is our top priority.
          </p>
          <div >
          {userId ? (
              <>
              
                
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button className="md:text-base font-light">
                    New Patient ?
                  </Button>
                </Link>

                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="md:text-base underline hover:text-nlue-600"
                  >
                    Login 
                  </Button>
                </Link>
              </>
            )}

          </div>
          </div>
      </div>
      <footer className="mt-8">
        <p className="text-center text-sm">
          &copy; 2024 E-Hospital Management System. All rights reserved.
        </p>
      </footer>

    </div>

  );
  
}
