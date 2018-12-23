import {guid} from '../utils/common';
import {FlowchartHandler} from './flowchart-handler';

function ElseIfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

ElseIfStatement.prototype.createID = function () {
    if(!this.payload.flowchart) {
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


export {ElseIfStatement};
