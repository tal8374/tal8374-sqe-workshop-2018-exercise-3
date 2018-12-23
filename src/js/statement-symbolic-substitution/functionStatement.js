import {SymbolicSubstitutionHandler} from './symbolic-substitution-handler';
import {getGlobalVariables, updateLocalVariable} from '../utils/common';

function FunctionStatement(wrapper, payload) {
    this.payload = payload;
    this.wrapper = wrapper;
    this.localVariables = {};
}

FunctionStatement.prototype.handlers = {
    'VariableDeclarator': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

FunctionStatement.prototype.doSymbolicSubstitution = function () {
    this.initializeLocalVariables();
};

FunctionStatement.prototype.initializeLocalVariables = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let type = body[i].type;
        let payload = body[i];

        if (this.handlers[type]) {
            updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), this.getParams());
        } else {
            let symbolicSubstitution = new SymbolicSubstitutionHandler([payload], this);
            symbolicSubstitution.doSymbolicSubstitution();
        }
    }
};

FunctionStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

FunctionStatement.prototype.getParams = function () {
    let params = this.payload.params;
    let wrapperParams = this.getWrapperParams();

    return [...params, ...wrapperParams];
};

FunctionStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper, this.getParams());
};

FunctionStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

export {FunctionStatement};
