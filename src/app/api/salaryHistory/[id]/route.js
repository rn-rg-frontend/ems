import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const GET = withAdminAuth(async (req, { params }) => {
    try {
        const { id } = params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid ID provided'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
        }

        const salaryHistory = await prisma.salaryHistory.findMany({
            where: {
                employeeId: numericId
            },
            select: {
                id: true,
                previousSalary: true,
                year: true,
                createdAt: true,
                userProfile: {
                    select: {
                        name: true,
                        designation: true
                    }
                },
                salary: {
                    select: {
                        salary: true 
                    }
                }
            },
            orderBy: {
                createdAt: 'desc' 
            }
        });

        if (!salaryHistory || salaryHistory.length === 0) {
            return new Response(
                JSON.stringify({
                    success: true,
                    message: 'No salary history found for this employee',
                    data: []
                }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
        }

        const formattedHistory = salaryHistory.map(record => ({
            id: record.id,
            employeeName: record.userProfile.name,
            designation: record.userProfile.designation,
            previousSalary: record.previousSalary,
            currentSalary: record.salary.salary,
            year: record.year,
            changeDate: record.createdAt,
            percentageChange: ((record.salary.salary - record.previousSalary) / record.previousSalary * 100).toFixed(2)
        }));

        return new Response(
            JSON.stringify({
                data: formattedHistory,
                summary: {
                    totalRecords: formattedHistory.length,
                    latestSalary: formattedHistory[0]?.currentSalary,
                    initialSalary: formattedHistory[formattedHistory.length - 1]?.previousSalary,
                    totalGrowth: formattedHistory.length > 0 
                        ? (((formattedHistory[0].currentSalary - formattedHistory[formattedHistory.length - 1].previousSalary) 
                            / formattedHistory[formattedHistory.length - 1].previousSalary) * 100).toFixed(2)
                        : 0
                }
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    } catch (error) {
        console.error('Salary History Error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Failed to fetch salary history',
                error: error.message
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }
})