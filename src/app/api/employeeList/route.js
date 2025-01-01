import prisma from '@/lib/prisma';
import { withAdminAuth } from '@/lib/middleware';

export const GET = withAdminAuth(async (req) => {
    try {
        const employees = await prisma.userProfile.findMany({
            select: {
                id: true,
                userName: true,
                name: true,
                designation: true,
                email: true,
                contactDetails: true,
                dateOfJoining: true,
                // photo: true,
                DOB: true,
                highestEducation: true,
                instituteName: true,
                aadharCard: true,
                panCard: true,
                bloodGroup: true,
                address: true,
                endDate: true,
                emergencyContact: true,
                medicalHistory: true,
                totalLeave: true,
                salary: {
                    select: {
                      salary: true,
                      id: true,
                    },
                  },
            },
        });

        return new Response(JSON.stringify({
            success: true,
            data: employees,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching employees:', error);

        return new Response(JSON.stringify({
            success: false,
            message: 'Error fetching employees',
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
})


// import prisma from '@/lib/prisma';
// import { withAdminAuth } from '@/lib/middleware';

// // Utility function to convert byte object to base64 string
// const convertToBase64 = (photoData) => {
//   if (!photoData) return '';
//   try {
//     const byteArray = Object.values(photoData);
//     return btoa(String.fromCharCode.apply(null, byteArray));
//   } catch (error) {
//     console.error('Error converting photo to base64:', error);
//     return '';
//   }
// };

// export const GET = withAdminAuth(async (req) => {
//   try {
//     const employees = await prisma.userProfile.findMany({
//       select: {
//         id: true,
//         userName: true,
//         name: true,
//         designation: true,
//         email: true,
//         contactDetails: true,
//         dateOfJoining: true,
//         photo: true,
//         DOB: true,
//         highestEducation: true,
//         instituteName: true,
//         aadharCard: true,
//         panCard: true,
//         bloodGroup: true,
//         address: true,
//         endDate: true,
//         emergencyContact: true,
//         medicalHistory: true,
//         totalLeave: true,
//         salary: {
//           select: {
//             salary: true,
//             id: true,
//           },
//         },
//       },
//     });

//     // Convert photo data to base64 for each employee
//     const employeesWithBase64Photo = employees.map(employee => ({
//       ...employee,
//       photo: employee.photo ? convertToBase64(employee.photo) : ''
//     }));

//     return new Response(JSON.stringify({
//       success: true,
//       data: employeesWithBase64Photo,
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching employees:', error);

//     return new Response(JSON.stringify({
//       success: false,
//       message: 'Error fetching employees',
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// });