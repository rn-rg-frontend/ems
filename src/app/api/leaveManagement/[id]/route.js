import prisma from "@/lib/prisma";
import { withAdminAuth, withAuth } from "@/lib/middleware";

export const PATCH = withAdminAuth(async (req, { params }) => {
    try {
        const params1 = await params

        const id = params1.id;
        const body = await req.json();

        const { status, userProfile } = body;

        if (status === undefined || !userProfile || userProfile.totalLeave === undefined) {
            return new Response(
                JSON.stringify({ success: false, message: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const updatedLeave = await prisma.leaveTable.update({
            where: { id: Number(id) },
            data: {
                status: status,
            },
        });

        const updatedUserProfile = await prisma.userProfile.update({
            where: { id: updatedLeave.userProfileId },
            data: {
                totalLeave: userProfile.totalLeave,
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    updatedLeave,
                    totalLeave: updatedUserProfile.totalLeave,
                },
            }),
            {
                status: 200,
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
})

export const DELETE = withAdminAuth(async (request, context) => {
    try {
      const { params } = context;
      const { id } = params;
  
      if (!id) {
        return new Response(
          JSON.stringify({ success: false, message: 'Missing required parameter: id' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      const numericId = Number(id);
      if (isNaN(numericId)) {
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid ID format' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // First check if the leave record exists
      const existingLeave = await prisma.leaveTable.findUnique({
        where: { id: numericId },
      });
  
      if (!existingLeave) {
        return new Response(
          JSON.stringify({ success: false, message: 'Leave record not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      const deletedLeave = await prisma.leaveTable.delete({
        where: { id: numericId },
      });
  
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Leave record deleted successfully',
          data: deletedLeave 
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Delete Leave Error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to delete leave record',
          error: error.message 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  });
  
  

export const GET = withAuth(async (req, {params}) => {
    try {
        const { id } = params;

        if (!id) {
            return new Response(
                JSON.stringify({ success: false, message: 'ID is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const leaveRecords = await prisma.leaveTable.findMany({
            where: { userProfileId: Number(id) },
            select: {
                id: true,
                leaveType: true,
                startDate: true,
                endDate: true,
                totalLeaves: true,
                status: true,
                userProfileId: true
            }
        });

        if (leaveRecords.length === 0) {
            return new Response(
                JSON.stringify({ success: false, message: 'No leaves found for the given user ID' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Separate the approved and pending leave records
        const approved = leaveRecords.filter((leave) => leave.status === true);
        const pending = leaveRecords.filter((leave) => leave.status === null);
        const cancelled = leaveRecords.filter((leave) => leave.status === false);

        const approvedCount = approved.length;
        const pendingCount = pending.length;
        const cancelledCount = cancelled.length;

        return new Response(
            JSON.stringify({
                approved,
                approvedCount,
                pending,
                pendingCount,
                cancelled,
                cancelledCount
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message,
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
})
