export enum QuestionType {
    MULTI_SELECT, SELECT, TEXT
}

export type Question = {
    id: string,
    description: string,
    type: QuestionType,
    options: string[]
}

export type Test = {
    id: string,
    title: string,
    description: string,
    createdBy: string,
    createdAt: Date,
    questions: Question[]
}