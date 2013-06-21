import DCaseTree = module("DCaseTree");

export function test() : void {
	var root : DCaseTree.DCaseNode = new DCaseTree.GoalNode("", "hogehoge", 1);
	var child1 : DCaseTree.DCaseNode = new DCaseTree.StrategyNode("", "hogehoge", 1);
	var child2 : DCaseTree.DCaseNode = new DCaseTree.StrategyNode("", "hogehoge", 2);
	var child3: DCaseTree.DCaseNode = new DCaseTree.GoalNode("", "hogehoge", 3);
	var child4: DCaseTree.DCaseNode = new DCaseTree.GoalNode("", "hogehoge", 4);
	var child5: DCaseTree.DCaseNode = new DCaseTree.StrategyNode("", "hogehoge", 5);
	var child6: DCaseTree.DCaseNode = new DCaseTree.StrategyNode("", "hogehoge", 6);
	var child7: DCaseTree.DCaseNode = new DCaseTree.GoalNode("", "hogehoge", 7);
	var child8: DCaseTree.DCaseNode = new DCaseTree.GoalNode("", "hogehoge", 8);


	root.Children.push(child1);
	root.Children.push(child2);

	child1.Children.push(child3);
	child2.Children.push(child4);

	child4.Children.push(child5);
	child4.Children.push(child6);

	child5.Children.push(child7);
	child6.Children.push(child8);

	console.log(root.convertAllChildNodeIntoJson([]));
}
