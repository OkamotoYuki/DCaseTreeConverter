var DCaseTree = require("../DCaseTreeConverter/DCaseTree")
function test() {
    var root = new DCaseTree.TopGoalNode("Sample DCase", 12, "Top Goal", [
        {
            "Type": "Issue",
            "To": "YNU",
            "Subject": "JSSST",
            "Visible": "True"
        }, 
        {
            "Type": "Issue",
            "To": "YNU",
            "Subject": "Thesis",
            "Visible": "True"
        }
    ], 1);
    var child1 = new DCaseTree.StrategyNode("First Strategy", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 1);
    var child2 = new DCaseTree.StrategyNode("Second Strategy", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 2);
    var child3 = new DCaseTree.GoalNode("Second Goal", {
        "Type": "Means",
        "To": "Professor",
        "Source": "POPL",
        "Visible": "False"
    }, 3);
    var child4 = new DCaseTree.GoalNode("Third Goal", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "False"
    }, 4);
    var child5 = new DCaseTree.StrategyNode("Third Strategy", [
        {
            "Type": "Means",
            "To": "Professor",
            "Source": "Splash",
            "Visible": "False"
        }, 
        {
            "Type": "Means",
            "To": "Professor",
            "Source": "Splash",
            "Visible": "True"
        }
    ], 5);
    var child6 = new DCaseTree.StrategyNode("Fourth Strategy", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 6);
    var child7 = new DCaseTree.GoalNode("Fourth Goal", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 7);
    var child8 = new DCaseTree.GoalNode("Fifth Goal", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 8);
    var child9 = new DCaseTree.SolutionNode("First Solution", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 9);
    var context1 = new DCaseTree.ContextNode("First Context", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "True"
    }, 10);
    var context2 = new DCaseTree.ContextNode("Second Context", {
        "Type": "Means",
        "To": "Professor",
        "Source": "Splash",
        "Visible": "False"
    }, 11);
    var context3 = new DCaseTree.ContextNode("Third Context", {
        "Type": "Means",
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
    root.convertAllChildNodeIntoXml([]);
}
exports.test = test;
test();
