// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';
// import { withAuth } from '@/lib/middleware';

// export async function POST(req, {params}) {
//   try {
//     const body = await req.json();

//     const {
//       userName,
//       password,
//       isAdmin,
//       name,
//       photo,
//       designation,
//       dateOfJoining,
//       email,
//       contactDetails,
//       DOB,
//       highestEducation,
//       instituteName,
//       aadharCard,
//       panCard,
//       totalLeave,
//       totalWFH,
//       bloodGroup,
//       address,
//       endDate,
//       emergencyContact,
//       medicalHistory,
//       salaryAmount 
//     } = body;

//     if (!userName || !password || !name || !email || !contactDetails) {
//       return new Response(
//         JSON.stringify({
//           error: 'userName, password, name, email, and contactDetails are required.',
//         }),
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.userProfile.findFirst({
//       where: {
//         OR: [{ userName }, { email }],
//       },
//     });

//     if (existingUser) {
//       return new Response(
//         JSON.stringify({ error: 'User with this userName or email already exists.' }),
//         { status: 409 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUserProfile = await prisma.userProfile.create({
//       data: {
//         userName,
//         password: hashedPassword,
//         isAdmin: isAdmin || false,
//         name,
//         photo: photo ? Buffer.from(photo, 'base64') : undefined,
//         designation,
//         dateOfJoining: new Date(dateOfJoining),
//         email,
//         contactDetails,
//         DOB: new Date(DOB),
//         highestEducation,
//         instituteName,
//         aadharCard,
//         panCard,
//         bloodGroup,
//         totalLeave,
//         totalWFH,
//         address,
//         endDate: new Date(endDate),
//         emergencyContact,
//         medicalHistory,
//         salary: { 
//           create: {
//             salary: salaryAmount , 
//           },
//         },
//       },
//       select: {
//         id: true,
//         userName: true,
//         isAdmin: true,
//         name: true,
//         photo: true,
//         designation: true,
//         dateOfJoining: true,
//         email: true,
//         contactDetails: true,
//         DOB: true,
//         highestEducation: true,
//         instituteName: true,
//         aadharCard: true,
//         panCard: true,
//         bloodGroup: true,
//         totalLeave: true,
//         totalWFH: true,
//         address: true,
//         endDate: true,
//         emergencyContact: true,
//         medicalHistory: true,
//         createdAt: true,
//         salary: {
//           select: {
//             salary: true,
//             id: true,
//           },
//         },
//       },
//     });
    

//     return new Response(JSON.stringify(newUserProfile), {
//       status: 201,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Error creating UserProfile:', error);

//     return new Response(
//       JSON.stringify({ error: 'Something went wrong while creating the profile.' }),
//       { status: 500 }
//     );
//   }
// }



import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req, { params }) {
  try {
    const contentType = req.headers.get('content-type');
    let body = {};
    
    if (contentType?.includes('multipart/form-data')) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      body = await req.json();
    }

    const {
      userName,
      password,
      isAdmin,
      name,
      photo,
      designation,
      dateOfJoining,
      email,
      contactDetails,
      DOB,
      highestEducation,
      instituteName,
      aadharCard,
      panCard,
      totalLeave,
      totalWFH,
      bloodGroup,
      address,
      endDate,
      emergencyContact,
      medicalHistory,
      salaryAmount,
    } = body;

    const requiredFields = {
      userName,
      password,
      isAdmin,
      name,
      designation,
      dateOfJoining,
      email,
      contactDetails,
      DOB,
      highestEducation,
      instituteName,
      aadharCard,
      panCard,
      bloodGroup,
      address,
      endDate,
      emergencyContact,
      medicalHistory,
      totalLeave,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === undefined || value === '')
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          error: `Missing required fields: ${missingFields.join(', ')}`,
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    const existingUser = await prisma.userProfile.findFirst({
      where: {
        OR: [{ userName }, { email }],
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User with this userName or email already exists.' }),
        { 
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      userName,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin),
      name,
      designation,
      dateOfJoining: new Date(dateOfJoining),
      email,
      contactDetails,
      DOB: new Date(DOB),
      highestEducation,
      instituteName,
      aadharCard,
      panCard,
      bloodGroup,
      totalLeave: parseFloat(totalLeave),
      totalWFH: parseInt(totalWFH || '0'),
      address,
      endDate: new Date(endDate),
      emergencyContact,
      medicalHistory,
      
    };

    if (photo) {
      if (photo instanceof Blob) {
        const bytes = await photo.arrayBuffer();
        userData.photo = Buffer.from(bytes);
      } else if (typeof photo === 'string' && photo.startsWith('data:image')) {
        const base64Data = photo.split(',')[1];
        userData.photo = Buffer.from(base64Data, 'base64');
      }
    }

    if (salaryAmount) {
      userData.salary = {
        create: {
          salary: parseFloat(salaryAmount),
        },
      };
    }

    const newUserProfile = await prisma.userProfile.create({
      data: userData,
      select: {
        id: true,
        userName: true,
        isAdmin: true,
        name: true,
        photo: true,
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
        totalWFH: true,
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
    });

    return new Response(JSON.stringify(newUserProfile), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating UserProfile:', error);

    let errorMessage = 'Something went wrong while creating the profile.';
    if (error.code === 'P2002') {
      errorMessage = 'A unique constraint would be violated on UserProfile.';
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}