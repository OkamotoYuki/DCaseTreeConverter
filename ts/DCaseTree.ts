export class DCaseNode {

	NodeType : string;
	Description : string;
	MetaData : any;
	Children : {[index:number]:DCaseNode;};

	constructor(NodeType : string, Description : string, MetaData) {
		this.NodeType = NodeType;
		this.Description = Description;
		this.MetaData = MetaData;
		this.Children = <any>[];
	}

	toJson() {
	}

	toXml() {
	}

	toMarkdown() {
	}
}

export class GoalNode extends DCaseNode {

	constructor(Description : string, MetaData) {
		super("Goal", Description, MetaData);
	}

}

export class StrategyNode extends DCaseNode {

	constructor(Description : string, MetaData) {
		super("Strategy", Description, MetaData);
	}

}

export class SolutionNode extends DCaseNode {

	constructor(Description : string, MetaData) {
		super("Solution", Description, MetaData);
	}

}

export class ContextNode extends DCaseNode {

	constructor(Description : string, MetaData) {
		super("Context", Description, MetaData);
	}

}
