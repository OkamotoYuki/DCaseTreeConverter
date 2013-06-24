import DCaseTree = module("DCaseTree");
import Json2DCaseTree = module("Json2DCaseTree");

export function test() : void {
	var test : any = {
			"DCaseName" : "test",
			"NodeCount" : 8,
			"TopGoalId" : 1,
			"NodeList": [
				{
					"Children": [
						2
					],
					"Description": "G",
					"NodeType": "Goal",
					"Id": 1,
					"MetaData" : []
				},
				{
					"Children": [
						3,
						4
					],
					"Contexts": [
						9
					],
					"Description": "Alternative",
					"NodeType": "Strategy",
					"Id": 2,
					"MetaData" : []
				},
				{
					"Children": [
						5
					],
					"Description": "G",
					"NodeType": "Goal",
					"Id": 3,
					"MetaData" : []
				},
				{
					"Children": [
						6,
						7
					],
					"Description": "s",
					"NodeType": "Strategy",
					"Id": 5,
					"MetaData" : []
				},
				{
					"Children": [],
					"Description": "t1",
					"NodeType": "Goal",
					"Id": 6,
					"MetaData" : []
				},
				{
					"Children": [
						8
					],
					"Description": "D-script",
					"NodeType": "Goal",
					"Id": 7,
					"MetaData" : []
				},
				{
					"Children": [],
					"Description": "x",
					"NodeType": "Solution",
					"Id": 8,
					"MetaData" : []
				},
				{
					"Children": [],
					"Description": "t2",
					"NodeType": "Goal",
					"Id": 4,
					"MetaData" : []
				},
				{
					"Children": [],
					"Description": "C",
					"NodeType": "Context",
					"Id": 9,
					"MetaData" : []
				}
			]
	}

	var j2dc : Json2DCaseTree.Converter = new Json2DCaseTree.Converter();
	var root : DCaseTree.TopGoalNode = j2dc.parseJson(test);

	root.convertAllChildNodeIntoMarkdown(0, 0);
}
test();
