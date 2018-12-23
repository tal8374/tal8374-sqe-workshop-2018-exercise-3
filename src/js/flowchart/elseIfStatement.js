import {guid} from '../utils/common';
import {FlowchartHandler} from './flowchart-handler';
import {IfStatement} from './ifStatement';

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


export {ElseIfStatement};
