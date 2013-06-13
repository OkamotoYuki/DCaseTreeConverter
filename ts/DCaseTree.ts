export class DCaseNode {

	NodeType : string;
	Description : string;
	MetaData : any;
	ThisNodeId : number;
	Children : DCaseNode[];

	constructor(NodeType : string, Description : string, MetaData, ThisNodeId : number) {
		this.NodeType = NodeType;
		this.Description = Description;
		this.MetaData = MetaData;
		this.ThisNodeId = ThisNodeId;
		this.Children = [];
	}

	convertAllChildNodeIntoJson(jsonArray : any[]) : any[]{
		return [];
	}

	convertAllChildNodeIntoXml() : void {
	}

	convertAllChildNodeIntoMarkdown() : void {
	}

}

export class SolutionNode extends DCaseNode {

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Solution", Description, MetaData, ThisNodeId);
	}

}

export class ContextNode extends DCaseNode { // don't care

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Context", Description, MetaData, ThisNodeId);
	}

}

export class RebbutalNode extends DCaseNode { // don't care

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Context", Description, MetaData, ThisNodeId);
	}

}

export class ContextAddableNode extends DCaseNode {

	Context : ContextNode; // don't care

	constructor(NodeType : string, Description : string, MetaData, ThisNodeId : number) {
		super(NodeType, Description, MetaData, ThisNodeId);
	}

}

export class GoalNode extends ContextAddableNode {

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Goal", Description, MetaData, ThisNodeId);
	}

}

export class StrategyNode extends DCaseNode {

	constructor(Description : string, MetaData, ThisNodeId : number) {
		super("Strategy", Description, MetaData, ThisNodeId);
	}

}
