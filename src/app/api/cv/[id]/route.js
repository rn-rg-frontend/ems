import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const POST = withAdminAuth(async (req, {params}) => {
    try {
        const { id } = params;

        const body = await req.json();

        const {
            name,
            file,
        } = body;

        if (!name || !file) {
            return new Response(
                JSON.stringify({ error: "Name and file are required." }),
                { status: 400 }
            );
        }

        const addCV = await prisma.cV.create({
            data: {
                name,
                file: Buffer.from(file, 'base64'),
                userProfileId: Number(id),
            },
        });

        return new Response(
            JSON.stringify(addCV), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
})

export const GET = withAdminAuth(async (req, {params}) => {
    try {
        const { id } = params;

        const cv = await prisma.cV.findMany({
            where: {
                userProfileId: Number(id),
            },
            select: {
                id: true,
                name: true,
                file: true,
                userProfileId: true
            }
        })

        return new Response(
            JSON.stringify(
                cv
            ),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
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


export const DELETE = withAdminAuth(async (req) => {
  try {
    const body = await req.json();
    const { id } = body; 

    const deletedCV = await prisma.cV.delete({
      where: {
        id: Number(id), 
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: 'CV deleted successfully', deletedCV }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting CV:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Something went wrong while deleting the CV.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
})
