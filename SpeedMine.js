/// api_version=2
var script = registerScript({
    name: 'FastMine',
    version: '1.0',
    authors: ['Killer']
});

var C07PacketPlayerDigging = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging')
var PotionEffect = Java.type('net.minecraft.potion.PotionEffect')
var EnumFacing = Java.type('net.minecraft.util.EnumFacing')
var ItemTool = Java.type('net.minecraft.item.ItemTool')
var BlockPos = Java.type('net.minecraft.util.BlockPos')
var Potion = Java.type('net.minecraft.potion.Potion')
var Blocks = Java.type('net.minecraft.init.Blocks')
var Block = Java.type('net.minecraft.block.Block')

function getBlock(x, y, z) {
    var pos = new BlockPos(x, y, z);
    return mc.theWorld.getChunkFromBlockCoords(pos).getBlock(pos);
}

function getBlockPos() {
    return BlockPos
}

script.on('enable', function () {});

script.on('disable', function () {});

script.on('load', function () {});

script.registerModule({
    name: 'FastMine',
    description: 'Speeds up block breaking',
    category: 'Player',
    tag: 'BigGod',
    settings: {
        Mode: Setting.list({
            name: 'Mode',
            values: ['NewPacket', 'NewPacket2', 'Potion', 'Novoline', 'Remix', 'Autumm'],
            default: 'NewPacket'
        }),
        Time: Setting.integer({
            name: 'Time',
            default: 10,
            min: 0,
            max: 200
        }),
        Level: Setting.integer({
            name: 'Level',
            default: 3,
            min: 0,
            max: 4
        }),
        MineSpeed: Setting.float({
            name: 'Speed',
            default: 1.4,
            min: 0.0,
            max: 3.0
        }),
        
    }
}, function (module) {
    module.on('disable', function () {
        if(Mode.get() == 'Potion') {
            mc.thePlayer.removePotionEffect(Potion.digSpeed.getId())
        }
    });
    module.on('packet', function (event) {
        var bzs = false; var bzx = 0.0; var pos; var face;
        if(Mode.get() == 'Remix') {
            if(event.getPacket() instanceof C07PacketPlayerDigging && mc.playerController != null) {
                if(event.getPacket().getStatus() == C07PacketPlayerDigging.Action.START_DESTROY_BLOCK) {
                    bzs = true
                    pos = event.getPacket().getPosition()
                    face = event.getPacket().getFacing()
                    bzx = 0.0
                } else if(event.getPacket().getStatus() == C07PacketPlayerDigging.Action.ABORT_DESTROY_BLOCK || event.getPacket().getStatus() == C07PacketPlayerDigging.Action.STOP_DESTROY_BLOCK) {
                    bzs = false
                    pos = null
                    face = null
                }
            }
        }
    });
    module.on('update', function () {
        mc.playerController.blockHitDelay = 0
        if(Mode.get() == 'NewPacket') {
            if(mc.playerController.curBlockDamageMP == 0.1) {
                mc.playerController.curBlockDamageMP += 0.1
            }
            if(mc.playerController.curBlockDamageMP == 0.4) {
                mc.playerController.curBlockDamageMP += 0.1
            }
            if(mc.playerController.curBlockDamageMP == 0.7) {
                mc.playerController.curBlockDamageMP += 0.1
            }
        }
        if(Mode.get() == 'NewPacket2') {
            if(mc.playerController.curBlockDamageMP == 0.2) {
                mc.playerController.curBlockDamageMP += 0.1
            }
            if(mc.playerController.curBlockDamageMP == 0.4) {
                mc.playerController.curBlockDamageMP += 0.1
            }
            if(mc.playerController.curBlockDamageMP == 0.6) {
                mc.playerController.curBlockDamageMP += 0.1
            }
            if(mc.playerController.curBlockDamageMP == 0.8) {
                mc.playerController.curBlockDamageMP += 0.2
            }
        }
        if(Mode.get() == 'Potion') {
            mc.thePlayer.addPotionEffect(new PotionEffect(Potion.digSpeed.id, Time.get(), Level.get()))
        }
        if(Mode.get() == 'Novoline') {
            if(mc.theWorld != null) {
                if(mc.playerController.curBlockDamageMP > (mc.thePlayer.inventory() && mc.thePlayer.getCurrentEquippedItem().getItem() instanceof ItemTool ? 0.6:0.675)) {
                    mc.playerController.curBlockDamageMP = 1.0    
                }
            }
        }
        if(Mode.get() == 'Remix') {
            if(mc.playerController.extendedReach()) {
                mc.playerController.blockHitDelay = 0
            } else if(bzs) {
                var block = mc.theWorld.getBlockState(pos).getBlock()
                bzx += (block.getPlayerRelativeBlockHardness(mc.thePlayer, mc.theWorld, pos) * MineSpeed.get())
                if (bzx >= 1.0) {
                    mc.theWorld.setBlockState(pos, Blocks.air.getDefaultState(), 11)
                    mc.thePlayer.sendQueue.getNetworkManager().sendPacket(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.STOP_DESTROY_BLOCK, pos, face))
                    bzx = 0.0
                    bzs = false
                }
            }
        }
        if(Mode.get() == 'Autumm') {
            var pos = getBlockPos()
            mc.playerController.curBlockDamageMP += getBlock(pos.getX(), pos.getY(), pos.getZ())
            mc.theWorld.getBlockState(pos).getBlock().getPlayerRelativeBlockHardness(mc.thePlayer, mc.theWorld, pos) * 0.186
        }
    });
});