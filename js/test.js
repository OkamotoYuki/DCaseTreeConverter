var DCaseTree = require("./DCaseTree")
var root = new DCaseTree.GoalNode("", "hogehoge", 1);
var child = new DCaseTree.StrategyNode("", "hogehoge", 1);
root.Children.push(child);
root.dump();
var testJson = [];
console.log(root.convertAllChildNodeIntoJson(testJson));
