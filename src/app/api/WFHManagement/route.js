import prisma from "@/lib/prisma";
import { withAdminAuth, withAuth } from "@/lib/middleware";

export const GET = withAdminAuth(async (req, { params }) => {
    try {
        const WFH = await prisma.wFHtable.findMany({
            where: {
                status: null,
            },
            select: {
              id: true,
              userProfileId: true,
              date: true,
              status: true,
              userProfile: {
                select: {
                  name: true,
                },
              },
            },
          });
            
          const formattedWFH = WFH.map((record) => ({
            id: record.id,
            userProfileId: record.userProfileId,
            date: record.date,
            status: record.status,
            name: record.userProfile.name, 
          }));
          
        
        return new Response(JSON.stringify({
            success: true,
            data: formattedWFH,
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