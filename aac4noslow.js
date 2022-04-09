var scriptName = "AAC4NoSlow"; 
var scriptVersion = 1.0;
var scriptAuthor = "Oreoezi"; 
var C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");
function AAC4NoSlow() {
    this.getName = function() {
        return "AAC4NoSlow";
    };
    this.getDescription = function() {
        return "Timer AAC NoSlow";
    };
    this.getCategory = function() {
        return "Fun";
    };
    this.onPacket = function(event) {	
    }
    this.onUpdate = function() { 
	if (mc.thePlayer.getItemInUseDuration() > 0) {
		if (mc.thePlayer.onGround) {
			mc.getNetHandler().addToSendQueue(new C0BPacketEntityAction(mc.thePlayer, C0BPacketEntityAction.Action.STOP_SPRINTING));
			mc.timer.timerSpeed = 1.06;
			var mult = mc.thePlayer.movementInput.moveStrafe ? 1.3 : 1.45;
			mc.thePlayer.motionX *= mult;
			mc.thePlayer.motionZ *= mult;
			mc.getNetHandler().addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()));
		}
		else {
			mc.timer.timerSpeed = 1.02;
		}
	}
	else mc.timer.timerSpeed = 1;
	
    };
    this.onEnable = function () {
    };
    this.onDisable = function() {
	mc.thePlayer.speedInAir = 0.02;
	mc.timer.timerSpeed = 1;
    };
}

var aac4noslow = new AAC4NoSlow();
var aac4noslowClient;
function onEnable() {
    moduleManager.registerModule(aac4noslow);
};

function onDisable() {
    moduleManager.unregisterModule(aac4noslowClient);
};

