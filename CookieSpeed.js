var scriptName = "CookieSpeed";
var scriptVersion = 1.6;
var scriptAuthor = "Cookie & mumy++";

var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");

function CookieSpeed() {

    var setting = {
        float: function (name, def, min, max) {
            return value.createFloat(name, def, min, max);
        },
        integer: function (name, def, min, max) {
            return value.createInteger(name, def, min, max);
        },
        boolean: function (name, def) {
            return value.createBoolean(name, def);
        },
        list: function (name, values, def) {
            return value.createList(name, values, def);
        }
    };

    var settings = {
        mode: setting.list("Mode", ["AutoJump", "Hypixel", "CubeCraftHop", "MinePlexHop", "AAC5", "NCPHop", "VerusHop", "Taka"].sort(), "AutoJump"),
        aacTimer: setting.boolean("AACTimer", false),
        aacTimerSpeed: setting.float("AACTimerSpeed", 1, 0, 2),
        aacSlowFall: setting.boolean("AACSlowFall", false)
    };

    var prevMode;

    this.getName = function () {
        return "CookieSpeed";
    }

    this.getDescription = function () {
        return "CookieSpeed-Module,by-Cookie&mumy++";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        reset();
    }

    this.onUpdate = function() {
        if (prevMode !== (prevMode = settings.mode.get())) {
            reset();
        } switch (settings.mode.get().toLowerCase()) {
            case "autojump":
                if (!isMoving()) {
                    reset();
                    break;
                } if (canJump()) {
                    if (settings.aacTimer.get()) {
                        mc.timer.timerSpeed = settings.aacTimerSpeed.get();
                        mc.thePlayer.motionX *= 1.0708;
                        mc.thePlayer.motionZ *= 1.0708;
                    }
                    mc.thePlayer.jump();
                } else if (mc.thePlayer.fallDistance > 0 && mc.thePlayer.fallDistance < 1 && settings.aacSlowFall.get()) {
                    mc.timer.timerSpeed = 0.8;
                }
                break;
            case "aac5":
                if (!isMoving() || inBlock()) {
                    reset();
                    break;
                } if (canJump()) {
                    mc.thePlayer.jump();
                    mc.thePlayer.speedInAir = 0.0201;
                    mc.timer.timerSpeed = 0.94;
                } if (mc.thePlayer.fallDistance > 0.7 && mc.thePlayer.fallDistance < 1.3) {
                    mc.thePlayer.speedInAir = 0.02;
                    mc.timer.timerSpeed = 1.8;
                }
                break;
            case "verushop":
                if (!isMoving() || inBlock()) {
                    reset();
                    !inBlock() && (mc.thePlayer.motionX = mc.thePlayer.motionZ = 0.0);
                    break;
                }
                mc.thePlayer.jumpMovementFactor = Math.abs(mc.thePlayer.movementInput.moveStrafe) < 0.1 ? 0.0265 : 0.0244;
                if (canJump()) {
                    mc.timer.timerSpeed = 1.25;
                    mc.gameSettings.keyBindJump.pressed = false;
                    mc.thePlayer.jump();
                    MovementUtils.strafe();
                    if(MovementUtils.getSpeed() < 0.5) {
                        MovementUtils.strafe(0.4849);
                    }
                } else {
                    mc.gameSettings.keyBindJump.pressed = mc.gameSettings.keyBindJump.isKeyDown();
                } if (MovementUtils.getSpeed() < 0.215) {
                    MovementUtils.strafe(0.215);
                }
                break;
            case "mineplexhop":
                if (!isMoving() || inBlock()) {
                    reset();
                    break;
                }
                var speed = MovementUtils.getSpeed() * 1.0072;
                var yaw = mc.thePlayer.rotationYaw / 180 * Math.PI;
                mc.thePlayer.motionX = -Math.sin(yaw) * speed;
                mc.thePlayer.motionZ = Math.cos(yaw) * speed;
                if (canJump()) {
                    mc.thePlayer.motionY = 0.405;
                    mc.thePlayer.motionX *= 1.004;
                    mc.thePlayer.motionZ *= 1.004;
                    /*if (!mc.gameSettings.keyBindJump.isKeyDown() && !inBlock()) {
                        mc.thePlayer.jump();
                    }*/
                }
                break;
            case "hypixel":
            case "ncphop":
            case "cubecrafthop":
                if (isMoving()) {
                    mc.thePlayer.motionX *= 1.004;
                    mc.thePlayer.motionZ *= 1.004;
                    if (canJump()) {
                        mc.thePlayer.speedInAir = 0.0363;
                        mc.thePlayer.jump();
                    } if (!settings.mode.get().toLowerCase() === "hypixel"){
                        MovementUtils.strafe();
                    }
                } else if (!inBlock()) {
                    mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
                }
                break;
        }
    }

    this.onDisable = function () {
        this.onEnable();
    }

    this.addValues = function (values) {
        for (var i in settings) {
            values.add(settings[i]);
        }
    }

    function isMoving() {
        return (mc.thePlayer.movementInput.moveForward !== 0 || mc.thePlayer.movementInput.moveStrafe !== 0);
    }

    function inBlock() {
        return mc.thePlayer.ridingEntity != null || mc.thePlayer.isInWater() || mc.thePlayer.isInLava() || mc.thePlayer.isOnLadder() || mc.thePlayer.isInWeb;
    }

    function canJump() {
        return mc.thePlayer.onGround && !mc.gameSettings.keyBindJump.isKeyDown() && !inBlock();
    }

    function reset() {
        mc.timer.timerSpeed = 1;
        mc.thePlayer.speedInAir = 0.02;
    }

}

function onLoad() {}

function onEnable() {
    client = moduleManager.registerModule(new CookieSpeed());
}

function onDisable() {
    moduleManager.unregisterModule(client);
}
