/* globals apex,$ */
window.HIERARCHYCHART = window.HIERARCHYCHART || {};

//Initialize Hierarchy Chart
HIERARCHYCHART.initialize = function(config,pData,init) {

    //Init variables
    var data                = JSON.parse(pData);
    var hierarchyChart      = new d3.OrgChart();
    var partialLoadEnabled  = (config.partialLoad === 'Y');

    //Init config
    //if (init && typeof init == 'function') HIERARCHYCHART.overwriteMethod(hierarchyChart,init);

    //Render chart
    if (partialLoadEnabled) hierarchyChart.initialExpandLevel(config.initialExpandLevel);
    
    hierarchyChart.nodeContent(function (d,i,arr,state) {return HIERARCHYCHART.convertToTemplateLiteral(config.nodeTemplate,d.data);})
                  .buttonContent(({ node, state }) =>  {return HIERARCHYCHART.convertToTemplateLiteral(config.nodeButtonTemplate,node.data);})
                  .onExpandOrCollapse((d) => {
                                            var existingNodes = hierarchyChart.getChartState().allNodes;
                                            
                                            if (d.children && HIERARCHYCHART.checkNodeExist(existingNodes,d.children)) {

                                                if (partialLoadEnabled) {
                                                    
                                                    var promise = HIERARCHYCHART.getNewNodes(d,config.ajaxIdentifier);                                                    
                                                    
                                                    Promise.all([promise]).then(function(data) {
                                                        var dataNodes = JSON.parse(data[0].newNodes);
                                                        
                                                        for (const newNodes of dataNodes) {
                                                            hierarchyChart.addNode(newNodes);
                                                        };

                                                        hierarchyChart.render();
                                                    });
                                                }
                                            }
                                        }
                                     )
                  .container('#' + config.regionId)
                  .data(data)
                  .nodeWidth((node) => parseInt(config.nodeWidth))
                  .nodeHeight((node) => parseInt(config.nodeHeight))
                  .render();

    //Create apex.region interface
    HIERARCHYCHART.createHierarchyChartRegion(config.regionId,hierarchyChart);

};

//Converting the enquoted HTML string into a template literal
HIERARCHYCHART.convertToTemplateLiteral = function(template, variables, fallback) {
  const regex = /\${[^{]+}/g;
  return template.replace(regex, (match) => {
        const path = match.slice(2, -1).trim();
        return HIERARCHYCHART.getObjPath(path, variables, fallback);
        });
};

//Helper function for converting enqouted HTML strings into template literals
HIERARCHYCHART.getObjPath = function(path, obj, fallback = '') {
    return path.split('.').reduce((res, key) => res[key] || fallback, obj);
};

//Callback function for adding new nodes into the hierarchy
HIERARCHYCHART.getNewNodes = function(pData, pAjaxIdentifier) {

    //Initialize variables
    var processedData = {parentNodes: []};

    //Push Parent Node Ids into the variables  
    for (const parentNodeIds of pData.children) {
        processedData.parentNodes.push(parentNodeIds.data.id);
    };

    //Ajax
    return apex.server.plugin ( pAjaxIdentifier, {
            x01: JSON.stringify(processedData)
        },
        {
        success: function( data )  {
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            apex.message.alert(jqXHR.responseJSON.message);
        }
    });
};

//Check if node exist
HIERARCHYCHART.checkNodeExist = function(pDataState,pDataNode) {

    var directDescendantsOfDataNode = [];

    //get all direct children of the expanded node
    for (const directNodes of pDataNode) {
        directDescendantsOfDataNode.push(directNodes.data.id);
    };

    //Check if indirect descendants of ascendants have any existing _children in the current state
    return pDataState.filter(node => (node.parent != null && 
                                      directDescendantsOfDataNode.includes(node.id) && 
                                      typeof(node._children) != "undefined")
                            ).length === 0;

}

//Overwrite object functions that were defined from the Initialization Javascript Code attribute
HIERARCHYCHART.overwriteMethod = function(object, initCode) {
    var overWrittenFunctions = {};
    
    initCode.call(this,overWrittenFunctions);

    Object.keys(overWrittenFunctions).forEach(function (item) {
        object[item] = overWrittenFunctions[item];
    });
};

//Initialize Hierarchy Chart apex.region Interface
HIERARCHYCHART.createHierarchyChartRegion = function(pRegionId,pChartObject) {
    apex.region.create( pRegionId, {
        type: "apex-region-hierarchy-chart",
        refresh: function() {
            pChartObject.render();
        }
    });
}