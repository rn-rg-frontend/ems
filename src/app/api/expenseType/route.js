import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const GET = withAdminAuth(async (req) => {
    try {
        const expenseType = await prisma.typeOfExpense.findMany({
            select: {
                id: true,
                name: true,
                description: true
            }
        })

        return new Response(
            JSON.stringify(expenseType), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
    }
})

export const POST = withAdminAuth(async (req) => {
    try {
        const body = await req.json()
        const {
            name,
            description
        } = body;
        const expenseType = await prisma.typeOfExpense.create({
            data: {
                name: name,
                description: description
            }
        })
        return new Response(
            JSON.stringify(expenseType), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                succecss: false,
                message: error.message
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
    }
})