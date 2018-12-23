import {Expression} from './expression-handler';

function ReturnExpression(returnExpression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.returnExpression = returnExpression;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [];
}

ReturnExpression.prototype.init = function () {
    this.handleExpression();

    this.increaseLineNumber();

    return 'Success';
};

ReturnExpression.prototype.handleExpression = function () {
    let payload = this.getPayload();

    this.payloads.push(payload);
};

ReturnExpression.prototype.getPayload = function () {
    let expression = new Expression(this.returnExpression.argument);

    return {
        type: this.type ? this.type : this.returnExpression.type,
        value: '' + expression.getExpression(),
        lineNumber: this.lineNumber,
    };
};

ReturnExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ReturnExpression.prototype.getPayloads = function () {
    return this.payloads;
};

export {ReturnExpression};
