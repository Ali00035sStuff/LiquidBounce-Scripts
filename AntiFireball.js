var scriptName = "AntiFireball";
var scriptVersion = 1.0;
var scriptAuthor = "york";
var EntityLiving = Java.type('net.minecraft.entity.EntityLivingBase');
var EntityFireball = Java.type('net.minecraft.entity.projectile.EntityLargeFireball');
var C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
var MSTimer = Java.type('net.ccbluex.liquidbounce.utils.timer.MSTimer');

function AntiFireball() {
    this.getName = function() {
        return "AntiFireball";
    };

    this.getDescription = function() {
        return "Anti Fireball";
    };

    this.getCategory = function() {
        return "Misc";
    };
    var TimerF = new MSTimer();
    this.onMotion = function() {
        for (var x in mc.theWorld.loadedEntityList) {
            var entities = mc.theWorld.loadedEntityList[x];
            if (entities != null && entities instanceof EntityFireball && mc.thePlayer.getDistanceToEntity(entities) < 5.5 && (TimerF.hasTimePassed(100) || lastEntity != entities)) {
                lastEntity = entities;
                mc.thePlayer.sendQueue.addToSendQueue(new C02PacketUseEntity(entities, C02PacketUseEntity.Action.ATTACK));
                TimerF.reset();
            }
        }
    }
    this.onEnable = function() {
        lastEntity = "";
    }
}
var AntiFireball = new AntiFireball();
var AntiFireballClient;

function onEnable() {
    AntiFireballClient = moduleManager.registerModule(AntiFireball);
};

function onDisable() {
    moduleManager.unregisterModule(AntiFireballClient);
};
