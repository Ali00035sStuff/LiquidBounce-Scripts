//░█▀▀░█▀█░█▀█░█▀▀░█▀▀░█▀▄░
//░█░░░█▀█░█░█░█░░░█▀▀░█▀▄░
//░▀▀▀░▀░▀░▀░▀░▀▀▀░▀▀▀░▀░▀░
//░█▀█░█▀█░█▄█░█▀▀
//░█░█░█▀█░█░█░█▀▀
//░▀░▀░▀░▀░▀░▀░▀▀▀
var scriptName = "CubeFly";
var scriptVersion = 1.1;
var scriptAuthor = "cancername";

var Module = new Module();
var client;

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

var PlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')


function vClip(offset) {
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ);
}

function hClip(offset) {
    mc.thePlayer.setPosition(mc.thePlayer.posX - (Math.sin(Math.radians(mc.thePlayer.rotationYaw)) * offset), mc.thePlayer.posY, mc.thePlayer.posZ + (Math.cos(Math.radians(mc.thePlayer.rotationYaw)) * offset));
}


function hMotion(offset) {
    mc.thePlayer.motionX = parseFloat(Math.cos(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset)
    mc.thePlayer.motionZ = parseFloat(Math.sin(Math.radians(mc.thePlayer.rotationYaw + 90.0)) * offset)
}

function Module() {
    this.getName = function() {
        return "CustomCCFly";
    };

    this.getDescription = function() {
        return "An attempt at a customizable Cubecraft fly.\nExtremely simple, since it is Cubecraft.";
    };

    this.getCategory = function() {
       return "Movement";
    };

    var xa = value.createBoolean("DoFakeGround", false),
        xd = value.createBoolean("DoHMotion", false),
        xf = value.createBoolean("DoHClip", false),
        xg = value.createBoolean("DoVClip", false),
        xj = value.createBoolean("DoBounceTimer", false),
        xl = value.createBoolean("DoFallTimer", false),

        xb = value.createFloat("BlocksToFall", 1.7, .05, 5),
        xc = value.createFloat("YMotion", .15, -1, 1),
        xe = value.createFloat("HMotion", .2, 0, 1),
        xh = value.createFloat("HClipLength", 1, 0, 9),
        xi = value.createFloat("VClipLength", 1, 0, 9),
        xk = value.createFloat("FallTimerSpeed", 1, 0.1, 5),
        xm = value.createFloat("JumpTimerSpeed", 1, 0.1, 5),
        xn = value.createInteger("Limit", 2, 1, 40);



    this.addValues = function(v) {
        v.add(xa);
        v.add(xb);
        v.add(xc);
        v.add(xd);
        v.add(xe);
        v.add(xf);
        v.add(xg);
        v.add(xh);
        v.add(xi);
        v.add(xj);
        v.add(xk);
        v.add(xl);
        v.add(xm);
        v.add(xn);
    }

    
    this.onUpdate = function() {
        if (mc.thePlayer.onGround) limit = xn.get();
        if (xl.get() && !mc.thePlayer.onGround) mc.timer.timerSpeed = xk.get();


        if (mc.thePlayer.fallDistance >= xb.get() && limit > 0) {
            if (xj.get()) mc.timer.timerSpeed = xm.get();

            mc.thePlayer.motionY = xc.get();

            if (xa.get()) mc.thePlayer.sendQueue.addToSendQueue(new PlayerPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, true));
            if (xd.get()) hMotion(xe.get());
            if (xf.get()) hClip(xh.get());
            if (xg.get()) vClip(xi.get());
            mc.thePlayer.fallDistance = 0;
            limit--;
        } else if (xj.get() && !xl.get() || mc.thePlayer.onGround) mc.timer.timerSpeed = 1;
        if (xl.get() && !xj.get() && !mc.thePlayer.onGround) mc.timer.timerSpeed = xk.get();
    }
    this.onDisable = function() {
        mc.timer.timerSpeed = 1;

    }



}

function onLoad() {
    var limit = xn.get();
}

function onEnable() {
    client = moduleManager.registerModule(Module);
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
