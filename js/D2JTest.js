var DCaseTree = require("./DCaseTree")
function test() {
    var root = new DCaseTree.TopGoalNode("Sample DCase", 11, "Top Goal", {
        "type": "Issue",
        "To": "YNU",
        "Subject": "JSSST",
        "Visible": "True"
    }, 1);
    var child1 = new DCaseTree.StrategyNode("First Strategy", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 1);
    var child2 = new DCaseTree.StrategyNode("Second Strategy", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 2);
    var child3 = new DCaseTree.GoalNode("Second Goal", {
        "type": "Means",
        "To": "Professor",
        "Source": "POPL",
        "Visible": "False"
    }, 3);
    var child4 = new DCaseTree.GoalNode("Third Goal", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "False"
    }, 4);
    var child5 = new DCaseTree.StrategyNode("Third Strategy", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "False"
    }, 5);
    var child6 = new DCaseTree.StrategyNode("Fourth Strategy", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 6);
    var child7 = new DCaseTree.GoalNode("Fourth Goal", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 7);
    var child8 = new DCaseTree.GoalNode("Fifth Goal", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 8);
    var child9 = new DCaseTree.SolutionNode("First Solution", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 9);
    var context1 = new DCaseTree.ContextNode("First Context", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 10);
    var context2 = new DCaseTree.ContextNode("Second Context", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "False"
    }, 11);
    var context3 = new DCaseTree.ContextNode("Third Context", {
        "type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "False"
    }, 12);
    root.Contexts.push(context1);
    root.Children.push(child1);
    root.Children.push(child2);
    child1.Children.push(child3);
    child2.Children.push(child4);
    child4.Contexts.push(context2);
    child4.Contexts.push(context3);
    child4.Children.push(child5);
    child4.Children.push(child6);
    child5.Children.push(child7);
    child6.Children.push(child8);
    child8.Children.push(child9);
    console.log(root.convertAllChildNodeIntoJson([]));
}
exports.test = test;
test();
