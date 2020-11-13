function random_element(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function find_rule(stylesheet, selector) {
    var rule_list = stylesheet.rules;
    for (var c = 0; c < rule_list.length; c++) {
        if (rule_list.item(c).selectorText == selector) {
            return rule_list.item(c);
        }
    }
    
    return null;
}

function get_rule(rule, property) {
    return rule.style[property];
}

function set_rule(rule, property, new_value) {
    rule.style[property] = new_value;
}