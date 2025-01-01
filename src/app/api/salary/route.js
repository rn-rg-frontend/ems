import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const GET = withAdminAuth(async (req, { params }) => {
    try {
        const empSalary = await prisma.userProfile.findMany({
            select: {
                id: true,
                name: true,
                salary: {
                    select: {
                        id: true,
                        salary: true
                    }
                }
            }
        })

        const formattedSalary = empSalary.map((record) => ({
            id: record.id,
            name: record.name,
            salary: record.salary ? record.salary.salary : null, 
            salaryId: record.salary ? record.salary.id : null
          }));

        return new Response(
            JSON.stringify({
                formattedSalary
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: error.message
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
})
