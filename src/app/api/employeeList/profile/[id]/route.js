import prisma from "@/lib/prisma";

export async function GET(req, {params}) {
    try {
        const {id} = await params;
        const image = await prisma.userProfile.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                photo: true
            }
        })
        if(!image) {
            return new Response(JSON.stringify({
                message: "Image not found"
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
          
            })
        }

        const headers = new Headers();
        headers.set('Content-Type', image.mimeType);
        headers.set('Content-Length', image.photo.length.toString())

        return new Response(
            image.photo,
            {
                headers
            }
        )
    } catch (error) {
        return new Response(JSON.stringify({
            message: error.message
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}


// import prisma from "@/lib/prisma";

// export async function GET(req, { params }) {
//     try {
//         const { id } = params;

//         // Validate the ID
//         if (!id || isNaN(Number(id))) {
//             return new Response(JSON.stringify({
//                 message: "Invalid or missing ID"
//             }), {
//                 status: 400,
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//         }

//         // Query the image from the database
//         const image = await prisma.userProfile.findUnique({
//             where: {
//                 id: Number(id)
//             },
//             select: {
//                 photo: true,
//                 mimeType: true // Ensure this exists in your schema
//             }
//         });

//         // Handle image not found
//         if (!image || !image.photo) {
//             return new Response(JSON.stringify({
//                 message: "Image not found"
//             }), {
//                 status: 404,
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//         }

//         // Set headers for the response
//         const headers = new Headers();
//         headers.set('Content-Type', image.mimeType || 'application/octet-stream');
//         headers.set('Content-Length', image.photo.length.toString());

//         // Return the image binary
//         return new Response(image.photo, { headers });
//     } catch (error) {
//         console.error('Error retrieving image:', error);

//         return new Response(JSON.stringify({
//             message: "Internal server error"
//         }), {
//             status: 500,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//     }
// }