import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const GET = withAdminAuth(async (req, { params }) => {
    try {
        const empSalary = await prisma.salary.findMany({
            select: {
                id: true,
                employeeId: true,
                salary: true,
            }
        })

        return new Response(
            JSON.stringify({
                empSalary
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