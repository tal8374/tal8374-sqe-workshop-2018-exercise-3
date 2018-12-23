import {guid} from '../utils/common';
import {FlowchartHandler} from './flowchart-handler';

function ElseIfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

ElseIfStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();

    this.createIDBody();
};

ElseIfStatement.prototype.createIDBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createID();
    }
};

ElseIfStatement.prototype.declareNode = function () {
    if (this.payload.declaration) {
        this.payload.flowchart.data = this.getID() + '=> operation:' + this.getCondition();

    }

    this.createBodyNodeDeclaration();
};

ElseIfStatement.prototype.getCondition = function () {
    return this.payload.declaration.condition;
};

ElseIfStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

ElseIfStatement.prototype.createBodyNodeDeclaration = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.declareNode();
    }
};

ElseIfStatement.prototype.updateNextNode = function () {
    if (!this.wrapper) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if (!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

ElseIfStatement.prototype.getNextNode = function (nodeID) {
    let body = this.payload.body;

    for (let i = 0; i < body.length - 1; i++) {
        let payload = body[i];

        if (payload.flowchart.id === nodeID) {
            return body[i + 1].flowchart.id;
        }
    }
};

export {ElseIfStatement};
