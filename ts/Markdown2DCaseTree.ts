import DCaseTree = module("DCaseTree");

function outputError(o : any) : void {
		console.log("error: " + o);
}

function splitByLines(text : string) : string[] {
	return text.split(/\r\n|\r|\n/g);
}

function isNumber(text : string) : bool {
	return /\d+/.test(text);
}

export class Converter {

	usedNodeIdList : number[] = [];
	currentNodeId : number = 0;

	constructor() {
	}

	isUsedNodeId(nodeId : number) : bool {
		for(var i : number = 0; i < this.usedNodeIdList.length; i++) {
			if(nodeId == this.usedNodeIdList[i]) {
				return true;
			}
		}
		return false;
	}

	initUsedNodeIdList(text : string) : void {
		var lines : string[] = splitByLines(text);

		for(var i : number = 0; i < lines.length; i++) {
			var nodeIdMacher : RegExp = /#+.+\s.+\s/g;
			nodeIdMacher.exec(lines[i]);
			if(nodeIdMacher.lastIndex > 0) {
				var nodeIdText : string = lines[i].substring(nodeIdMacher.lastIndex);
				if(!isNumber(nodeIdText)) {
					outputError("node id must be number");
				}
				var nodeId : number = parseInt(nodeIdText);
				if(!this.isUsedNodeId(nodeId)) {
					this.usedNodeIdList.push(nodeId);
				}
			}
		}
	}

	createNewNodeId() : number {
		while(true) {
			this.currentNodeId += 1;
			if(!this.isUsedNodeId(this.currentNodeId)) {
				return this.currentNodeId;
			}
		}
	}

	parseMetaData(text : string, node : DCaseTree.DCaseNode) : void {
		var lines : string[] = splitByLines(text);

		if(lines.length < 2) {
			outputError("node doesn't include enough data");
		}

		if(lines[0] != "") {
			var nodeIdMacher : RegExp = /\s.*\s/g;
			nodeIdMacher.exec(lines[0]);
			if(nodeIdMacher.lastIndex <= 0) {
				outputError("syntax is incorrect (nodeid)");
			}

			var nodeIdText = lines[0].substring(nodeIdMacher.lastIndex);
			if(!isNumber(nodeIdText)) {
				outputError("node id must be number");
			}
			var nodeId : number = parseInt(nodeIdText);
			node.ThisNodeId = nodeId;
		}
		node.Description = lines[1];

		if(lines.length == 2) {
			return;
		}

		// TODO handle other meta data
	}

	parseStrategy(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : void {
		if(parentNode == null) {
			outputError("strategy node must be child node");
		}

		var strategyMacher : RegExp = /#Strategy/g;
		strategyMacher.exec(text);
		text = text.substring(strategyMacher.lastIndex);

		var strategyNode : DCaseTree.StrategyNode = new DCaseTree.StrategyNode(null, null, null);
		var metaDataText = text.substring(0, text.indexOf("#"));
		var childBlock = text.substring(text.indexOf("#"));
		this.parseMetaData(metaDataText, strategyNode);
		if(strategyNode.ThisNodeId == null) {
			strategyNode.ThisNodeId = this.createNewNodeId();
		}
		parentNode.Children.push(strategyNode);

		this.parseGoal(childBlock, depth, strategyNode);
	}

	parseSolution(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : void {
		if(parentNode == null) {
			outputError("strategy node must be child node");
		}

		var solutionMacher : RegExp = /#Solution/g;
		solutionMacher.exec(text);
		var metaDataText : string = text.substring(solutionMacher.lastIndex);

		var solutionNode : DCaseTree.SolutionNode = new DCaseTree.SolutionNode(null, null, null);
		this.parseMetaData(metaDataText, solutionNode);
		if(solutionNode.ThisNodeId == null) {
			solutionNode.ThisNodeId = this.createNewNodeId();
		}
		parentNode.Children.push(solutionNode);
	}

	parseGoal(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : DCaseTree.DCaseNode[] {
		depth++;

		var goalNodes : DCaseTree.DCaseNode[] = [];

		var separator : RegExp = new RegExp("\n#{" + depth + "}Goal", "g");
		var goalBlocks = text.split(separator);
		var goalMacher : RegExp = /#+Goal/g;
		goalMacher.exec(goalBlocks[0]);
		goalBlocks[0] = goalBlocks[0].substring(goalMacher.lastIndex);

		for(var i : number = 0; i < goalBlocks.length; i++) {
			var goalNode : DCaseTree.GoalNode = new DCaseTree.GoalNode(null, null, null);
			var indexOfSharpChar : number = goalBlocks[i].indexOf("#");
			var metaDataText : string;
			var childBlock : string;

			if(indexOfSharpChar == -1) {
				metaDataText = goalBlocks[i];
				childBlock = null;
			}
			else {
				metaDataText = goalBlocks[i].substring(0, indexOfSharpChar);
				childBlock = goalBlocks[i].substring(indexOfSharpChar);
			}

			this.parseMetaData(metaDataText, goalNode);

			if(goalNode.ThisNodeId == null) {
				goalNode.ThisNodeId = this.createNewNodeId();
			}
			goalNodes.push(goalNode);

			if(childBlock == null) {
				continue;
			}
			else if(splitByLines(childBlock)[0].match("Strategy") != null) {
				this.parseStrategy(childBlock, depth, goalNode);
			}
			else if(splitByLines(childBlock)[0].match("Solution") != null) {
				this.parseSolution(childBlock, depth, goalNode);
			}
		}

		if(parentNode != null) {
			parentNode.Children = goalNodes;
		}

		return goalNodes;
	}

	parseMarkdown(markdownText : string) : DCaseTree.DCaseNode {
		this.initUsedNodeIdList(markdownText);
		var rootNode : DCaseTree.DCaseNode[] = this.parseGoal(markdownText, 0, null);

		if(rootNode.length != 1) {
			outputError("root node must be one node");
  		return null;
		}
		return rootNode[0];
	}

}
