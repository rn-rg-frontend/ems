import prisma from "@/lib/prisma";
import { withAdminAuth, withAuth } from "@/lib/middleware";

export const GET = withAdminAuth(async (req, { params }) => {
    try {
        const WFH = await prisma.wFHtable.findMany({
            select: {
                id: true,
                userProfileId: true,
                date: true,
                status: true,
                
            }
        })

        return new Response(JSON.stringify({
            success: true,
            data: WFH,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Error fetching WFH',
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
            date,
            userProfileId,
            status,
        } = body;

        if (!date || !userProfileId || status === undefined) {
            return new Response(
                JSON.stringify({ success: false, message: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const WFHEntry = await prisma.wFHtable.create({
            data: {
                date: new Date(date),
                // totalWFH,
                status,
                userProfileId,
            }
        });

        return new Response(
            JSON.stringify({
                success: true,
                data: WFHEntry,
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