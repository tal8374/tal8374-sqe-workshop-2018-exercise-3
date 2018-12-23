import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

function FunctionDeclaration(body, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [{}];
}

FunctionDeclaration.prototype.init = function () {
    this.handleFunctionDeclaration();

    this.handleParamsDeclaration();

    this.handleFunctionBody();

    this.increaseLineNumber();

    return 'Success';
};

FunctionDeclaration.prototype.handleFunctionBody = function () {
    var bodyDeclarationInstance = new BodyDeclaration(this.body.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();

    let playloads = bodyDeclarationInstance.getPayloads();

    this.payloads[0].body = [];

    for (let i = 0; i < playloads.length; i++) {
        this.payloads[0].body.push(playloads[i]);
    }
};

FunctionDeclaration.prototype.handleParamsDeclaration = function () {
    var params = this.body.params;

    this.payloads[0].params = [];

    for (let i = 0; i < params.length; i++) {
        var payload = this.getParamData(params[i]);

        this.payloads[0].params.push(payload);
    }
};

FunctionDeclaration.prototype.getParamData = function (param) {
    let name = new Expression(param);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : 'Param',
        name: name.getExpression(),
        value: null,
    };
};

FunctionDeclaration.prototype.handleFunctionDeclaration = function () {
    var payload = this.getFunctionData();

    this.payloads[0].declaration = payload;
    this.payloads[0].type = this.body.type;
};

FunctionDeclaration.prototype.getFunctionData = function () {
    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: this.body.id.name,
        value: null,
    };
};

FunctionDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

FunctionDeclaration.prototype.getPayloads = function () {
    return this.payloads;
};

export {FunctionDeclaration};
