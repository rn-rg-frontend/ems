import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

export const GET = withAuth(async (req, {params}) => {
    try {
        const params1 = await params;
        const id = params1.id;

        const empData = await prisma.userProfile.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                userName: true,
                isAdmin: true,
                name: true,
                photo: true,
                designation: true,
                dateOfJoining: true,
                email: true,
                contactDetails: true,
                DOB: true,
                highestEducation: true,
                instituteName: true,
                aadharCard: true,
                panCard: true,
                bloodGroup: true,
                totalLeave: true,
                address: true,
                endDate: true,
                emergencyContact: true,
                medicalHistory: true,
                createdAt: true,  
                salary: {
                    select: {
                      salary: true,
                      id: true,
                    },
                  },            
            },
        })
        const totalApprovedWFH = await prisma.wFHtable.count({
            where: {
                userProfileId: Number(id),
                status: true, 
            },
        });

        return new Response(
            JSON.stringify({
                    ...empData,
                    totalApprovedWFH,
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
                error: error.message
            }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
    }
})