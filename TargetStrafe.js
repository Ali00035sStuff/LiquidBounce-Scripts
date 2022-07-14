///api_version=2
var KillAura = Java.type("net.ccbluex.liquidbounce.LiquidBounce").moduleManager.getModule(Java.type("net.ccbluex.liquidbounce.features.module.modules.combat.KillAura").class);
(script = registerScript({
    name: "TargetStrafe",
    version: "1.7",
    authors: ["CzechHek - some stuff PlumerMan"]
})).import("Core.lib");

list = [
    range = value.createFloat("Distance", 3, 0.5, 8),
    speed = value.createFloat("Speed", 0.28, 0.1, 1),
    fov = value.createInteger("FOV", 180, 30, 180),
    cspeed = value.createBoolean("Custom Speed", false),
    onmove = value.createBoolean("OnMove", true),
    autojump = value.createBoolean("AutoJump", true)
    
]

module = {
    category: "Movement",
    values: list,
    onMove: function (e) {
        strafing = false;
        time++;
        if(KillAura.target != null) time = 0
        if (time < 3 && (mc.gameSettings.keyBindForward.pressed || !onmove.get()) && !mc.gameSettings.keyBindSneak.pressed && !mc.thePlayer.moveStrafing) {
            if(KillAura.target != null) target = KillAura.target;
            var movespeed = Math.sqrt(mc.thePlayer.motionX * mc.thePlayer.motionX + mc.thePlayer.motionZ * mc.thePlayer.motionZ);;
            if(cspeed.get()) movespeed = speed.get();
            distance = Math.sqrt(Math.pow(mc.thePlayer.posX - target.posX, 2) + Math.pow(mc.thePlayer.posZ - target.posZ, 2))
            strafeYaw = Math.atan2(target.posZ - mc.thePlayer.posZ, target.posX - mc.thePlayer.posX);
            yaw = strafeYaw - (0.5 * Math.PI);
            predict = [target.posX + (2 * (target.posX - target.lastTickPosX)), target.posZ + (2 * (target.posZ - target.lastTickPosZ))];

            if ((distance - movespeed) > range.get() || Math.abs(((((yaw * 180 / Math.PI - mc.thePlayer.rotationYaw) % 360) + 540) % 360) - 180) > fov.get() || !isAboveGround(predict[0], target.posY, predict[1])) return
            
            encirclement = distance - range.get() < -movespeed ? -movespeed : distance - range.get();
            encirclementX = -Math.sin(yaw) * encirclement;
            encirclementZ = Math.cos(yaw) * encirclement;
            strafeX = -Math.sin(strafeYaw) * movespeed * direction;
            strafeZ = Math.cos(strafeYaw) * movespeed * direction;

            mc.thePlayer.onGround && (!isAboveGround(mc.thePlayer.posX + encirclementX + (2 * strafeX), mc.thePlayer.posY, mc.thePlayer.posZ + encirclementZ + (2 * strafeZ)) || mc.thePlayer.isCollidedHorizontally) && (direction *= -1, strafeX *= -1, strafeZ *= -1);

            e.setX(encirclementX + strafeX);
            e.setZ(encirclementZ + strafeZ);
            strafing = true;
        }
    },
    onUpdate: function () {
        strafing && mc.thePlayer.onGround && autojump.get() && mc.thePlayer.jump();
    }
}

direction = 1; strafing = false; time = 0;

function isAboveGround(x, y, z) {
    for (i = Math.ceil(y); (y - 5) < i--;) if (!mc.theWorld.isAirBlock(new BlockPos(x, i, z))) return true
}
