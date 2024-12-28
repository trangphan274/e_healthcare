import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatNumber } from "@/utils";

interface CardProps {
  title: string;
  icon: LucideIcon;
  notes: string;
  value: number;
  className?: string;
  iconClassName?: string;
  link: string;
}

const CardIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon size={24} />;
};

export const StatCard = ({
  title,
  icon: Icon,
  notes,
  value,
  className,
  iconClassName,
  link,
}: CardProps) => {
  return (
    <Card className={cn("p-4 flex-1 max-w-[280px] shadow-md", className)}>
      <CardHeader className="flex flex-col items-center text-center">
        <div
          className={cn(
            "mb-4 w-12 h-12 flex items-center justify-center rounded-full",
            iconClassName
          )}
        >
          <CardIcon icon={Icon} />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
       
        <p className="mt-2 text-2xl font-bold">{formatNumber(value)}</p>
        <Button asChild size="sm" variant="outline" className="mt-4">
          <Link href={link}>See details</Link>
        </Button>
      </CardHeader>
      
      <CardFooter className="pb-3">
        <p className="text-sm text-gray-500">{notes}</p>
      </CardFooter>
    </Card>
  );
};
