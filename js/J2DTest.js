
var Json2DCaseTree = require("./Json2DCaseTree")
var test = {
    "DCaseName": "test",
    "NodeCount": 8,
    "TopGoalId": 1,
    "NodeList": [
        {
            "Children": [
                2
            ],
            "Description": "G",
            "NodeType": "Goal",
            "ThisNodeId": 1,
            "MetaData": []
        }, 
        {
            "Children": [
                3, 
                4
            ],
            "Description": "Alternative",
            "NodeType": "Strategy",
            "ThisNodeId": 2,
            "MetaData": []
        }, 
        {
            "Children": [
                5
            ],
            "Description": "G",
            "NodeType": "Goal",
            "ThisNodeId": 3,
            "MetaData": []
        }, 
        {
            "Children": [
                6, 
                7
            ],
            "Description": "s",
            "NodeType": "Strategy",
            "ThisNodeId": 5,
            "MetaData": []
        }, 
        {
            "Children": [],
            "Description": "t1",
            "NodeType": "Goal",
            "ThisNodeId": 6,
            "MetaData": []
        }, 
        {
            "Children": [
                8
            ],
            "Description": "D-script",
            "NodeType": "Goal",
            "ThisNodeId": 7,
            "MetaData": []
        }, 
        {
            "Children": [],
            "Description": "x",
            "NodeType": "Solution",
            "ThisNodeId": 8,
            "MetaData": []
        }, 
        {
            "Children": [],
            "Description": "t2",
            "NodeType": "Goal",
            "ThisNodeId": 4,
            "MetaData": []
        }
    ]
};
var j2dc = new Json2DCaseTree.Converter();
var root = j2dc.parseJson(test);
root.dump();
