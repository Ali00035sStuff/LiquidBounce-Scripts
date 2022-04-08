var scriptName = "TPAura"; // The name of your script
var scriptVersion = 0.1; // The version of your script 
var scriptAuthor = "6Sence"; // The author of your script

var TPAura = new TPAura();
var Test3Client;

Killaura = moduleManager.getModule("Killaura");

highJump = moduleManager.getModule("HighJump");
BlockPos = Java.type('net.minecraft.util.BlockPos')
BlockAir = Java.type('net.minecraft.block.BlockAir')
EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer")
player = Java.type("net.minecraft.entity.Entity")
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
var packet;

//Function by Scorpion3013
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
	function getClosestEntity(){
	var filteredEntites = []
	for (var i in mc.theWorld.loadedEntityList){
		var entity = mc.theWorld.loadedEntityList[i]

		if (entity instanceof EntityPlayer && entity !=mc.thePlayer){
			filteredEntites.push(entity)
		}
	}
	filteredEntites.sort(function(a, b){
		var distanceA = mc.thePlayer.getDistanceToEntity(a)
		var distanceB = mc.thePlayer.getDistanceToEntity(b)

		return distanceB - distanceA;
	})
	return filteredEntites[filteredEntites.length - 1]
}
function TPAura() {
    this.getName = function() {
        return "TPAura";
    };

    this.getDescription = function() {
        return "TPAura";
    };

    this.getCategory = function() {
        return "Misc";
    };
    this.onUpdate = function() {
	
	afterTick += 1;	
	var player = getClosestEntity();
	mc.thePlayer.onGround = true;
	
	if (afterTick == 1){
		
		OPosX = mc.thePlayer.posX;
		OPosY = mc.thePlayer.posY;
		OPosZ = mc.thePlayer.posZ;
		
		middleX = mc.thePlayer.posX + player.posX;
		middleY = mc.thePlayer.posY + player.posY;
		middleZ = mc.thePlayer.posZ + player.posZ;
		
		middleX2 = middleX / 2;
		middleY2 = middleY / 2;
		middleZ2 = middleZ / 2;	
		
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(middleX2, middleY2 + 1, middleZ2,true));		
	}	
	
	if (afterTick == 2){
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(player.posX, player.posY, player.posZ,true));
		mc.thePlayer.swingItem();
		mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(player, C02PacketUseEntity.Action.ATTACK));
		mc.thePlayer.motionY = 0;	
	}
	
	if (afterTick == 3){
		mc.thePlayer.sendQueue.addToSendQueue(new C04PacketPlayerPosition(middleX2, middleY2 + 1, middleZ2,true));
		afterTick = 0;
	}	
	
	}
	this.onDisable = function() {
        //Activates on disabling module
	    mc.timer.timerSpeed = 1.0;		   
        }
 	this.onEnable = function() {
		//Activates on Enabling module
		afterTick = 0;	
        }
 }
function onLoad() {
    // Currently this event has to be in every script even if it is not directly needed.
};

function onEnable() {
    Test3Client = moduleManager.registerModule(TPAura);
};
function onDisable() {
    moduleManager.unregisterModule(Test3Client);
};
