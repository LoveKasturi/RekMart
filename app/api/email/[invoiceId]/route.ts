import { requireUser } from "@/app/utils/hooks";
import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { emailClient } from "@/app/utils/mailtrap";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { invoiceId: string };
  }
) {
  try {
    const session = await requireUser();
    const { invoiceId } = params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Love Kasturi",
    };

    await emailClient.send({
      from: sender,
      to: [{ email: "runnergamings@gmail.com" }],
      template_uuid: "084f0b95-ec1b-4827-abe3-7923ef3830a4",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "REKMART",
        company_info_address: "Chandlier street 10,000 A",
        company_info_city: "Munich",
        company_info_zip_code: "345345",
        company_info_country: "Germany",
      },
    });

    // Success response
    return NextResponse.json({ message: "Email reminder sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}

