import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const PATCH = withAdminAuth(async (req, {params}) => {
  try {
    const params1 = await params;
    const id = params1.id;
    const body = await req.json();

    if (Object.keys(body).length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'No fields provided to update' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updateData = {};
    if (body.totalLeave) updateData.totalLeave = body.totalLeave;
    if (body.totalWFH) updateData.totalWFH = body.totalWFH;
    if (body.userName) updateData.userName = body.userName;
    if (body.password) updateData.password = body.password;
    if (body.isAdmin !== undefined) updateData.isAdmin = body.isAdmin;
    if (body.name) updateData.name = body.name;
    if (body.photo) updateData.photo = body.photo;
    if (body.designation) updateData.designation = body.designation;
    if (body.dateOfJoining) updateData.dateOfJoining = new Date(body.dateOfJoining);
    if (body.email) updateData.email = body.email;
    if (body.contactDetails) updateData.contactDetails = body.contactDetails;
    if (body.DOB) updateData.DOB = new Date(body.DOB);
    if (body.highestEducation) updateData.highestEducation = body.highestEducation;
    if (body.instituteName) updateData.instituteName = body.instituteName;
    if (body.aadharCard) updateData.aadharCard = body.aadharCard;
    if (body.panCard) updateData.panCard = body.panCard;
    if (body.bloodGroup) updateData.bloodGroup = body.bloodGroup;
    if (body.address) updateData.address = body.address;
    if (body.endDate) updateData.endDate = new Date(body.endDate);
    if (body.emergencyContact) updateData.emergencyContact = body.emergencyContact;
    if (body.medicalHistory) updateData.medicalHistory = body.medicalHistory;
    if (body.salaryId) updateData.salaryId = body.salaryId;

    if (body.salary !== undefined) {
      return await prisma.$transaction(async (prismaClient) => {
        const currentSalary = await prismaClient.salary.findUnique({
          where: { employeeId: Number(id) },
        });

        if (!currentSalary) {
          return new Response(
            JSON.stringify({ success: false, message: "Salary record not found for employee" }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
          );
        }

        await prismaClient.salaryHistory.create({
          data: {
            previousSalary: currentSalary.salary,
            year: new Date().getFullYear(),
            userProfile: {
              connect: { id: Number(id) }
            },
            salary: {
              connect: { id: currentSalary.id }
            }
          },
        });

        await prismaClient.salary.update({
          where: { employeeId: Number(id) },
          data: { salary: body.salary },
        });

        const updatedUserProfile = await prismaClient.userProfile.update({
          where: { id: Number(id) },
          select: {
            id: true,
            userName: true,
            name: true,
          },
          data: updateData,
        });

        return new Response(
          JSON.stringify({
            updatedUserProfile,
            message: "Profile Update Successfully"
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      });
    }

    const updatedUserProfile = await prisma.userProfile.update({
      where: { id: Number(id) },
      select: {
        id: true,
        userName: true,
        name: true,
        
      },
      data: updateData,
    });

    return new Response(
      JSON.stringify(updatedUserProfile),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
})


export const DELETE = withAdminAuth(async (req, {params}) => {
  try {
    const {id} = params;

    if(!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'valid id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const existingUserProfile = await prisma.userProfile.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUserProfile) {
      return new Response(
        JSON.stringify({ success: false, message: 'No record found with the given id' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const removeEmployee = await prisma.userProfile.delete({
      where: {
        id: Number(id),
      }
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Employee deleted successfully',
        data: removeEmployee
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})