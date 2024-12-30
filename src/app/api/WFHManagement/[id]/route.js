import prisma from "@/lib/prisma";
import { withAdminAuth,withAuth } from "@/lib/middleware";

export const PATCH = withAdminAuth(async (req, { params }) => {
    try {
        const { id } = params;
        const body = await req.json();

        const { status } = body;

        if (status === undefined) {
            return new Response(
                JSON.stringify({ success: false, message: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const wfhRecord = await prisma.wFHtable.findUnique({
            where: { id: Number(id) },
            include: { userProfile: true },
        });

        if (!wfhRecord || !wfhRecord.userProfile) {
            return new Response(
                JSON.stringify({ success: false, message: 'WFH record or user profile not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const { totalWFH } = wfhRecord.userProfile;

        if (status === true) {
            const updatedUserProfile = await prisma.userProfile.update({
                where: { id: wfhRecord.userProfileId },
                data: {
                    totalWFH: totalWFH + 1, 
                },
            });

            const updatedWFH = await prisma.wFHtable.update({
                where: { id: Number(id) },
                data: {
                    status: status, 
                },
            });

            return new Response(
                JSON.stringify({
                    success: true,
                    data: {
                        updatedWFH,
                        updatedTotalWFH: updatedUserProfile.totalWFH,
                    },
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const updatedWFH = await prisma.wFHtable.update({
            where: { id: Number(id) },
            data: {
                status: status,
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                data: updatedWFH,
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


export const DELETE = withAdminAuth(async (req, { params }) => {
    try {
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

        const deleteWFH = await prisma.wFHtable.delete({
            where: { id: Number(id) },
        })
        return new Response(
            JSON.stringify({
                deleteWFH
            }),{
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: error.message }),
        )
    }
})

export const GET = withAuth(async (req, {params}) => {
    try {
        const { id } = params;

        const userWFHData = await prisma.userProfile.findUnique({
            where: { id: Number(id) },
            select: {
                totalWFH: true,
                wfh: { 
                    select: {
                        id: true,
                        date: true,
                        status: true,
                        userProfileId: true,
                    },
                },
            },
        });
        

        if (!userWFHData) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User profile not found",
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const { totalWFH, wfh: WRHdata } = userWFHData;

        const approved = userWFHData.wfh.filter((wfh) => wfh.status === true);
        const pending = userWFHData.wfh.filter((wfh) => wfh.status === null);
        const rejected = userWFHData.wfh.filter((wfh) => wfh.status === false);

        const approvedCount = approved.length;
        const pendingCount = pending.length;
        const rejectedCount = rejected.length;

        return new Response(
            JSON.stringify({
                approved,
                approvedCount,
                pending,
                pendingCount,
                rejected,
                rejectedCount,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
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
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
)