import {guid} from '../utils/common';

function AssignmentStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

AssignmentStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

AssignmentStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=> operation:' + this.getOperation();
};

AssignmentStatement.prototype.getOperation = function () {
    return this.payload.name + ' = ' + this.payload.value;
};

AssignmentStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

AssignmentStatement.prototype.updateNextNode = function () {
    if(!this.wrapper) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

export {AssignmentStatement};
