import prisma from "@/lib/prisma";
import { withAdminAuth, withAuth } from "@/lib/middleware";

export const PATCH = withAdminAuth(async (req, { params }) => {
    try {
        const params1 = await params;

        const id = params1.id;
        const body = await req.json();

        const { status } = body; 

        if (status === undefined) {
            return new Response(
                JSON.stringify({ success: false, message: 'Missing required field: status' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const leaveRecord = await prisma.leaveTable.findUnique({
            where: { id: Number(id) },
            include: { userProfile: true },
        });

        if (!leaveRecord || !leaveRecord.userProfile) {
            return new Response(
                JSON.stringify({ success: false, message: 'Leave record not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const { totalLeave } = leaveRecord.userProfile;

        if (status === true) {
            const updatedUserProfile = await prisma.userProfile.update({
                where: { id: leaveRecord.userProfileId },
                data: {
                    totalLeave: totalLeave - leaveRecord.totalLeaves,
                },
            });

            const updatedLeave = await prisma.leaveTable.update({
                where: { id: Number(id) },
                data: {
                    status: status, 
                },
            });

            return new Response(
                JSON.stringify({
                    success: true,
                    data: {
                        updatedLeave,
                        updatedTotalLeave: updatedUserProfile.totalLeave,
                    },
                }),
                {
                    status: 200,
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

        return new Response(
            JSON.stringify({
                success: true,
                data: updatedLeave,
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
});

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
