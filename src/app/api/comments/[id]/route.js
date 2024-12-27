import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const POST = withAdminAuth(async (req, { params }) => {
    try {
        const body = await req.json();
        const { text } = body;
        const { id } = params;

        if (!text || !id) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Missing required fields: text or id",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const newComment = await prisma.comments.create({
            data: {
                text,
                userProfileId: Number(id),
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Comment added successfully",
                comment: newComment,
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error adding comment:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred while adding the comment",
                error: error.message,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
});



export const GET = withAdminAuth(async (req, { params }) => {
    try {
        const { id } = await params;
        const comments = await prisma.comments.findMany({
            where: {
                userProfileId: Number(id)
            },
        })

        return new Response(
            JSON.stringify(comments)
            ,{
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred while fetching comments",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        )
    }
})