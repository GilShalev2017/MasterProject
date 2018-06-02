export interface Question{
    id: number;
    question: string;
    answer: string;
    userAnswer: string;
    choices: AnswerOption[];
}

export interface AnswerOption {
    id:number;
    text:string;
}