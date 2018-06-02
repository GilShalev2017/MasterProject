import {Component, OnInit} from '@angular/core';
import {QuizService} from './quiz.service';
import {Question} from './quiz.models';
import {AnswerOption} from './quiz.models';

@Component({
    selector: 'quiz',
    moduleId: module.id,
    templateUrl:'quiz.component.html',
})

export class QuizComponent implements OnInit {

    title = 'JavaScript Knowledge Quiz';
    questions: Question[];
    currentQuestion: Question;
    currentIndex: number;
    score: number;
    allQuestionsAnswered :boolean;
    scoreCalculated:boolean;
    isPreviousButtonHidden:boolean;

    constructor(private quizService: QuizService) {
        this.currentIndex = 0;
        this.currentQuestion = {
            id: -1,
            question: "",
            answer: "",
            userAnswer: "",
            choices: []
        };
    }

    ngOnInit(): void {
        this.quizService.downloadQuestions().subscribe((arrivedData: Question[]) => {
            this.populateQuestions(arrivedData);
        });
    }

    back(): void {
        if (this.currentIndex === 0)
            return;

        this.currentIndex--;
        this.currentQuestion = this.questions[this.currentIndex] as Question;
    }

    next(): void {
        if (this.currentIndex === this.questions.length - 1)
            return;

        this.currentIndex++;
        this.currentQuestion = this.questions[this.currentIndex] as Question;

    }

    calculatScore() {

        let correctAnswers: number = 0;

        for (var question of this.questions) {

            if (question.answer === question.userAnswer) {
                correctAnswers++;
            }
        }

        this.score = (correctAnswers * 10);

        this.scoreCalculated = true;
    }

    //onRadioButtonClick(currentAnswer:Question, selectedAnswer:AnswerOption, event)
    onRadioButtonClick(currentAnswer:Question, selectedAnswer:AnswerOption)
    {
        currentAnswer.userAnswer = selectedAnswer.id.toString();

        this.areAllQuestionsAnswered();

    }

    announceEnd(){
        toastr.options.showMethod = 'slideDown';
        // toastr.options.showEasing = 'easeOutBounce';
        toastr.options.timeOut = 120; // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 60; // How long the toast will display after a user hovers over it
        // toastr.success("this is a test");
        toastr.info('You have finished answering the exam.', 'Exam finished', {timeOut: 5000});
    }
    areAllQuestionsAnswered()
    {
        var count: number = 0;

        for(var q of this.questions)
        {
            if(q.userAnswer)
                count++;
        }

        if(count === 10)
        {
            this.allQuestionsAnswered = true;
            this.announceEnd();
            return;
        }

        this.allQuestionsAnswered = false;
    }

    populateQuestions(arrivedData: Question[]) {

        this.questions = arrivedData["questions"];

        this.currentQuestion = this.questions[0];

        this.isPreviousButtonHidden = true;
    }
}
