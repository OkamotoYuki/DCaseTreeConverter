import DCaseTree = module("DCaseTree");

function splitByLines(text : string) : string[] {
	return text.split(/\r\n|\r|\n/g);
}

function isNumber(text : string) : bool {
	return /\d+/.test(text);
}

export class Converter {

	rootNode : DCaseTree.DCaseNode = null;
	usedNodeIdList : number[] = [];
	currentNodeId : number = 0;

	constructor() {
	}

	outputError(o : any) : void {
		console.log("error: " + o);
	}

	isUsedNodeId(nodeId : number) : bool {
		for(var i : number = 0; i < this.usedNodeIdList.length; i++) {
			if(nodeId == this.usedNodeIdList[i]) {
				return true;
			}
		}
		return false;
	}

	createUsedNodeIdList(text : string) : void {
		var lines : string[] = splitByLines(text);
		for(var i : number = 0; i < lines.length; i++) {
			var re : RegExp = /#+.+\s.+\s/g;
			re.exec(lines[i]);
			if(re.lastIndex > 0) {
				var nodeIdText : string = lines[i].substring(re.lastIndex);
				if(!isNumber(nodeIdText)) {
					this.outputError("node id must be number");
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
	}

	parseStrategy(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : void {
	}

	parseSolution(text : string, depth : number, parentNode : DCaseTree.DCaseNode) : void {
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
			parentNode.Children.concat(goalNodes);
		}

		return goalNodes;
	}

	parseMarkdown(markdownText : string) : DCaseTree.DCaseNode {
		this.createUsedNodeIdList(markdownText);
		var rootNode : DCaseTree.DCaseNode[] = this.parseGoal(markdownText, 0, null);

		if(rootNode.length != 1) {
			this.outputError("root node must be one node");
  		return null;
		}
		return rootNode[0];
	}

}
