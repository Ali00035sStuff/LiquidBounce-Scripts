var scriptName = "Aesthetic Mod";
var scriptAuthor = "Soulplexis";
var scriptVersion = 2.3;

function randomIntFrom(min, max) // Get a random integer from [min] to [max] - changed functionality to be a random FLOAT
{
    return Math.random() * (max - min + 1) + min
}
var AntiBot = Java.type("net.ccbluex.liquidbounce.features.module.modules.misc.AntiBot");
var C06PlayerPacket = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook');
var C04PacketPlayerPosition = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition')
var C05PacketPlayerLook = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook');
var C03PacketPlayer = Java.type('net.minecraft.network.play.client.C03PacketPlayer');
var S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
var worldinfo = Java.type("net.minecraft.world.storage.WorldInfo");
var timepacket = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");
var ItemRenderer = Java.type("net.minecraft.client.renderer.ItemRenderer");
var Foodstuff = Java.type("net.minecraft.util.FoodStats");
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
var MathHelper = Java.type("net.minecraft.util.MathHelper");
var itemRenderer = mc.entityRenderer.class.getDeclaredField("field_78516_c");
var towerModule = moduleManager.getModule("Tower");
var shakepacket = Java.type("net.minecraft.network.handshake.client.C00Handshake");
var disconnext = Java.type("net.minecraft.network.play.server.S40PacketDisconnect");
var otherdiscon = Java.type("net.minecraft.network.login.server.S00PacketDisconnect");
var joingame = Java.type("net.minecraft.network.play.server.S01PacketJoinGame");
var tppacket = Java.type("net.minecraft.network.play.server.S2EPacketCloseWindow");
var attx = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");

