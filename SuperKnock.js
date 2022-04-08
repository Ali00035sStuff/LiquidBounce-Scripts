///api_version=2
(script = registerScript({
    name: "SuperKnock",
    version: "1.2",
    authors: ["yorik100"]
})).import("Core.lib");

var timer = new MSTimer();
var entity = "";

general_values_array = [
    type = value.createList("Type", ["Always", "SprintOnly", "MoveOnly"], "Always"),
    noDouble = value.createBoolean("NoDoublePackets", true),
    resetOnSwitch = value.createBoolean("ResetDelayOnTargetSwitch", true),
    alwaysStopSprint = value.createBoolean("AlwaysStopSprint", false),
    hurtTime = value.createInteger("HurtTime", 2, 0, 10),
    Delay = value.createInteger("Delay", 200, 0, 1000)
]

module = {
    category: "Combat",
    description: "Increases knockback you deal",
    values: general_values_array,
    onEnable: function() {
        buffer = noDoubleStart = noDoubleStop = false;
    },
    onPacket: function(e) {
        if ((type.get() == "SprintOnly" && !mc.thePlayer.isSprinting()) || (type.get() == "MoveOnly" && !isMovingHorizontally())) return;
        if (e.getPacket() instanceof C02PacketUseEntity && e.getPacket().getAction() == C02PacketUseEntity.Action.ATTACK) {
            this.entity = entity;
            entity = e.getPacket().getEntityFromWorld(mc.theWorld);
            if (!entity || entity.hurtTime > hurtTime.get() || (!timer.hasTimePassed(Delay.get()) && (!resetOnSwitch.get() || this.entity == entity))) return;
            mc.thePlayer.sendQueue.addToSendQueue(new C0BPacketEntityAction(mc.thePlayer, C0BPacketEntityAction.Action.START_SPRINTING));
            buffer = !mc.thePlayer.isSprinting() || alwaysStopSprint.get();
            timer.reset();
        } else if (noDouble.get() && e.getPacket() instanceof C0BPacketEntityAction) e.getPacket().getAction() == C0BPacketEntityAction.Action.START_SPRINTING ? (noDoubleStart ? e.cancelEvent() : (noDoubleStart = true, noDoubleStop = false)) : (e.getPacket().getAction() == C0BPacketEntityAction.Action.STOP_SPRINTING ? (noDoubleStop ? e.cancelEvent() : (noDoubleStop = true, noDoubleStart = false)) : null);
    },
    onMotion: function(e) {
        if (e.getEventState() == "POST") {
            SuperKnockModule.tag = type.get();
            if (buffer) {
                buffer = false;
                mc.thePlayer.sendQueue.addToSendQueue(new C0BPacketEntityAction(mc.thePlayer, C0BPacketEntityAction.Action.STOP_SPRINTING));
            }
            noDoubleStart = noDoubleStop = false;
        }
    }
}
