///<reference path='../d.ts/DefinitelyTyped/jquery/jquery.d.ts'/>
import $ = module("jquery");
import DCaseTree = module("DCaseTree");

function outputError(o : any) : void {
		console.log("error: " + o);
}

class DCaseLink {

	source : string;
	target : string;

	constructor(source : string, target : string) {
		this.source = source;
		this.target = target;
	}

}

export class Converter {

	DCaseName : string;
	nodes : any = {};
	links : any = {};
	nodeIdMap : any = {}; // node whose id is '0' is the root node
	NodeCount : number = 0;
	rootNodeIdText : string;

	constructor() {
	}

	addNodeIdToMap(IdText : string) : void {
		if(!(IdText in this.nodeIdMap)) {
			if(this.NodeCount == 0) {
				this.rootNodeIdText = IdText;
			}

			this.nodeIdMap[IdText] = this.NodeCount;
			this.NodeCount += 1;
		}
	}

	parseXml(xmlText : string) : DCaseTree.TopGoalNode {
		var self : Converter = this;

		$(xmlText).find("rootBasicNode").each(function(index : any, elem : Element) : JQuery {
			var xsiType : string = $(this).attr("xsi\:type");

			if(xsiType.split(":").length != 2) {
				outputError("attr 'xsi:type' is incorrect format");
			}

			var NodeType : string = xsiType.split(":")[1];
			var IdText : string = $(this).attr("id");
			var Description : string = $(this).attr("desc");
			var NodeName : string = $(this).attr("name");

			self.addNodeIdToMap(IdText);

			var node : DCaseTree.DCaseNode = new DCaseTree[NodeType + "Node"](Description, null, self.nodeIdMap[IdText]);
			node.NodeName = NodeName;
			self.nodes[IdText] = node;

			return null;
		});

		$(xmlText).find("rootBasicLink").each(function(index : any, elem : Element) : JQuery {
			var IdText : any = $(this).attr("id");
			var source : string = $(this).attr("source").substring(1); // #abc -> abc
			var target : string = $(this).attr("target").substring(1); // #abc -> abc

			var link : DCaseLink = new DCaseLink(source, target);

			self.links[IdText] = link;

			return null;
		});

		for(var IdText in this.links) {
			var link : DCaseLink = this.links[IdText];
			var sourceNode : DCaseTree.DCaseNode = this.nodes[link.source];
			var targetNode : DCaseTree.DCaseNode = this.nodes[link.target];
			targetNode.Children.push(sourceNode); // FIXME direction of target <-> source?
			// TODO support context node
		}

		return <DCaseTree.TopGoalNode>this.nodes[this.rootNodeIdText];
	}

}
