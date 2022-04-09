/// api_version=2
var script = registerScript({
    name: "Jartex Script",
    version: "1.0",
    authors: ["FaaatPotato, liulihaocai"]
});

//Credits: liulihaocai made the AutoL i modified it a bit so you can use it on Jartex! 

var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var TitsBest = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var HentaiPacket = Java.type("net.minecraft.network.play.server.S02PacketChat");
var Amanee = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var Block = Java.type('net.minecraft.block.Block');
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');

var FreeCam = moduleManager.getModule("FreeCam");
var Fly = moduleManager.getModule("Fly");
var KA = moduleManager.getModule("KillAura");
var IC = moduleManager.getModule("InventoryCleaner");
var AA = moduleManager.getModule("AutoArmor");
var CS = moduleManager.getModule("ChestStealer");
var CA = moduleManager.getModule("ChestAura");
var Teleport = moduleManager.getModule("Teleport");
var Spammer = moduleManager.getModule("Spammer");

function vClip(d) {
	   mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + d, mc.thePlayer.posZ);
	}

function setTimeout(func, milliseconds) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function () {
        func();
    }, milliseconds);

    return timer;
}

Math.rad = function(deg) {
    return deg * Math.PI / 180;
}

function rndm(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
} 

function setYeet(_yeet) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _yeet * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _yeet * Math.cos(playerYaw);
}

var LD = ['LOBBY'];
var GD = ['seconds'];
var GD2 = ['SWT'];
var GD3 = ['BW1'];
var GD4 = ['BW2'];
var GD5 = ['BW3'];
var GD6 = ['BW4'];

