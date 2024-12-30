
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

async function verifyJWT(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log('JWT Payload:', payload); 
    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error); 
    return null;
  }
}

export async function isAuthenticated(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    console.log('Auth Header:', authHeader); 
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        message: 'Authorization header missing or invalid format',
        status: 401
      };
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); 
    
    if (!token) {
      return {
        success: false,
        message: 'Authentication token not found',
        status: 401
      };
    }

    const payload = await verifyJWT(token);
    console.log('Token Payload:', payload); 
    
    if (!payload) {
      return {
        success: false,
        message: 'Invalid token',
        status: 401
      };
    }

    const user = await prisma.userProfile.findUnique({
      where: { id: parseInt(payload.id) }, 
      select: {
        id: true,
        userName: true,
        isAdmin: true,
        name: true,
        email: true
      }
    });

    console.log('Found User:', user); 
    if (!user) {
      return {
        success: false,
        message: 'User not found',
        status: 404
      };
    }

    return {
      success: true,
      user,
      status: 200
    };
  } catch (error) {
    console.error('Authentication Error:', error);
    return {
      success: false,
      message: 'Authentication failed',
      status: 500
    };
  }
}

export async function isAdmin(request) {
  try {
    const authResult = await isAuthenticated(request);

    if (!authResult.success) {
      return authResult;
    }

    if (!authResult.user.isAdmin) {
      return {
        success: false,
        message: 'Unauthorized: Admin access required',
        status: 403
      };
    }

    return {
      success: true,
      user: authResult.user,
      status: 200
    };
  } catch (error) {
    return {
      success: false,
      message: 'Authorization failed',
      status: 500
    };
  }
}

export function withAuth(handler) {
  return async (request, context) => {
    const authResult = await isAuthenticated(request);

    if (!authResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: authResult.message
        }),
        {
          status: authResult.status,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    request.user = authResult.user;
    return handler(request, context);
  };
}

// export function withAdminAuth(handler) {
//   return async (request) => {
//     const adminResult = await isAdmin(request);

//     if (!adminResult.success) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: adminResult.message
//         }),
//         {
//           status: adminResult.status,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//     }

//     request.user = adminResult.user;
//     return handler(request);
//   };
// }

export function withAdminAuth(handler) {
  return async (request, context) => {
    const adminResult = await isAdmin(request);

    if (!adminResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: adminResult.message
        }),
        {
          status: adminResult.status,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    request.user = adminResult.user;
    
    return handler(request, context);
  };
}