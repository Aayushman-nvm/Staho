import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<IParams> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { listingId } = await params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid listing ID", { status: 400 });
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];

    if (favouriteIds.includes(listingId)) {
      return NextResponse.json({ message: "Already favorited" });
    }

    favouriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[FAVOURITES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IParams> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { listingId } = await params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid listing ID", { status: 400 });
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];

    // BUG FIX #2: Use strict equality
    favouriteIds = favouriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    // BUG FIX #5: Proper error handling
    console.error("[FAVOURITES_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