script.registerModule({
    name: "JartexManager",
    description: "Is config loader and stuff",
    category: "Fun",
    tag: "JS",
    settings: {
        LobbySpeed: Setting.boolean({
            name: "LobbySpeed",
            default: false
		}),
        OnOff: Setting.boolean({
            name: "ToggleModules",
            default: false
		}),
        L1: Setting.boolean({
            name: " ",
            default: false
		}),
        SW: Setting.boolean({
            name: "ConfigSW",
            default: false
		}),
        BW: Setting.boolean({
            name: "ConfigBW",
            default: false
		}),
        L2: Setting.boolean({
            name: " ",
            default: false
		}),
        ON: Setting.boolean({
            name: "ON (Turns sum modules on)",
            default: false
		}),
        OFF: Setting.boolean({
            name: "OFF (Turns sum modules off)",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {
    isLobby = false;
    });
    module.on("disable", function () {

    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    if (packet instanceof HentaiPacket) {
    	if(packet.getChatComponent().getUnformattedText().contains(LD[parseInt(Math.random()*LD.length)])) {
    	isLobby = true;
    	}
    	if(packet.getChatComponent().getUnformattedText().contains(GD[parseInt(Math.random()*GD.length)]) || packet.getChatComponent().getUnformattedText().contains(GD2[parseInt(Math.random()*GD2.length)]) || packet.getChatComponent().getUnformattedText().contains(GD3[parseInt(Math.random()*GD3.length)]) || packet.getChatComponent().getUnformattedText().contains(GD4[parseInt(Math.random()*GD4.length)]) || packet.getChatComponent().getUnformattedText().contains(GD5[parseInt(Math.random()*GD5.length)]) || packet.getChatComponent().getUnformattedText().contains(GD6[parseInt(Math.random()*GD6.length)])) {
    	isLobby = false;
    }
    }
    });
    module.on("update", function () {
    if (module.settings.ON.get()) {
        KA.setState(true);
        IC.setState(true);
        AA.setState(true);
        CA.setState(true);
        CS.setState(true);	
        module.settings.ON.set(false);
    }	
    if (module.settings.OFF.get()) {
        KA.setState(false);
        IC.setState(false);
        AA.setState(false);
        CA.setState(false);
        CS.setState(false);	
        module.settings.OFF.set(false);
    }
    if (isLobby == true && module.settings.LobbySpeed.get()) {
    mc.timer.timerSpeed = 4;	
    }	
    if (isLobby == false && module.settings.LobbySpeed.get()) {
    mc.timer.timerSpeed = 1;	
    }
    if (module.settings.LobbySpeed.get() == false) {
    mc.timer.timerSpeed = 1;	
    }
    if (isLobby == true && module.settings.OnOff.get()) {
    KA.setState(false);
    IC.setState(false);
    AA.setState(false);
    CA.setState(false);
    CS.setState(false);
    }
    if (isLobby == false && module.settings.OnOff.get()) {
    KA.setState(true);
    IC.setState(true);
    AA.setState(true);
    CA.setState(true);
    CS.setState(true);	
    }
    if (module.settings.BW.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/FaaatPotato/Configs/main/JartexBW.txt");
    module.settings.BW.set(false);
    }
    
    if (module.settings.SW.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/FaaatPotato/Configs/main/JartexSW.txt");
    module.settings.SW.set(false);
    }
    });
});
script.registerModule({
    name: "AutoPhase",
    description: "Phases your dick through walls",
    category: "Fun",
    tag: "JS",
    settings: {
    }

}, function (module) {
    module.on("enable", function () {

    });
    module.on("disable", function () {

    });
    module.on("update", function () {	
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(20)) {
        
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));
	    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 15, mc.thePlayer.posZ, false));
	    
	    mc.gameSettings.keyBindLeft.pressed = false;
	    mc.gameSettings.keyBindForward.pressed = false;
	    mc.gameSettings.keyBindRight.pressed = false;
	    mc.gameSettings.keyBindBack.pressed = false;
	    mc.gameSettings.keyBindJump.pressed = false;
        } 
		
		if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(166)) {
	    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 5, mc.thePlayer.posZ, true));	
	    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 5, mc.thePlayer.posZ, true));	
	    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 15, mc.thePlayer.posZ, false));	
	    
	    mc.gameSettings.keyBindLeft.pressed = false;
	    mc.gameSettings.keyBindForward.pressed = false;
	    mc.gameSettings.keyBindRight.pressed = false;
	    mc.gameSettings.keyBindBack.pressed = false;
	    mc.gameSettings.keyBindJump.pressed = false;
		}
    });
});
script.registerModule({
    name: "LiquiqWalk",
    description: "Makes you jesus",
    category: "Fun",
    tag: "JS",
    settings: {}

}, function (module) {
    module.on("enable", function () {
    });
    module.on("disable", function () {
    mc.timer.timerSpeed = 1;
    });
    module.on("update", function () {
    if (mc.thePlayer.isInWater()) {
    if (MovementUtils.isMoving() && !mc.gameSettings.keyBindSneak.pressed) {
    mc.thePlayer.motionY = 0.0;	
    } 
    if (!MovementUtils.isMoving()) {
    if (mc.thePlayer.ticksExisted % 12 == 0) {
    mc.thePlayer.motionY = 0.25;	
    }
    }
        
        if (mc.gameSettings.keyBindForward.pressed) {
        var dir = Math.rad(mc.thePlayer.rotationYaw);
        mc.thePlayer.motionX += -Math.sin(dir) * 0.07;
        mc.thePlayer.motionZ += Math.cos(dir) * 0.07;	
        }
        if (mc.gameSettings.keyBindJump.pressed) {
        mc.thePlayer.motionY = 0.15
        ;
        }
        if (mc.gameSettings.keyBindSneak.pressed) {
        mc.thePlayer.motionY = -0.2;	
        }
    }
    });
});
script.registerModule({
    name: "BoatSpeed",
    description: "Its makes you speed like hell NO VOID",
    category: "Fun",
    tag: "JS",
    settings: {
		Speed: Setting.float({
			name: "Speed",
			default: 5,
			min:1,
			max:6
		}),
    }

}, function (module) {
    module.on("enable", function () {
    moduleManager.getModule("Fly").getValue("Mode").set("Minesecure");
    });
    module.on("disable", function () {
    Fly.setState(false);
    mc.gameSettings.keyBindSneak.pressed = false;	
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    if (mc.thePlayer.isRiding()) {
    if (packet instanceof C04 || packet instanceof C03) {
    e.cancelEvent();		
    }	
    }
    });
    module.on("update", function () {
    if (mc.thePlayer.ticksExisted % 10 == 0) {
    mc.gameSettings.keyBindSneak.pressed = false;	
    }	
    moduleManager.getModule("Fly").getValue("Vanillaspeed").set(module.settings.Speed.get());	
    if (mc.thePlayer.isRiding()) {	
    Fly.setState(true);	
    mc.gameSettings.keyBindSneak.pressed = true;
    }
    });
});

