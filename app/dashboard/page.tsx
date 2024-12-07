import { InvoiceGraph } from "@/components/InvoiceGraph";
import { Suspense } from "react";
import { RecentInvoices } from "@/components/RecentInvoices";
import { DashboardBlocks } from "@/components/DashboardBlocks";
import { requireUser } from "../utils/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "../utils/db";
import { EmptyState } from "@/components/EmptyState";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}

export default async function DashboardRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-2 lg:grid-cols-3 md:gap-6">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
}