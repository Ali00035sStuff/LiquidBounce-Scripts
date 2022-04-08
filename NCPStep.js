var scriptName = "NCPStep";
var scriptVersion = 1.0;
var scriptAuthor = "york";
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')

function NCPStep() {
    var StepHeight = value.createFloat("StepHeight", 2.5, 1, 2.5);
    this.addValues = function(values) {
        values.add(StepHeight);
    };
	this.getTag = function() {
		return "" + (Math.round(StepHeight.get() * 100) / 100);
	};
    this.getName = function() {
        return "NCPStep";
    };

    this.getDescription = function() {
        return "Step for NCP";
    };

    this.getCategory = function() {
        return "Movement";
    };
    this.onEnable = function() {
        groundtick = false;
    };
    this.onUpdate = function() {
        if (groundtick && !mc.thePlayer.isOnLadder() && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isInLava()) {
            mc.thePlayer.stepHeight = StepHeight.get();
        } else if (groundtick && !mc.thePlayer.isInWeb) {
            mc.thePlayer.stepHeight = 1.0;
        } else {
            mc.thePlayer.stepHeight = 0.6;
        }
        groundtick = (mc.thePlayer.onGround && mc.thePlayer.isCollidedVertically);
    };
    this.onDisable = function() {
        mc.thePlayer.stepHeight = 0.6;
    };
    this.onStepConfirm = function(event) {
        rheight = mc.thePlayer.getEntityBoundingBox().minY - mc.thePlayer.posY;
        switch (true) {
            case (rheight > 2.019):
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.425, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.821, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.699, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.599, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.022, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.372, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.652, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.869, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 2.019, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.919, mc.thePlayer.posZ, false));
                mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
                break;
            case (rheight > 1.869):
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.425, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.821, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.699, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.599, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.022, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.372, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.652, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.869, mc.thePlayer.posZ, false));
                mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
                break;
            case (rheight > 1.5):
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.425, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.821, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.699, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.599, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.022, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.372, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.652, mc.thePlayer.posZ, false));
                mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
                break;
            case (rheight > 1.015):
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.42, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.7532, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.01, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.093, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 1.015, mc.thePlayer.posZ, false));
                mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
                break;
            case (rheight > 0.875):
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.41999998688698, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.7531999805212, mc.thePlayer.posZ, false));
                break;
            case (rheight > 0.6):
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.39, mc.thePlayer.posZ, false));
                mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.6938, mc.thePlayer.posZ, false));
                break;
        }
    };
};
var NCPStep = new NCPStep();
var NCPStepClient;

function onEnable() {
    NCPStepClient = moduleManager.registerModule(NCPStep);
};

function onDisable() {
    moduleManager.unregisterModule(NCPStepClient);
};
