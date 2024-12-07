import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { InvoiceList } from "@/components/InvoiceList";

export default function InvoicesRoute() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>
          <Link href="/dashboard/invoices/create" className={buttonVariants()}>
            <PlusIcon /> Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
          <InvoiceList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
