import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';
import {ElseExpression} from './else-expression-handler';

function IfExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [{}];
}

IfExpression.prototype.init = function () {
    this.handleIfDeclaration();

    this.handleIfBody();

    this.handleAlternative();

    this.increaseLineNumber();

    return 'Initialization done';
};

IfExpression.prototype.handleIfBody = function () {
    let body = this.expression.consequent ? this.expression.consequent : this.expression.alternate;

    let bodyExpression = new BodyDeclaration(body, this, this.lineNumber + 1);
    bodyExpression.init();

    let payloads = bodyExpression.getPayloads();

    this.payloads[0].body = [];

    for (let i = 0; i < payloads.length; i++) {
        this.payloads[0].body.push(payloads[i]);
    }

    return 'Body statement is handled';
};

IfExpression.prototype.handleAlternative = function () {
    if (!this.expression.alternate) return 'Alternative does not exists';

    if (this.expression.alternate.type === 'IfStatement') {
        this.handleIfElseStatement();
    } else {
        this.handleElseStatement();
    }

    return 'Done handling the alternative';
};

IfExpression.prototype.handleIfElseStatement = function () {
    var alternative = new IfExpression(this.expression.alternate, this, this.lineNumber + 1, 'else if statement');
    alternative.init();

    let payloads = alternative.getPayloads();

    for (let i = 0; i < payloads.length; i++) {
        this.payloads.push(payloads[i]);
    }
};

IfExpression.prototype.handleElseStatement = function () {
    var alternative = new ElseExpression(this.expression.alternate, this, this.lineNumber + 1, 'else if statement');
    alternative.init();

    let payloads = alternative.getPayloads();

    for (let i = 0; i < payloads.length; i++) {
        this.payloads.push(payloads[i]);
    }
};

IfExpression.prototype.handleIfDeclaration = function () {
    this.payloads[0].type = this.type ? this.type : this.expression.type;

    var payload = this.getPayload();

    this.payloads[0].declaration = payload;

    return 'Done inserting the payload to the table';
};

IfExpression.prototype.getPayload = function () {
    var condition = new Expression(this.expression.test);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: null,
        value: null,
        condition: condition ? condition.getExpression() : '',
    };
};

IfExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

IfExpression.prototype.getPayloads = function () {
    return this.payloads;
};

export {IfExpression};
