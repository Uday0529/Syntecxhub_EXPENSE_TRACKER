const expenses = [
    {
        id: 1,
        title: "Lunch",
        amount: 250,
        category: "Food"
    },

    {
        id: 2,
        title: "Ola Ride",
        amount: 500,
        category: "Travel"
    },

    {
        id: 3,
        title: "Bag",
        amount: 1000,
        category: "Shopping"
    }
];

export const getExpenses = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(expenses);
        }, 500);
    });
};