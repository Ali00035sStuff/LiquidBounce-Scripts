var fadeTimer = 0;
var reasons = ['Aura disabled due to server changes.', 'Aura disabled due to death.'];
var S06PacketUpdateHealth = Java.type('net.minecraft.network.play.server.S06PacketUpdateHealth');
var ScaledResolution = Java.type('net.minecraft.client.gui.ScaledResolution');
var KillAura = moduleManager.getModule('KillAura');
function getScaledWidth() {
    var scaledWidth = new ScaledResolution(mc).getScaledWidth();
    return scaledWidth;
}
function getScaledHeight() {
    var scaledHeight = new ScaledResolution(mc).getScaledHeight();
    return scaledHeight;
}
var script = registerScript({
    name: 'AutoDisable',
    version: '0.0.0',
    authors: ['Shurpe']
});
script.registerModule({
    name: 'AutoDisable',
    description: 'Turns off KillAura module',
    category: 'Fun'

}, function (module) {
	module.on('packet', function (e) {
		var packet = e.getPacket();
        if (packet instanceof S06PacketUpdateHealth && packet.getHealth() <= 0 && KillAura.getState()) {
            KillAura.setState(false); reason = reasons[1]; disabled = true;
        }
    });
	module.on('update', function () {
        mcWidth = getScaledWidth(); mcHeight = getScaledHeight();
        disabled ? fadeTimer++ : fadeTimer = 0;
        if (fadeTimer >= 50) {
            disabled = false;
        }
    });
    module.on('render2D', function () {
        if (disabled) {
            mc.fontRendererObj.drawStringWithShadow(reason, mcWidth / 2 - mc.fontRendererObj.getStringWidth(reason) / 2, 15, 0xFFFFFF);
            mc.fontRendererObj.drawStringWithShadow('§cWarning!', mcWidth / 2 - mc.fontRendererObj.getStringWidth('Warning!') / 2, 5, 0xFFFFFF);
        }
    });
    module.on('world', function () {
        if (KillAura.getState()) {
            reason = reasons[0]; KillAura.setState(false); disabled = true;
        }
    });
});
