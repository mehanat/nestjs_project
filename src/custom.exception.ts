import {HttpException, HttpStatus} from "@nestjs/common";

export class CustomException extends HttpException {
    constructor(message: string) {
        super('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
        this.message = message;
    }
}