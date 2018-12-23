import {SymbolicSubstitutionHandler} from './symbolic-substitution-handler';
import {getGlobalVariables, updateLocalVariable} from '../utils/common';

function IfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.localVariables = {};
}

IfStatement.prototype.handlers = {
    'VariableDeclarator': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

IfStatement.prototype.doSymbolicSubstitution = function () {
    this.handleDeclaration();

    this.initializeLocalVariables();
};

IfStatement.prototype.initializeLocalVariables = function () {
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

IfStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper, this.getParams());
};

IfStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

IfStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

IfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

IfStatement.prototype.handleDeclaration = function () {
    if (!this.payload.declaration || !this.payload.declaration.condition) return;
    let payload = {};
    payload.value = this.payload.declaration.condition;
    updateLocalVariable(payload, Object.assign({}, this.localVariables), this.getGlobalVariables(), this.getParams());
    this.payload.declaration.condition = payload.value;
};

export {IfStatement};
