var C01PacketChatMessage = Java.type('net.minecraft.network.play.client.C01PacketChatMessage');
var script = registerScript({
    name: 'Chat Bypass',
    version: '0.0.0',
    authors: ['Shurpe']
});
script.registerModule({
    name: 'Chat Bypass',
    category: 'Fun', 
    description: ''

}, function (module) {
    module.on('packet', function(e) {
        packet = e.getPacket();
        if (packet instanceof C01PacketChatMessage) {
            var message = packet.getMessage();
            if (!message.startsWith('/')) {
                var m = message.split(' ').join(','),
                    editedMessage = '';
                for(i = 0; i < m.length; i++) {
                    editedMessage += m[i].substr(0, 1) + 'ࠀ' + m[i].substr(1, i.length);
                }  
                packet.message = editedMessage.split(',').join(' ');
            }
        }
    });
});
