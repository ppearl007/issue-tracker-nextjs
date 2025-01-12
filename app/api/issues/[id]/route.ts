import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
  
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
  