// const express = require('express');
// const { getAllTransactions, addTransaction, deleteTransaction }
//     = require('../Controllers/ExpenseController');
// const router = express.Router();

// router.get('/', getAllTransactions);
// router.post('/', addTransaction);
// router.delete('/:expenseId', deleteTransaction);

// module.exports = router;

const express = require('express');
const router = express.Router();

const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require('../Controllers/ExpenseController');

router.get('/', getExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
