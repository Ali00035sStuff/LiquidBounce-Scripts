///api_version=2
//Copyright 2020 commandblock2 distributed under AGPL-3.0-or-later
(script = registerScript({
    name: "ColoredCross",
    version: "1.0",
    authors: ["commandblock2"]
})).import("Core.lib")

GL11 = Java.type("org.lwjgl.opengl.GL11");
Display = Java.type("org.lwjgl.opengl.Display");
Color = Java.type("java.awt.Color");

module =
{
    name: "ColoredCross",
    author: "commandblock2",
    values:
        [
            crossHairWidth = value.createInteger("CrossHairWidth",2,0,50),
            crossHairLength = value.createInteger("CrossHairLength",16,0,200),
            colorWidth = value.createFloat("ColorWidth",0.2,0.0,1.0)
        ],

    onRender2D: function () 
    {
        var maxDistance = ReachModule.state ? ReachModule.getValue("CombatReach").get() : 3.0
        var distance = 0

        if (mc.objectMouseOver && mc.objectMouseOver.entityHit)
            distance = PlayerExtensionKt.getDistanceToEntityBox
                (mc.thePlayer, mc.objectMouseOver.entityHit).toString();


        if (distance != 0) 
        {
            var Resolution = new ScaledResolution(mc);

            var width = Display.getWidth() / Resolution.getScaleFactor();
            var height = Display.getHeight() / Resolution.getScaleFactor();
            
            var central = [width / 2, height / 2]


            GL11.glPushMatrix();
            GL11.glEnable(GL11.GL_BLEND);

            var color = Color.HSBtoRGB(Math.max(0.0,Math.min(1.0,(colorWidth.get() - distance / maxDistance * colorWidth.get()))),1.0,1.0)

            Gui.drawRect(central[0] - crossHairWidth.get() / 2, central[1] - crossHairLength.get() / 2,
                central[0] + crossHairWidth.get() / 2, central[1] + crossHairLength.get() / 2, color);
            Gui.drawRect(central[0] - crossHairLength.get() / 2, central[1] - crossHairWidth.get() / 2,
                central[0] + crossHairLength.get() / 2, central[1] + crossHairWidth.get() / 2, color);


            GL11.glPopMatrix();

        }

    },

    onAttack: function()
    {
        
    }
}
