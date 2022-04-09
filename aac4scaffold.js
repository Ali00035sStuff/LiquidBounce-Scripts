var scriptName = "Scaffold+";
var scriptAuthor = "Oreoezi";
var scriptVersion = 1.0;
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var Scaffold = moduleManager.getModule('Scaffold');
function ScaffoldPlus() {
	this.getName = function () {
		return "Scaffold+";
	}
	this.getDescription = function () {
		return "Scaffold made in fucking js";
	}
	this.getCategory = function () {
		return "Fun";
	}
	this.onUpdate = function () {
		if (mc.thePlayer.onGround) mc.timer.timerSpeed = 1.02;
		else mc.timer.timerSpeed = mc.thePlayer.motionY > 0 ? 1 : 2;
		if(Scaffold.getState()) {
			if(mc.thePlayer.movementInput.moveForward || mc.thePlayer.movementInput.moveStrafe){
				Scaffold.getValue('Rotations').set(false);
				DiffYaw = 0;
				if(mc.thePlayer.movementInput.moveForward > 0) DiffYaw = 180;
				if(mc.thePlayer.movementInput.moveForward < 0) DiffYaw = 0;
				RotationUtils.setTargetRotation(new Rotation(mc.thePlayer.rotationYaw + DiffYaw, 86));
				
			} else {
				Scaffold.getValue('Rotations').set(true);
			}
		}
	}
}

var scaffoldplus = new ScaffoldPlus();
var scaffoldplusclient;

function onEnable() {
	moduleManager.registerModule(scaffoldplus);
}

function onDisable() {
	moduleManager.unregisterModule(scaffoldplusclient);
}
