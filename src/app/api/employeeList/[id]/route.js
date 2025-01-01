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
                // photo: true,
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
        const filterempData = {
            id: empData.id,
            userName: empData.userName,
            isAdmin: empData.isAdmin,
            name: empData.name,
            designation: empData.designation,
            dateOfJoining: empData.dateOfJoining,
            email: empData.email,
            contactDetails: empData.contactDetails,
            DOB: empData.DOB,
            highestEducation: empData.highestEducation,
            instituteName: empData.instituteName,
            aadharCard: empData.aadharCard,
            panCard: empData.panCard,
            bloodGroup: empData.bloodGroup,
            address: empData.address,
            endDate: empData.endDate,
            emergencyContact: empData.emergencyContact,
            medicalHistory: empData.medicalHistory,
            createdAt: empData.createdAt,
            salary: empData.salary.salary,
            totalLeave: empData.totalLeave,
        };
        const totalApprovedWFH = await prisma.wFHtable.count({
            where: {
                userProfileId: Number(id),
                status: true, 
            },
        });

        return new Response(
            JSON.stringify({
                    ...filterempData,
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