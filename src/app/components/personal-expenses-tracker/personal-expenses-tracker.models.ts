export class Expense {
    category:ExpenseCategory;
    sum:number;
    date:Date;
}

export enum ExpenseCategory {
    Food,
    Transportation,
    Clothes,
    Health,
    Education,
    Housing,
    Other
}