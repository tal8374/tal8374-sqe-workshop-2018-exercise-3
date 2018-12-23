import {colorCondition} from '../utils/common';
import {ColorHandler} from './color-handler';

function ElseIfStatement(wrapper, payload, input, isMarked) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.input = input;
    this.isMarked = isMarked;
}

ElseIfStatement.prototype.colorCode = function () {
    if (this.isElseIfStatement()) {
        this.colorCodeElseIfStatement();
    } else {
        this.colorCodeElseStatement();
    }

    this.handleBody();
};

ElseIfStatement.prototype.handleBody = function () {
    let bodyCode = this.payload.body;

    let colorCreator = new ColorHandler(bodyCode, this, this.input);
    colorCreator.colorCode();
};

ElseIfStatement.prototype.colorCodeElseStatement = function () {
    this.payload.style = {};

    if (!this.isMarked.isMarked) {
        this.payload.style.backgroundColor = '#7FFF00';
    } else {
        this.payload.style.backgroundColor = '#FF4500';
    }
};

ElseIfStatement.prototype.colorCodeElseIfStatement = function () {
    let condition = this.payload.declaration.condition;
    colorCondition(this.payload, this.getParams(), condition, this.input);

    if (!this.isMarked.isMarked) {
        this.isMarked.isMarked = this.payload.style.backgroundColor === '#7FFF00';
    }
};

ElseIfStatement.prototype.isElseIfStatement = function () {
    return this.payload.declaration;
};

ElseIfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

export {ElseIfStatement};
