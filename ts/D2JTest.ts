import DCaseTree = module("DCaseTree");

var root : DCaseTree.DCaseNode = new DCaseTree.GoalNode("", "hogehoge", 1);
var child : DCaseTree.DCaseNode = new DCaseTree.StrategyNode("", "hogehoge", 1);

root.Children.push(child);

var testJson : any[] = [];
console.log(root.convertAllChildNodeIntoJson(testJson));
