var scriptName = "AAC4Jesus"; 
var scriptVersion = 1.0;
var scriptAuthor = "Oreoezi"; 
function AAC4Jesus() {
    this.getName = function() {
        return "AAC4LiquidWalk";
    };

    this.getDescription = function() {
        return "AAC4Jesus";
    };
	
    this.getCategory = function() {
        return "Fun";
    };
    this.onDisable = function() {
	mc.timer.timerSpeed = 1;
	mc.thePlayer.speedInAir = 0.02;
    }
    this.onPacket = function(event) {

    };
    this.onUpdate = function() {
		if(mc.thePlayer.isInWater()) {
			mc.thePlayer.motionY = 0;
			mc.thePlayer.motionX *= 1.1;
			mc.thePlayer.motionZ *= 1.1;
		}
		else mc.timer.timerSpeed = 1;
    };
}

var aac4jesus = new AAC4Jesus();
var aac4jesusClient;
function onEnable() {
    moduleManager.registerModule(aac4jesus);
};

function onDisable() {
    moduleManager.unregisterModule(aac4jesusClient);
};
