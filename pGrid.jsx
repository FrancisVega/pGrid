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

    photoshop.prototype.getLayers = function() {
        this.doc = app.activeDocument;
        this.firstLayer = this.doc.layers[0];
        this.gridGroup = this.doc.layerSets.getByName(GRIDNAME);
    }

    photoshop.prototype.anyDocOpen = function() {
        if(app.documents.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    photoshop.prototype.gridLayerExists = function() {
        try {
            this.app.activeDocument.layers[GRIDNAME];
            return true
        } catch(e) {
            return false
        }
    }

    photoshop.prototype.sendLayerToTop = function(layer) {
        // Move 'layer' before the first layer in doc
        layer.move(this.firstLayer, ElementPlacement.PLACEBEFORE);
    }

    photoshop.prototype.switchVisible = function() {
        if(this.gridGroup.visible) {
            this.gridGroup.visible = false;
        } else {
            this.gridGroup.visible = true;
        }
    }

    photoshop.prototype.sendGridLayerToTop = function() {
        psd.sendLayerToTop(psd.gridGroup)
    }

    // Main
    var psd = new photoshop();

    if (psd.anyDocOpen()) {
        if(psd.gridLayerExists()) {
            psd.getLayers();
            psd.sendGridLayerToTop();
            psd.switchVisible();
        } else {
            alert("No existe el Grupo con el nombre: " + GRIDNAME)
        }
    } else {
        alert("No hay docs abiertos")
    }

})();
