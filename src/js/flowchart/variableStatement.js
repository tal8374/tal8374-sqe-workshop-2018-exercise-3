import {guid} from '../utils/common';

function VariableStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

VariableStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

VariableStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=> operation:' + this.getOperation();
};

VariableStatement.prototype.getOperation = function () {
    return 'let ' + this.payload.name + ' = ' + this.payload.value;
};

VariableStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

VariableStatement.prototype.updateNextNode = function () {
    if(!this.wrapper) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

export {VariableStatement};
