// pGrid
// Part of Mêlée Workflow Tools
//
// twitter: @francis_vega
// web: www.inartx.com

// CS2 and higher
#target photoshop

// Hey, wake up!
app.bringToFront();


(function(){

    var GRIDNAME = 'grid';

    var photoshop = function() {
        this.app = app;
    }

    // Get doc and layers
    photoshop.prototype.getLayers = function() {
        this.doc = app.activeDocument;
        this.firstLayer = this.doc.layers[0];
        this.gridGroup = this.doc.layerSets.getByName(GRIDNAME);
    }

    // Check if there any doc has opened
    photoshop.prototype.anyDocOpen = function() {
        if(this.app.documents.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    // Check if 'grid' layer exists
    photoshop.prototype.gridLayerExists = function() {
        try {
            this.app.activeDocument.layers[GRIDNAME];
            return true
        } catch(e) {
            return false
        }
    }

    // Send a layer or group to the top of hierarchy
    photoshop.prototype.sendLayerToTop = function(layer) {
        // Move 'layer' before the first layer in doc
        layer.move(this.firstLayer, ElementPlacement.PLACEBEFORE);
    }

    // Switch on/off visible
    photoshop.prototype.switchVisible = function() {
        if(this.gridGroup.visible) {
            this.gridGroup.visible = false;
        } else {
            this.gridGroup.visible = true;
        }
    }

    // Send 'grid' layer to the top of hierarchy
    photoshop.prototype.sendGridLayerToTop = function() {
        psd.sendLayerToTop(this.gridGroup)
    }

    // Main
    var psd = new photoshop();

    if (psd.anyDocOpen()) {
        if(psd.gridLayerExists()) {
            psd.getLayers();
            psd.sendGridLayerToTop();
            psd.switchVisible();
        } else {
            alert("Creaet a group called '" + GRIDNAME + "'")
        }
    }

})();
