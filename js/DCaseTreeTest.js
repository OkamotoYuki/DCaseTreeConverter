var DCaseTree = require("./DCaseTree")
function test() {
    var root = new DCaseTree.GoalNode("", "hogehoge", 1);
    var child = new DCaseTree.StrategyNode("", "hogehoge", 1);
    root.Children.push(child);
    root.dump();
}
exports.test = test;
