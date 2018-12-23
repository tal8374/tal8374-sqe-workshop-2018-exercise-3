import {Expression} from './expression-handler';

function BreakStatementExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [];
}

BreakStatementExpression.prototype.init = function () {
    this.handleBreakStatement();

    this.increaseLineNumber();

    return 'Initialization done';
};

BreakStatementExpression.prototype.handleBreakStatement = function () {
    let name = new Expression(this.expression.label);

    let payload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: name.getExpression(),
    };

    this.payloads.push(payload);
};

BreakStatementExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

BreakStatementExpression.prototype.getPayloads = function () {
    return this.payloads;
};


export {BreakStatementExpression};