var EnglishWords = ['I\'m burying you here now, little brother.', 'you don\'t have speed to compete with me.', 'I\'m like your father. Don\'t you know what\'s going on?', 'a snail like you has no speed to fight against your father and me with these poor words.', 'a little rubbish like you has no power at all.', 'And then you don\'t have the power at all. Do you understand your trash, little trash?', ' I\'m like your father beating your son casually. ', 'I\'m like your father. You don\'t know what\'s going on.', 'Why are you so powerful here? ', 'Now you know what\'s going on, you\'re like garbage.', 'how can you fight me like garbage? ', 'Hee hee hee, can you come out and tell me?', 'you don\'t have the speed at all. Do you understand what\'s going on? Come out and beat me like garbage.', 'so you let me beat you like garbage. Isn\'t that the truth? Brother.', 'you can only insult me like my son or what you want to do?', 'I\'m just like your father beating you like a totally powerless son.', 'Father, I beat you up at will, son.', 'I\'m not beating you up now, autistic youth.', 'you don\'t know the situation or how it is.', 'autistic children start beating up your top dad.', 'how can I feel you and my autistic son\'s resistance to Dad.', 'Son, do you know what your father is fighting against?', ' now you see your father\'s fear of all kinds of speed or how it is. ', 'Now you have fun, son. Do you know what\'s going on?', 'dad hit you at will. Do you know the truth? ', 'You still want to fight against me powerlessly, or what\'s your brother.', 'You don\'t know what\'s going on, or you\'re totally rubbish', 'hee hee hee your b-face', 'your mother put b-face in your mother\'s b-face', 'you don\'t seem to know everything', 'you don\'t find out that you\'re not Dad\'s opponent at all', 'Dad, I\'ll turn over your mother at will', 'your dog and son just flinch away', 'Are you sitting in front of the computer and sweating in your palms?', 'are you nervous? Are you incoherent? ', 'All you can do now is to tap the keyboard at random and hint your fear to me with fear.', 'haven\'t you found that now it\'s like a clown jumping on a beam to please me? ', 'And I\'ll beat you and beat an autistic thing at will ', 'Why can\'t you fuck your mother?', 'it\'s a word you\'ve been tossing around.', ' How about the kids come up with your strength?', 'didn\'t you find out that you\'re not my dad\'s match? ', 'Did you give it to me,', 'my dead boy? ', 'don\'t give it to my dad or me for nothing? ', 'You\'re a tough guy, don\'t you answer me like this?', 'what are you? You\'re a dead boy. You\'re a punk. ', 'Young man, you\'ve come across the sea to fake your father and me.', 'are you a junk dog basket? Can you tell us whether you\'re a junk dog basket?', ' Can you boast about a junk dog basket?', 'what\'s wrong with you Are you afraid of your father and me, are you a dog basket, a boy and your mother are dead, do you admit that you are a half paralyzed garbage dog basket, hurry up, can\'t you improve your speed, can\'t you feel powerless, can\'t you worry about your speed, ', 'Do you know that you are going to lose to your dad and me who is at the top of the world', 'do you have no self-knowledge', 'do you think you are going to lose to your dad and me who is at the top of the world, you are not in a hot mood at first', 'what are you doing, what are your ink marks, what are your autism speed', 'shouldn\'t you attack me with words that are powerful enough to make you shrink back?', 'Why are you so poor, brother?', 'are you a coward, young man?', 'are you boasting about your speed?', 'what capital do you have to boast about?', 'your speed of no one\'s attention? Tell your father me all about it.', 'do you think you can win over your father and me?', 'I see if you think you can win', 'young man, are you a loser', 'are you a powerful loser', 'how can you become a turtle in a jar', 'are you insane and can\'t extricate yourself', 'do you think you can win', 'young man, are you a loser?', 'Why do you use your cheerleading words to attack your wonderful dad and me?', 'do you want to beat your real dad and me with your mother-in-law words? ', 'Do you start to be complacent?', ' do you think you can beat my wonderful dad and me? ', ' do you think you are confused now? ', 'Why is your father typing so fast', 'are you afraid of your father\'s speed', 'do you know nothing about these words', 'don\'t you understand anything', 'how can you be a yes man', 'are you afraid of me', 'are you a coward', 'are you still breathing', 'are you sweating, are you panting?', 'How about the junk Dog Basket keep up with your father and me?', 'attack me with your words', 'how can a frog at the bottom of the well know that the sky is thicker than your height and your face is thicker than yours', 'be your coward honestly', 'what are you doing, attack your father and me repeatedly', 'how can you still be still', 'are you deaf and blind?', 'You don\'t know for sure', 'I asked you to be a real wimp, you are confused', 'you can\'t understand what your father said', 'I asked you to be a wimp', 'what are you doing? Are you starting to get angry', 'why don\'t you still be a real wimp', 'how can you still be a real wimp in front of me?', 'Do you want to continue to use your intermittent words to prove your cowardice', 'you are useless little brother, you don\'t understand', 'little brother, you are a unique coward', 'are you an immortal coward', 'Why are you chirping', 'attack me with your intermittent words quickly', 'If you don\'t have the ability to attack me, don\'t grow things here, son.', 'are you a loser?', 'you tell me. ', ' you attack me with your scattered words. ', ' how can you insult your father and me again and again. ', ' do you think you can defeat me with a little scattered words? ', 'Be careful of your father\'s killing my family', 'get out of here, little brother. Don\'t worry about it', 'I won\'t eat your father\'s', 'what are you doing, don\'t you still move', 'disappear from the earth quickly', 'Why are you still chattering and chattering and chattering', 'don\'t you want to roll away', 'why don\'t you roll away somehow?', 'Are you starting to be unscrupulous?', ' your father and I have seen a lot. Don\'t stay with your mother and dog, OK? ', 'You seem to be rubbish. What\'s your temper? Do you know?', 'do you think you can knock me down in this small online world with your words? ', 'You are just dreaming about how to fight against your father and me, or how to fight against your brother?', 'You know that you\'re rubbish.', 'you don\'t know the fact that I beat you cruelly.', 'you tell me the fact that I beat you cruelly.', 'why don\'t you tell your father about me without speed?', 'why don\'t you tell your father about me', 'why don\'t you tell your father about me', 'why don\'t you get out of here?', 'You disgust your father, I don\'t understand you', 'you don\'t seem to have the level of yourself, but you don\'t understand the situation.', 'I\'ll start with you casually. Why don\'t you admit your own rubbish.', 'I think I\'m your father or how to come out and tell me.', 'you don\'t seem to understand the situation or how to tell everyone.', 'But how can you beat me if you know the situation clearly or how can you beat me?', 'I beat you casually as if they were rebellious', 'I don\'t think you have the ability to resist dad\'s speed at all.', 'I think you\'re a waste product. You don\'t seem to have the cultural understanding.', 'I think you\'re a waste product. How can you resist my speed child?', 'Do you understand? Do you know? Do you understand?', 'do you really think that your illogical and incomplete words can bring you so-called sense of superiority and victory? ', 'Is your vocabulary such a dirty word', 'aren\'t you just a mouth opening and mouth closing mom who is full of thoughts about mom\'s autism?', ' Why are you so incoherent and illogical? ', 'You\'re a garbage brother with no cultural level at all', 'I beat you casually, son, your words and actions don\'t pretend to be clear', 'you garbage speed and I continue to fight right', 'do you really think you can dominate the keyboard industry', 'how can you resist me if you\'re totally garbage like', 'you tell everyone here', 'I can\'t talk about the fact that I beat you casually. How can I tell it?', ' I don\'t think you can start to talk about this rubbish like you.', 'Come out and tell everyone right away. Do you know it completely rubbish like you?', 'you don\'t seem to know the fact that I\'m your father. ', 'You don\'t know the fact that I beat you casually. You tell me the same thing.', 'I\'m like your father. You don\'t know the facts or why you don\'t have some speed.', 'you know, it doesn\'t need any level to beat you mentally retarded garbage.', 'you don\'t seem to have any level to beat you.', 'you don\'t seem to have any level to understand the situation.', 'you know that you don\'t have any level to beat you.', 'you don\'t have speed to run away from me? How are you?', 'You just can\'t resist your father. How can I get out and tell me?', 'I don\'t understand. I think it\'s like I\'m your father. ', 'The crematorium calls to ask your mother how familiar she is. You answer,', ' why don\'t you put a shelter for your family and play games at the dog meat Festival? ', 'You don\'t have a brain or are you mildewed?', ' you answer, ', 'go back to your mother\'s genitals and rebuild yourself as a dog.', 'get out of here, you timid little brother.', 'why don\'t you sit on your mother\'s grave and talk to her slowly?', 'your father and I reward your mother with a leaky urn.', 'I just have a dog farting on the keyboard faster than your hands.', 'Don\'t spray shit, will you? It\'s all over your head. You know what?', ' Dad shoved a bone cleaver into your mother\'s forehead and kicked it to pry open your mother\'s skull. Now your mother\'s brain is flying in the sky. You know what? ', 'I used JB to fool your mother\'s brain. Now your mother boasted that she had a concussion because of her male genitals, ', 'Big dad ripped your son of a bitch\'s ass open with his bare hands and asked your father to put his head in to let your mother\'s shit pin replenish your father\'s biological energy. Do you understand that?', ' don\'t talk to me in that threatening tone. ', 'Do you think you can\'t beat a fool if you scold him a few words?', 'don\'t you be so funny and humorous. ', 'Have you found that all your BB\'s bullshit?', 'I can totally ignore your rubbish language', 'I don\'t think you can resist my flood words', 'you can\'t go back to the sky', 'you can only knock on the keyboard', 'you tell me whether you are crying inside and can\'t go back to the sky', 'why don\'t you think about whether you have the strength to compete with me', 'how boring it is to write with a disabled person for half a day, do you know?', 'Don\'t attack me with your fragmented words.', 'don\'t you think your sparse words are too innocuous?', 'do you want to beat me even if you\'re such a loser?', 'now you\'re a fool talking about fantasy.', 'why can\'t you understand my intention to beat you?', 'why can\'t I help beating you?', 'Are you thinking about how to answer me now?', ' you tell me all about it. ', 'Are you speechless when I hit you?', ' are you in the abyss of disappointment and unable to extricate yourself from the pain. ', 'Do you think you can compete with your elder brother and me just by saying a few words to me?', 'I don\'t want to hit your weak brother any more, ', 'I\'m insulting my Mamba crazy snake keyboard.', ' do you think you can knock me down in the virtual Internet world with your words? ', 'Do you think you can dominate the keyboard world?', 'do you not even have the courage to hit your mother and press the return button?', ' And you are still shaking and losing your focus, ', 'Can you see your father\'s and I\'m attacking you like a flood when your eyes are loose', 'how vulnerable is your crying language in my eyes', 'brother, I trample on your self-esteem and personality at will', 'can you still use your fragmentary language to fight back against me', 'can you speak well? I beg you to improve your toad speed.', 'Will you continue to carry forward your cheeky spirit', 'will you go back and cry with your mother', 'only your mother can comfort you', 'look at your powerless struggle', 'are you going to kneel down and beg me to stop attacking', 'watch how your father teaches you with gorgeous words', 'do you feel unprecedented fear?', 'Is your heart beating for fear of your father\'s speed?', 'brother, are you afraid of me?', 'aren\'t you going away?', 'you can continue to talk to me with your broken language and shameless Kung Fu', 'but what else do you think you have?', 'you are a waste, you know?', 'Can your illogical and incomplete words really bring you happiness and a sense of victory', 'do you want to rush to the reality to find me', 'beat me with your shaking and incomplete hands', 'you can only tear your nth skin to beg me to surround you', 'continue to find excuses to escape me', 'do you cry in your heart now?', 'Talking to you makes me feel a kind of nameless shame', 'I don\'t want to write with the disabled people anymore do you understand', 'why do you forget all the basic words', 'are you nervous', 'your blank brain occasionally thinks about this complex situation', 'do you still want to win me with your words', 'what\'s your situation now?', 'Do you want your father to be merciful', 'are you trying to answer me', 'Why are you dumb', 'why don\'t you dare to type', 'why do you start stuttering when you talk to me', 'why do you still struggle with death', 'do you have to think for half a day before you can utter a word to me', 'How can you be such a loser as no one has ever been before?', 'you really have no medicine to save you. You know what? ', 'Why do you have to teach me how to deal with it in front of me?', ' why do you have to stammer in front of me? ', 'Don\'t you have a sense of shame?', 'your plain language can\'t resist me.', ' I really want to give you a devastating blow, ', 'Your ignorance is just a pile of dirt under my feet. Do you know it?', ' you remember that you should not attack me with your vulgar language in the future. It\'s like letting your father and I define your character. ', 'You don\'t want to see me in a state of fear.', ' you squat in the toilet to see your cowardly image. ', 'I really don\'t know what words to describe your brother, ', 'You can\'t hold your head up in front of your elder brother and me. You know what, younger brother', 'your words are so vulnerable', 'you want to use your words to arouse my anger', 'I just don\'t care to talk nonsense with you. You know what?', 'you don\'t need to pretend to be in front of me in the future.', ' You don\'t feel disgraced if you don\'t have a little power to still brag in front of me.', 'How can you compete with me in your self-confidence', 'your displaced language has been broken by my attack for a long time', 'Do you want me to use these words to describe my most incisive language to you?', 'tell your elder brother that your weak body can bear my sharp language ', ' what\'s your garbage ', ' how to deal with your waste ', ' why do you use such cheap and vulgar language to compete with me? ', 'You can tell me if you\'re a mess.', 'you\'re just waiting for me to deal with you.', 'I can attack you easily with my usual speed of buttoning words.', 'what else can you do?', 'do you want to continue to show me how shameful you are?', 'is it fun to lose face? ', 'Can\'t you die?', 'my language doesn\'t matter to you.', 'Because you\'ve been knocked numb by me for a long time. No.', 'you didn\'t dare to hit me back at all from the beginning. ', 'Your first counterattack was just your instinct, didn\'t you?', 'do you want me to stop your breathing? ', ' I\'m wrong on the keyboard,Your scattered words', 'your hope comes from your occasional flash of inspiration', 'what qualification do you have to talk to me again', 'I\'m not a big hand', 'but I\'ll always be sacred and inviolable in your eyes, you know', 'looking at your sad and funny funny funny, I have a sense of sadness in my heart', 'how did you grow up in the end', 'I really want to say hello to your mother.', 'how did you make such a good living?', 'the century coward who is outstanding and unmatched.', 'you go back to practice for decades and then fight with me.', 'now you don\'t have this ability.', 'you don\'t know that my speed can be completely wiped out. How can you compare with me?', 'How can you talk to me about your angry cowards? How can you be so shameless? how can your loose words match me? how can you hate cowards? how can your words be so cowardly now? ', 'What\'s the matter with you, little brother?', ' how can you talk about your shameless words with me about your angry cowards? ', 'You have the audacity to come to me and brag about how strong your strength is', 'don\'t you really know how to write the word', ' take the buzzwords that have been spread on Baidu a few years ago ', ' how can I not see the meaning in your piecemeal buzzwords ', 'I can wipe out your self-esteem with the highest speed now. Don\'t you know?', ' your speed is comparable to that of me. ', 'Why do you always challenge me to the highest level with your killing power?', 'you think your gouging typing method can defeat my amazing level. ', 'Don\'t think you\'re invincible in the East', 'in fact, you\'re full of money', 'you only have your snail like speed and your crooked words', 'you tell me why you\'re so powerful here', 'you think your disgusting words can hurt your father and me', 'are you just this skill', 'why don\'t you tell your father and me without speed', 'Why do you tell your father I\'m a loser?', ' why don\'t you get out of here? ', 'Why do you disgust your father and me? why do you use your power here? Why are you chirping here? Why are you incoherent? Why do you tell your father I tell me why? why do you live like this?', 'Does it add luster to your ancestors?', 'You see what your poor me put on', 'you tell me', 'I put on everything better than you put on B', 'you don\'t know how embarrassed you are', 'you don\'t know how thick you are underground until your mother and I beat you to the ground', 'now I tell you loser', 'I feel sad for you, do you know', 'you say you want to kill me in a hurry', 'how can you kill me? Little brother ', ' go back to your mother\'s womb to study for a few years and fight with me ', ' what do you do with your might ', ' what do you do with your bullying ', ' you poor thing ', ' you rubbish ', ' I\'ve seen a lot ', ' don\'t be in my parents, OK ', ' I\'ll kneel down ten meters away from you later to know ', ' don\'t always use your loser ', 'It\'s a careless word to live a lifetime', 'it\'s so humiliating to China\'s 1 billion people just like you', 'your language is not fast, you need to learn and education', 'I really feel very sad for your mother', 'you don\'t have to always brag with me', 'you don\'t have to talk with me in that disorderly language, OK?', 'Tell me what\'s wrong with you', 'do you have a deck of cards? Of course not', 'what do you play with me', 'what do you play with me', 'you can\'t keep up with dad\'s flying speed', 'you tell me how your mom brought you to the earth', 'you tell me what\'s wrong with your dad', 'you tell me what\'s wrong with your mom', 'do you know if your mom died', 'Do you know that your father and mother are dead, and you are still in the mood to surf the Internet', 'Why are you so unfilial', 'you tell me it\'s OK', 'why don\'t you tell me', 'you speak it\'s OK', 'are you afraid', 'do you shrink back', 'why don\'t you take out your words to reject my theory', 'Why are you so terrible?', 'My little hand, why are you afraid of me', 'why don\'t you talk', 'don\'t you pretend to be forced or not', 'when you pretend to be me, I\'ll tear your mother up and put it in your mouth', 'are you crying', 'I know you\'re crying', 'you\'re all in tears now, right', 'you tell me', 'are you male or female', 'I\'m your father, you tell me', 'Dad knows you\'re excited', 'Why are you excited', 'are you nervous', 'are you nervous when you meet Dad', 'why do you meet Dad and me', 'because dad is a dog beating expert', 'why does Dad want to beat dogs', 'because you\'re a dog', 'Why are you a dog', 'because your mom didn\'t teach you well', 'why didn\'t you teach well', 'Because your mother is busy selling B', 'why is your mother busy selling B', 'because she wants to earn money to support you', 'why does your mother want to support you', 'why does she want to support you', 'why does she want to raise you as an animal', 'why does she raise you up and you don\'t behave well', 'and run to be a dog? Go home and ask your mother', 'why do so much', 'why do you know exactly why?', 'It\'s because of your dog\'s misfortune', 'don\'t you know what\'s wrong', 'why do you still insist', 'why do you insist', 'why don\'t you return to the original', 'children, do you know, it\'s better to be human', 'to be a low-key online character can be respected by others', 'I know you\'re afraid of me', 'why do you want to be afraid of me', 'Can you not be afraid of me?', 'I don\'t want pride to make people fall back on my father.', 'why do your palms sweat?', 'why do your keyboard get wet?', 'why do you have this phenomenon?', 'are you really nervous?', 'do you feel cold?', 'are you shaking?', 'are you relaxing?', 'your father is very kind. ', 'Don\'t you feel like you\'re running away from me, OK?', 'I don\'t want to leave you, do you know? ', 'Dad has found infinite confidence in you.', ' give him some passion.', ' You let me know how fast you are.', 'how rich the language is. ', 'Why do you run away from me so balabalabala.', ' give me an explanation, I really don\'t want to be talked about as bullying you', 'why do you cry', 'you let me see your tears', 'can you be more mature', 'you even pretend that you don\'t know how powerless you are hitting me', 'do you think you have speed or how you can come out and resist me', 'think you don\'t have speed at all, do you understand or how you can come out?', 'I don\'t think you have any level at all. Do you understand or how you can come out?', 'can you come out and resist me or what you tell me?', 'don\'t you know that you don\'t have speed garbage?', 'don\'t you know that you don\'t have speed garbage?', 'You don\'t have speed at all like a snail, a tortoise and a tortoise. What do you know?', 'don\'t you know that you are the garbage without speed? Did you tell me? ', 'Don\'t you know that you are the garbage without speed? Did you tell me that you can.', ' is it interesting that you can lie to me if you are paralyzed? ', 'Don\'t move, right? Can you make it to the top now? Can you start right now? can you beat me to the top right now? Can you make it to the top now? Can you start right now? What do you mean, Are you angry and gnashing your teeth now', 'can you take your father\'s and my magnificent and sacred language now', 'do you start to chat with your father and me now', 'do you start to bully your father now', 'do you start to be rebellious now', 'do you know that you can only be trampled on the mud under your feet', 'Don\'t you know that your father and my nagging are fantastic', 'what are you shouting with your father now', 'you don\'t understand your speed at all, don\'t you', 'you don\'t know what words you are when your grandmother and grandson talk out', 'I don\'t understand your speed, don\'t you know yourself', 'you\'re incoherent, your mother, B, you\'re a big garbage', 'You\'re totally your mother\'s old basket thing', 'you don\'t know what you are completely, do you? don\'t you think you have no road, no skill, no level, no combat power, no lethality. You don\'t have a word to challenge me, do you, little brother? If you have a little attack power now, I\'ll give you a hand. You can\'t compete with me at all, you know, young man. Are you qualified to let me challenge you now? Are you totally incompetent? Your words are not lethal at all? What are you measuring now? Are you totally incompetent? Are you clear about yourself. You can\'t be compared with my level at all you know', 'you can\'t do anything at all', 'you can\'t do anything now', 'you can\'t do anything with your grandmother\'s legs', 'you can still be compared with each other', 'you don\'t have the speed at all, if you don\'t have the fighting power at all, you can\'t attack anything at all', 'you don\'t know what\'s your speed at all', 'What are you talking about now?',
	'I fucked your life', 'Go die mothafucker', 'I would not play on a server that allows to teleport...', 'You insulting a hacker? Kid...', 'Ur mad because someone is cheating in a blockgame? Ur just sad...', 'Even minecraft said your to bad lmao', 'Why Jartex is allowing this? I don\'t know, ask the staff! xD', 'Ur asking for my client even if your legit?! That means im just to good for you...', 'Hacks > Legit', 'Haha lmao you got killed by a hacker... Whose fault is this? The servers or mine xd'];

