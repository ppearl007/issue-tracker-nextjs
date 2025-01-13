import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "@/app/validationSchemas";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    if (isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const deletedIssue = await prisma.issue.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: "Issue deleted successfully", deletedIssue },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete item", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    if (isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }
    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(
      { message: "Issue found", issue },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Issue not found", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    if (isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const updateIssue = await prisma.issue.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(
      { message: "Issue updated successfully", updateIssue },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update item", details: error.message },
      { status: 500 }
    );
  }
}