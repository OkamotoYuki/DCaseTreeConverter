import DCaseTree = module("../DCaseTreeConverter/DCaseTree");

export function test() : void {
	var root : DCaseTree.DCaseNode = new DCaseTree.GoalNode("", "hogehoge", 1);
	var child : DCaseTree.DCaseNode = new DCaseTree.StrategyNode("", "hogehoge", 1);

	root.Children.push(child);
	root.dump();
}
test();