var AdL = ['u got killed? Watch this:', 'ha u bad! Your reward:', 'man ur bad! Here your price:', 'you can\'t complain:', 'now i know why everyone saying ur bad:', 'watch thizz:', 'quality content!', 'dont waste your time! Watch this instead:', 'tryharding < hacking... so watch this:', 'jartex isn\'t worth it...:', 'anticheat doin great isn\'t it?:'];

var HF = ['im not hacking im just testing anticheats. ALL 100% HARAM FREE!', 'sigma best client 100% HARAM FREE', 'all other CLIENTS 100% HARAM - ONLY SIGMA BEST', '10000% Haram Free hacks all legit proof', 'sigma best client 2021 virus free no BTC miner', 'sigma user is haram free download now the best sex client'];

	var target;
	var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');

	script.registerModule({
		name: "JartexL",
		description: "Sending sex automaticly",
	    category: "Fun",
	    tag: "JS",
		settings: {
	        Mode: Setting.list({
	            name: "Mode",
	            default: "Normal",
	            values: ["Normal","Advertise", "HaramFree"]
	        }),
	        Help: Setting.boolean({
	            name: "How to set my URL?",
	            default: false
			}),
		}

	}, function (module) {
		module.on("enable", function () {
			target = null;
	    })
		module.on("attack", function (event) {
			if(event.getTargetEntity() instanceof EntityPlayer){
				target = event.getTargetEntity();
			}
	    })
		module.on("update", function () {
	        if (target != null) {
	            if (target.isDead) {
	            	        if (module.settings.Mode.get() == "Normal") {
	                        mc.thePlayer.sendChatMessage("!L "+target.getName()+" "+EnglishWords[parseInt(Math.random()*EnglishWords.length)] );	
	            	        }
	            	        if (module.settings.Mode.get() == "Advertise") {
		                    mc.thePlayer.sendChatMessage("! "+target.getName()+" "+AdL[parseInt(Math.random()*AdL.length)]+" "+moduleManager.getModule("Spammer").getValue("message").get() );		
	            	        }
	            	        if (module.settings.Mode.get() == "HaramFree") {
	            	        mc.thePlayer.sendChatMessage("! "+target.getName()+" "+HF[parseInt(Math.random()*HF.length)] );		
	            	        }
	                    }
	                }
	        target = null;
	        
	        if (module.settings.Help.get()) {
	        Chat.print("§8§l[§9§lL§8§l]§8 <-->");
	        Chat.print("§8§l[§9§lL§8§l]");
	        Chat.print("§8§l[§9§lL§8§l]§7 To set ad URL:");	
	        Chat.print("§8§l[§9§lL§8§l]§7 set the §c§lspammer message§7 to §c§lyour URL!");
	        Chat.print("§8§l[§9§lL§8§l]");
	        Chat.print("§8§l[§9§lL§8§l]§8 Example: §c§l.spammer message https://hanime.tv/");
	        Chat.print("§8§l[§9§lL§8§l]");
	        Chat.print("§8§l[§9§lL§8§l]§8 <-->");
	        module.settings.Help.set(false);
	        }
	    })
	})

