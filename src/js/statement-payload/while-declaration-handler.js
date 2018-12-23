import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

function WhileDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [{}];
}

WhileDeclaration.prototype.init = function () {
    this.handleWhileDeclaration();

    this.handleWhileBody();

    this.increaseLineNumber();

    return 'Success';
};

WhileDeclaration.prototype.handleWhileBody = function () {
    let bodyContent = this.expression.body.type === 'BlockStatement' ? this.expression.body.body : this.expression.body;

    let body = new BodyDeclaration(bodyContent, this, this.lineNumber + 1);

    body.init();

    let payloads = body.getPayloads();

    this.payloads[0].body = [];

    for (let i = 0; i < payloads.length; i++) {
        this.payloads[0].body.push(payloads[i]);
    }
};

WhileDeclaration.prototype.handleWhileDeclaration = function () {
    let payload = this.getWhileData();

    this.payloads[0].declaration = payload;

    this.payloads[0].type = this.type ? this.type : this.expression.type;
};

WhileDeclaration.prototype.getWhileData = function () {
    let expression = new Expression(this.expression.test);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        condition: expression.getExpression(),
    };
};

WhileDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

WhileDeclaration.prototype.getPayloads = function () {
    return this.payloads;
};

export {WhileDeclaration};
