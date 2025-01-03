import prisma from "@/lib/prisma";
import { withAdminAuth } from "@/lib/middleware";

export const POST = withAdminAuth(async (req) => {
  try {
    const body = await req.json();

    const { date, account, amount, reason, typeOfExpenseId } = body;

    if (!date || !account || !amount || !reason || !typeOfExpenseId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All fields are required.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transaction = await prisma.expense.create({
      data: {
        date: new Date(date),
        account,
        amount,
        reason,
        typeOfExpenseId
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: transaction,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

});


export const GET = withAdminAuth(async (req) => {
  try {
    const transaction = await prisma.expense.findMany({
      select: {
        id: true,
        date: true,
        account: true,
        amount: true,
        reason: true,
        userProfile: {
          select: {
            name: true,
          }
        },
        typeOfExpense: {
          select: {
            name: true,
          }
        }
      }
    })

    const formattedTransactions = transaction.map((record) => ({
      id: record.id,
      date: record.date,
      account: record.account,
      amount: record.amount,
      reason: record.reason,
      userName: record.userProfile?.name || null, 
      typeOfExpenseName: record.typeOfExpense?.name || null, 
    }));

    return new Response(
      JSON.stringify({
        success: true,
        data: formattedTransactions,
      }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
});