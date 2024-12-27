import prisma from "@/lib/prisma";
import { withAdminAuth, withAuth } from "@/lib/middleware";

async function cleanExpiredAnnouncements() {
  try {
    const currentDate = new Date();
    await prisma.annoucement.deleteMany({
      where: {
        endDate: {
          lt: currentDate
        }
      }
    });
  } catch (error) {
    console.error("Error cleaning expired announcements:", error);
  }
}

export const GET = withAuth(async (req, {params}) => {
  try {
    const currentDate = new Date();
    const announcements = await prisma.annoucement.findMany({
      where: {
        AND: [
          {
            startDate: {
              lte: currentDate
            }
          },
          {
            endDate: {
              gte: currentDate
            }
          }
        ]
      },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });

    await cleanExpiredAnnouncements();

    return new Response(
      JSON.stringify({
        success: true,
        data: announcements,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
})

export const POST = withAdminAuth(async (req) => {
  try {
    const body = await req.json();

    const { title, description, startDate, endDate } = body;

    if (!title || !description || !startDate || !endDate) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please fill in all fields",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date();

    if (start > end) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "End date must be after start date",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const addAnnouncement = await prisma.annoucement.create({
      data: {
        title,
        description,
        startDate: start,
        endDate: end,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: addAnnouncement,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
})