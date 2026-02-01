// const UserModel = require("../Models/User");

// const addTransaction = async (req, res) => {
//     const { _id } = req.user;
//     console.log(_id, req.body)
//     try {
//         const userData = await UserModel.findByIdAndUpdate(
//             _id,
//             { $push: { expenses: req.body } },
//             { new: true } // For Returning the updated documents
//         )
//         res.status(200)
//             .json({
//                 message: "Expense added successfully",
//                 success: true,
//                 data: userData?.expenses
//             })
//     } catch (err) {
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: err,
//             success: false
//         })
//     }
// }

// const getAllTransactions = async (req, res) => {
//     const { _id } = req.user;
//     console.log(_id, req.body)
//     try {
//         const userData = await UserModel.findById(_id).select('expenses');
//         res.status(200)
//             .json({
//                 message: "Fetched Expenses successfully",
//                 success: true,
//                 data: userData?.expenses
//             })
//     } catch (err) {
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: err,
//             success: false
//         })
//     }
// }

// const deleteTransaction = async (req, res) => {
//     const { _id } = req.user;
//     const expenseId = req.params.expenseId;
//     try {
//         const userData = await UserModel.findByIdAndUpdate(
//             _id,
//             { $pull: { expenses: { _id: expenseId } } },
//             { new: true } // For Returning the updated documents
//         )
//         res.status(200)
//             .json({
//                 message: "Expense Deleted successfully",
//                 success: true,
//                 data: userData?.expenses
//             })
//     } catch (err) {
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: err,
//             success: false
//         })
//     }
// }

// module.exports = {
//     addTransaction,
//     getAllTransactions,
//     deleteTransaction
// }


const UserModel = require('../Models/User');

// 📥 GET EXPENSES
const getExpenses = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user.expenses || [],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expenses',
    });
  }
};

// ➕ ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const { text, amount } = req.body;

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.expenses.push({
      text,
      amount,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      data: user.expenses, // 🔥 IMPORTANT
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to add expense',
    });
  }
};

// ❌ DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.expenses = user.expenses.filter(
      (exp) => exp._id.toString() !== req.params.id
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: user.expenses, // 🔥 IMPORTANT
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete expense',
    });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
};

