function Expression(conditionExpression) {
    this.conditionExpression = conditionExpression;
}

Expression.prototype.getExpression = function () {
    if (!this.conditionExpression || !this.handlers[this.conditionExpression.type]) {
        return '';
    }

    return this.handlers[this.conditionExpression.type](this.conditionExpression);
};

Expression.prototype.handlers = {
    'Literal': literalTestHandler,
    'BinaryExpression': binaryExpressionHandler,
    'Identifier': identifierTestHandler,
    'MemberExpression': memberExpressionTestHandler,
    'ArrayExpression': arrayExpressionTestHandler,
    'ObjectExpression': objectExpressionHandler,
    'ConditionalExpression': conditionalExpressionHandler,
};

function literalTestHandler(conditionExpression) {
    return conditionExpression.value;
}

function binaryExpressionHandler(conditionExpression) {
    let left = new Expression(conditionExpression.left).getExpression();
    let operator = conditionExpression.operator;
    let right = new Expression(conditionExpression.right).getExpression();

    if (operator === '*' || operator === '/') {
        return '(' + left + ')' + operator + '(' + right + ')';
    }

    return left + operator + right;
}

function identifierTestHandler(conditionExpression) {
    return conditionExpression.name;
}

function memberExpressionTestHandler(conditionExpression) {
    let object = conditionExpression.object.name;
    let property = new Expression(conditionExpression.property).getExpression();

    if (conditionExpression.computed) {
        return object + '[' + property + ']';
    } else {
        return object + '.' + property;
    }

}

function arrayExpressionTestHandler(conditionExpression) {
    let array = '';

    for (let i = 0; i < conditionExpression.elements.length; i++) {
        let expression = new Expression(conditionExpression.elements[i]);

        if (i === conditionExpression.elements.length - 1) {
            array += expression.getExpression();
        } else {
            array += expression.getExpression() + ',';
        }
    }

    return '[' + array + ']';
}

function objectExpressionHandler(conditionExpression) {
    let value = '';

    for (let i = 0; i < conditionExpression.properties.length; i++) {
        let propertyValue = new Expression(conditionExpression.properties[i].value);
        let propertyKey = new Expression(conditionExpression.properties[i].key);

        value = value + propertyKey.getExpression() + ':' + propertyValue.getExpression();

        if (i !== conditionExpression.properties.length - 1) {
            value += ',';
        }
    }

    return '{' + value + '}';
}

function conditionalExpressionHandler(conditionExpression) {
    let test = new Expression(conditionExpression.test).getExpression();
    let alternate = new Expression(conditionExpression.alternate).getExpression();
    let consequent = new Expression(conditionExpression.consequent).getExpression();

    return test + ' ? ' + consequent + ' : ' + alternate;
}

export {Expression};
