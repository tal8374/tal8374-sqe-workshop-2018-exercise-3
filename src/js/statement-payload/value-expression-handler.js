import {Expression} from './expression-handler';

function ValueExpression(expression) {
    this.expression = expression;
}

ValueExpression.prototype.getValue = function () {
    let expression = new Expression(this.expression);

    return expression.getExpression();
};

export {ValueExpression};
