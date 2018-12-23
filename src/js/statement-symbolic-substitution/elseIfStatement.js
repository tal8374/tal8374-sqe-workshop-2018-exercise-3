import {SymbolicSubstitutionHandler} from './symbolic-substitution-handler';
import {getGlobalVariables, updateLocalVariable} from '../utils/common';

function ElseIfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.localVariables = {};
}

ElseIfStatement.prototype.handlers = {
    'VariableDeclarator': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

ElseIfStatement.prototype.doSymbolicSubstitution = function () {
    this.handleDeclaration();

    this.initializeLocalVariables();
};

ElseIfStatement.prototype.initializeLocalVariables = function () {
    if (this.isElseIfStatement()) {
        this.handleElseIfStatement();
    } else {
        this.handleElseStatement();
    }

};

ElseIfStatement.prototype.handleElseIfStatement = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];
        let type = payload.type;

        if (this.handlers[type]) {
            updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), this.getParams());
        } else {
            let symbolicSubstitution = new SymbolicSubstitutionHandler([payload], this);
            symbolicSubstitution.doSymbolicSubstitution();
        }
    }
};

ElseIfStatement.prototype.handleElseStatement = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];
        let type = payload.type;

        if (this.handlers[type]) {
            updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), this.getParams());
        } else {
            let symbolicSubstitution = new SymbolicSubstitutionHandler([payload], this);
            symbolicSubstitution.doSymbolicSubstitution();
        }
    }
};

ElseIfStatement.prototype.isElseIfStatement = function () {
    return this.payload.declaration;
};

ElseIfStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper, this.getParams());
};

ElseIfStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

ElseIfStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

ElseIfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

ElseIfStatement.prototype.handleDeclaration = function () {
    if (!this.payload.declaration || !this.payload.declaration.condition) return;
    let payload = {};
    payload.value = this.payload.declaration.condition;
    updateLocalVariable(payload, Object.assign({}, this.localVariables), this.getGlobalVariables(), this.getParams());
    this.payload.declaration.condition = payload.value;
};

export {ElseIfStatement};
