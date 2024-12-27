import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const salary = await prisma.salary.create({
            
        })
    } catch (error) {
        
    }
}