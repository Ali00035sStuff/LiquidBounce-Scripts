var scriptName = "NoRender";
var scriptAuthor = "By Virus";
var scriptVersion = 1.0;

var EntityItem = Java.type('net.minecraft.entity.item.EntityItem'); 

function NoRenderModule() {
    this.getName = function() {
        return "NoRender";
    }
    this.getDescription = function() {
        return "Removes dropped items to avoid lag.";
    }
    this.getCategory = function() {
        return "Render"; 
    }
    this.onPacket = function () {
        for (var a in mc.theWorld.loadedEntityList) {
            var entities = mc.theWorld.loadedEntityList[a];
            if(entities instanceof EntityItem) {
                entities.renderDistanceWeight = 0.0;
            }
        }
     
    }
    this.onDisable = function() {
        for (var a in mc.theWorld.loadedEntityList) {
            var entities = mc.theWorld.loadedEntityList[a];
            if(entities instanceof EntityItem) {
                entities.renderDistanceWeight = 1.0;
            }
        }       
    }
    
}
var norenderModule = new NoRenderModule();
var norenderModuleClient;

function onLoad() {}

function onEnable() {
    norenderModuleClient = moduleManager.registerModule(norenderModule);
}

function onDisable() {
    moduleManager.unregisterModule(norenderModuleClient);
}