var PW = ['ashvdz17asj!'];
var SL = ['login'];
var SR = ['register'];

script.registerModule({
    name: "JartexRegister",
    description: "Makes your register on jartex also login ok",
    category: "Fun",
    tag: "JS",
    settings: {}

}, function (module) {
    module.on("enable", function () {

    });
    module.on("disable", function () {

    });
    module.on("packet", function (event) {
    var packet = event.getPacket();
    if (packet instanceof HentaiPacket) {
    if(packet.getChatComponent().getUnformattedText().contains(SR[parseInt(Math.random()*SR.length)])) {
    mc.thePlayer.sendChatMessage("/register " +PW[parseInt(Math.random()*PW.length)] + " " +PW[parseInt(Math.random()*PW.length)]);
    }
    if(packet.getChatComponent().getUnformattedText().contains(SL[parseInt(Math.random()*SL.length)])) {
    mc.thePlayer.sendChatMessage("/login " +PW[parseInt(Math.random()*PW.length)] );	
    }
    }
    });
});

script.registerModule({
    name: "MatrixFlyz",
    description: "Makes your dick hard so you can fly in air",
    category: "Fun",
    tag: "JS",
    settings: {
		Mode: Setting.list({
			name: "Mode",
			default: "MatrixBoat",
			values: ["MatrixBoat", "Matrix"]
		}),
		Y: Setting.float({
			name: "BoatY",
			default: 0.65,
			min:0.5,
			max:5
		}),
		Boost: Setting.float({
			name: "Boost",
			default: 4.5,
			min:0.5,
			max:10
		}),
    }

}, function (module) {
    module.on("enable", function () {
    if (module.settings.Mode.get() == "Matrix" && mc.thePlayer.onGround) {
    mc.thePlayer.jump();
    }	
    isBoat = false;
    isBoost = false;
    });
    module.on("disable", function () {
    isBoat = false;
    isBoost = false;
    mc.timer.timerSpeed = 1;
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    if (module.settings.Mode.get() == "Matrix") {
    if (Y == true) {
    if (packet instanceof C04 || packet instanceof Amanee || packet instanceof TitsBest) {
    e.cancelEvent();	
    }	
    }
    }
    });
    module.on("update", function () {
    if (module.settings.Mode.get() == "MatrixBoat") {
    if (mc.thePlayer.isRiding()) {
    isBoat = true;
    isSneak = true;
    mc.gameSettings.keyBindSneak.pressed = true;
    } else {	
    if (isBoat == true) {
    mc.gameSettings.keyBindSneak.pressed = false;
    mc.thePlayer.motionY = module.settings.Y.get()
    mc.timer.timerSpeed = 0.3;
    isBoat = false;
    isBoost = true;
    }
    if (isBoost == true) {
    mc.timer.timerSpeed = 1;
    var dir = Math.rad(mc.thePlayer.rotationYaw);
    mc.thePlayer.motionX += -Math.sin(dir) * module.settings.Boost.get()
    mc.thePlayer.motionZ += Math.cos(dir) * module.settings.Boost.get()
    isBoost = false;
    }
    }
    }
    
    if (module.settings.Mode.get() == "Matrix") {
    if (mc.thePlayer.fallDistance > 1) {
    Y = true;	
    mc.thePlayer.motionY = 0.405;
    mc.thePlayer.fallDistance = 0;
    }
    Y = false;
    }
    });
});






