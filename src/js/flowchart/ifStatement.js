import {FlowchartHandler} from './flowchart-handler';
import {guid} from '../utils/common';

function IfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.localVariables = {};
}

IfStatement.prototype.createID = function () {
    if(!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();

    this.createIDBody();
};

IfStatement.prototype.createIDBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createID();
    }
};

export {IfStatement};
