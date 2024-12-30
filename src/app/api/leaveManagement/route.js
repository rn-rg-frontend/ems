import prisma from "@/lib/prisma";
import { withAdminAuth, withAuth } from "@/lib/middleware";

export const GET = withAdminAuth(async (request, context) => {
  try {
    const userProfiles = await prisma.userProfile.findMany({
      select: {
        id: true,
        name: true, 
        totalLeave: true,
        leaves: { 
          select: {
            id: true,
            leaveType: true,
            startDate: true,
            endDate: true,
            totalLeaves: true,
            status: true,
          },
        },
      },
    });
    
    

    return new Response(JSON.stringify(
      userProfiles,
    ), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {

    return new Response(JSON.stringify({
      success: false,
      message: 'Error fetching leaves',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
})

export const POST = withAuth(async (req, {params}) => {
  try {
    const body = await req.json();

    const {
      leaveType,
      startDate,
      endDate,
      userProfileId,
      status,
      totalLeaves,
    } = body;

    if (
      !leaveType ||
      !startDate ||
      !endDate ||
      !totalLeaves ||
      status === undefined ||
      !userProfileId
    ) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const leaveEntry = await prisma.leaveTable.create({
      data: {
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalLeaves,
        status,
        userProfileId,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: leaveEntry,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
)