function Derp() {
    var Bloing = value.createBoolean("Bloing", false);
    var TimeMachine = value.createBoolean("TimeMachine", false);
    var TimeType = value.createList("TimeType", ["Add", "Set", "Random"], "Add");
    var TimeAmount = value.createInteger("TimeAmount", 50, -24000, 24000);
    var WeatherChanger = value.createBoolean("WeatherChanger", false);
    var WeatherType = value.createList("WeatherType", ["Rain", "Clear", "Cursed", "Blessed", "Random"], "Rain");
    var RainStrength = value.createFloat("RainStrength", 0.5, 0, 5);
    var SkyLight = value.createBoolean("SkyLight", false);
    var SkylightAmount = value.createFloat("SkyLightAmount", 0.5, 0, 100);
    var FakeHealth = value.createBoolean("FakeHealth", false);
    var FakeHealthType = value.createList("HealthType", ["Set", "Random"], "Set");
    var FakeHealthAmount = value.createFloat("FakeHealthAmount", 5, 0.5, 20);
    var FakeAbsorption = value.createBoolean("FakeAbsorption", false);
    var FakeAbsorptionType = value.createList("AbsorptionType", ["Set", "Random"], "Set");
    var FakeAbsorptionAmount = value.createFloat("FakeAbsorptionAmount", 5, 0.5, 200);
    var FakeHunger = value.createBoolean("FakeHunger", false);
    var FakeHungerType = value.createList("HungerType", ["Set", "Random"], "Set");
    var FakeHungerAmount = value.createFloat("FakeHungerAmount", 5, 0.5, 20);
    var FakeFire = value.createBoolean("FakeFire", false);
    var FakeFireType = value.createList("FireType", ["Fire", "Flicker", "Extinguish"], "Fire");
    var BlockAnimation = value.createBoolean("SwingAnimation", false);
    var BlockAnimationType = value.createList("SwingAnimationType", ["Add", "Multiply", "Set", "Random"], "Add");
    var BlockAnimationAmount = value.createFloat("SwingAnimationAmount", 1, -1, 1);
    var BlockAnimationNoNegatives = value.createBoolean("SwingAnimationOnlyBlock", false);
    var FallDistance = value.createBoolean("FallDistance", false);
    var FallDistanceAmount = value.createFloat("FallDistanceAmount", 5, 0.5, 10);
    var Tag = value.createBoolean("ArraylistTag", false);
    var CustomTag = value.createText("Tag", "Made by Soulplexis");
    var FallDistance = value.createBoolean("FallDistance", false);
    var TowerStopMotion = value.createBoolean("TowerStopMotion", false);
    var ProtocolSpoof = value.createBoolean("ProtocolSpoof", false);
    var ProtocolVersion = value.createList("ProtocolVersion", ["1.8.9", "1.8", "1.7.10", "1.9"], "1.8.9");
    var Disconnect = value.createBoolean("Disconnect", false);
    var DisconnectReason = value.createText("DisconnectMessage", "This server sucks");
    var HardCoreHearts = value.createBoolean("HardCoreHearts", false);
    var NoServerTeleport = value.createBoolean("NoCloseInventory", false);
    var NoBotHit = value.createBoolean("NoBotHit", false);
    var RemoveBots = value.createBoolean("RemoveBots", false);
    var NoPvP = value.createBoolean("NoPvP", false);
    this.getName = function() {
        return "Aesthetic";
    }
    this.getCategory = function() {
        return "Misc";
    }
    this.getDescription = function() {
        return "Spoof many visual things in the game, and some misc features.";
    }
    this.onEnable = function() {
        if (WeatherType.get() == "Cursed") {
            rain = 0;
        }
        if (WeatherType.get() == "Blessed") {
            rain = RainStrength.get();
        }
        var beforetime = mc.theWorld.getWorldTime();
        var beforehealth = mc.thePlayer.getHealth();
        var beforeabsorption = mc.thePlayer.getAbsorptionAmount();
        var beforehunger = mc.thePlayer.getFoodStats().getFoodLevel();
        var beforefire = mc.thePlayer.getFire();
        var beforeweather = mc.theWorld.getRainStrength();
    }
    this.onPacket = function(event) {
        var packet = event.getPacket();
        if (NoPvP.get()) {
            if (packet instanceof attx) {
                event.cancelEvent();
            }
        }
		if(NoBotHit.get() && cancelbothit) {
			            if (packet instanceof attx) {
                event.cancelEvent();
            }
		}
        if (packet instanceof timepacket && TimeMachine.get()) {
            event.cancelEvent();
        }
        if (ProtocolSpoof.get()) {
            if (packet instanceof shakepacket) {
                /* Debug */
                chat.print(packet.getProtocolVersion());
                // currently this doesn't work im experimenting with it.
                chat.print("HANDSHAKE!");
                switch (ProtocolVersion.get()) {
                    case "1.8.9":
                        //nothing client is on 1.8.9
                        break;
                    case "1.8":
                        packet.protocolVersion = 46;
                        break;
                    case "1.7.10":
                        packet.protocolVersion = 45;
                        break;
                    case "1.9":
                        packet.protocolVersion = 48;
                        break;
                }
            }
        }
        if (Disconnect.get()) {
            if (packet instanceof disconnext || packet instanceof otherdiscon) {
                packet.reason = DisconnectReason.get();
            }
        }
        if (HardCoreHearts.get()) {
            if (packet instanceof joingame) {
                packet.hardcore = true;
            }
        }
        if (NoServerTeleport.get()) {
            if (packet instanceof tppacket) {
                event.cancelEvent();
            }
        }
    }
    var rain = 0;
    var abs = 0;
    var fire = false;
    this.onDisable = function() {
        mc.theWorld.setWorldTime(beforetime);
        mc.thePlayer.setHealth(beforehealth);
        mc.thePlayer.setAbsorptionAmount(beforeabsorption);
        mc.thePlayer.getFoodStats().setFoodLevel(beforehunger);
        mc.thePlayer.setFire(beforefire);
        mc.theWorld.setRainStrength(beforeweather);
        ProtocolSpoof.set(false);
    }
    this.onUpdate = function() {
        if (TimeMachine.get()) {
            switch (TimeType.get()) {
                case "Add":
                    mc.theWorld.setWorldTime(mc.theWorld.getWorldTime() + TimeAmount.get());
                    break;
                case "Set":
                    mc.theWorld.setWorldTime(TimeAmount.get());
                    break;
                case "Random":
                    mc.theWorld.setWorldTime(randomIntFrom(0, 24000));
                    break;
            }
        }
        if (FakeHealth.get() == true) {
            switch (FakeHealthType.get()) {
                case "Add":
                    mc.thePlayer.setHealth(mc.thePlayer.getHealth() + FakeHealthAmount.get());
                    break;
                case "Set":
                    mc.thePlayer.setHealth(FakeHealthAmount.get());
                    break;
                case "Random":
                    mc.thePlayer.setHealth(randomIntFrom(1, 20));
                    break;
            }
        }
        if (FakeAbsorption.get() == true) {
            switch (FakeAbsorptionType.get()) {
                case "Set":
                    mc.thePlayer.setAbsorptionAmount(FakeAbsorptionAmount.get());
                    break;
                case "Random":
                    mc.thePlayer.setAbsorptionAmount(randomIntFrom(0, FakeAbsorptionAmount.get()));
                    break;
            }
        }
        if (FakeHunger.get() == true) {
            switch (FakeHungerType.get()) {
                case "Set":
                    mc.thePlayer.getFoodStats().setFoodLevel(FakeHungerAmount.get());
                    break;
                case "Random":
                    mc.thePlayer.getFoodStats().setFoodLevel(randomIntFrom(0, 20));
                    break;
            }
        }
        if (FakeFire.get()) {
            switch (FakeFireType.get()) {
                case "Fire":
                    mc.thePlayer.setFire(1);
                    break;
                case "Flicker":
                    fire = !fire;
                    if (fire == true) {
                        mc.thePlayer.setFire(1);
                    } else {
                        mc.thePlayer.setFire(0);
                    }
                    break;
                case "Extinguish":
                    mc.thePlayer.setFire(0);
                    break;
            }
        }
        if (WeatherChanger.get()) {
            switch (WeatherType.get()) {
                case "Rain":
                    mc.theWorld.setRainStrength(RainStrength.get());
                    //mc.theWorld.setRaining(true);
                    break;
                case "Clear":
                    mc.theWorld.setRainStrength(0);
                    //mc.theWorld.setRaining(false);
                    break;
                case "Cursed":
                    rain += 0.001000;
                    mc.theWorld.setRainStrength(rain);
                    //mc.theWorld.setRaining(true);
                    if (rain >= RainStrength.get()) {
                        rain = RainStrength.get();
                    }
                    break;
                case "Blessed":
                    rain -= 0.001000;
                    mc.theWorld.setRainStrength(rain);
                    //mc.theWorld.setRaining(true);
                    if (rain <= 0) {
                        rain = 0
                        //mc.theWorld.setRaining(false);
                    }
                    break;
                case "Random":
                    mc.theWorld.setRainStrength(randomIntFrom(0, RainStrength.get()));
                    //mc.theWorld.setRaining(true);
                    break;
            }
        }
        if (RemoveBots.get()) {
            for (var x in mc.theWorld.loadedEntityList) {
                var entities = mc.theWorld.loadedEntityList[x];
                if (AntiBot.isBot(entities) && entities != mc.thePlayer) {
                    mc.theWorld.removeEntity(entities);
                }
            }
        }
    }
    var swichy = false;
    this.onMotion = function() {
        if (FallDistance.get()) {
            mc.thePlayer.fallDistance = FallDistanceAmount.get();
        }
        if (BlockAnimation.get()) {
            if (mc.thePlayer.swingProgress != 0 && ((BlockAnimationNoNegatives.get() && mc.thePlayer.isUsingItem()) || BlockAnimationNoNegatives.get() == false)) {
                switch (BlockAnimationType.get()) {
                    case "Add":
                        mc.thePlayer.swingProgress += BlockAnimationAmount.get()
                        break;
                    case "Multiply":
                        mc.thePlayer.swingProgress *= BlockAnimationAmount.get();
                        break;
                    case "Set":
                        mc.thePlayer.swingProgress = BlockAnimationAmount.get()
                        break;
                    case "Random":
                        mc.thePlayer.swingProgress = randomIntFrom(-BlockAnimationAmount.get(), BlockAnimationAmount.get());
                        break;
                    case "Old":
                        mc.thePlayer.swingProgress *= -1
                        break;
                    case "New":
                        mc.thePlayer.swingProgress *= mc.thePlayer.swingProgress * BlockAnimationAmount.get();
                        break;
                    case "New2":
                        swichy = !swichy;
                        if (swichy) {
                            mc.thePlayer.swingProgress += mc.thePlayer.swingProgress / 10
                        } else {
                            mc.thePlayer.swingProgress -= mc.thePlayer.swingProgress / 10
                        }
                        break;
                    case "Jiggle":
                        mc.thePlayer.swingProgress += BlockAnimationAmount.get() / mc.thePlayer.swingProgress * 10
                        break;
                    case "Dev":
                        break;
                    case "Flux":
                        GlStateManager.rotate(-20.0, 0.0, 1.0, 0.0);
                        break;
                }
            }
        }
        if (towerModule.getState() == true && mc.gameSettings.keyBindJump.pressed) {
            mc.thePlayer.motionX = 0;
            mc.thePlayer.motionZ = 0;
        }
    }
    var target;
	var cancelbothit = false;
    this.onAttack = function(event) {
        if (NoBotHit.get()) {
            target = event.getTargetEntity();
            if (AntiBot.isBot(entity)) {
                cancelbothit = true;
            } else {
				cancelbothit = false;
			}
        }
    }
    this.addValues = function(soul) {
        //soul.add(Bloing); 
        soul.add(TimeMachine);
        soul.add(TimeType);
        soul.add(TimeAmount);
        soul.add(WeatherChanger);
        soul.add(WeatherType);
        soul.add(RainStrength);
        //soul.add(SkyLight);
        //soul.add(SkylightAmount);
        soul.add(FakeHealth);
        soul.add(FakeHealthType);
        soul.add(FakeHealthAmount);
        soul.add(FakeAbsorption);
        soul.add(FakeAbsorptionType);
        soul.add(FakeAbsorptionAmount);
        soul.add(FakeHunger);
        soul.add(FakeHungerType);
        soul.add(FakeHungerAmount);
        soul.add(FakeFire);
        soul.add(FakeFireType);
        soul.add(BlockAnimation);
        soul.add(BlockAnimationType);
        soul.add(BlockAnimationAmount);
        soul.add(BlockAnimationNoNegatives);
        soul.add(FallDistance);
        soul.add(FallDistanceAmount);
        soul.add(TowerStopMotion);
        /* soul.add(ProtocolSpoof); // need 2 fix
         soul.add(ProtocolVersion); //
         soul.add(Disconnect); //
         soul.add(DisconnectReason); //
         soul.add(HardCoreHearts); // */
        soul.add(NoBotHit);
        soul.add(RemoveBots);
		soul.add(NoPvP);
        soul.add(NoServerTeleport);
        soul.add(Tag);
        soul.add(CustomTag);
    }

    this.getTag = function() {
        if (Tag.get()) {
            return CustomTag.get();
        } else {
            return "";
        }
    }
}

var derp = new Derp();
var derpClient;

function onEnable() {
    derpClient = moduleManager.registerModule(derp);
}

function onDisable() {
    moduleManager.unregisterModule(derpClient);
}
