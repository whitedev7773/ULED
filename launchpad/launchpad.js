import Color from "./color-code.js";

// For Module Export
export default class Launchpad {

    chain = {};

    constructor (){
        console.log("Virtual Laucnhpad Attached");
        for (var i = 1; i <= 32; i++) {
            this.chain[i] = document.querySelector(`#chain-${i}`);
        }
    }

    ChangeTypeTo(class_style) {
        document.querySelector("#virtual-launchpad").classList = [class_style];
    }

    async Delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    ColorTo(y, x, color_code="0") {
        document.querySelector(`#line-${y}`).children[Number(x)].style.backgroundColor = new Color().Code(color_code);
    }

    Clear(color_code="0") {
        for (let y = 0; y <= 9; y++) {
            for (let x = 0; x <= 9; x++) {
                this.ColorTo(y, x, color_code);
            }
        }
    }

    async Play() {
        var value = document.querySelector("#whole-led").value.split("\n");

        for (var i = 0; i < value.length; i++) {
            if (value[i] == "") {
                continue;
            }

            var line_split = value[i].split(" ");
            
            if (value[i].startsWith("d")) {
                var delay = line_split[1];
                await this.Delay(delay);
                continue;
            }
            else if (line_split[1] == "mc") {
                var chain = line_split[2];
                var y = 
            }
            else {
                var y = line_split[1];
                var x = line_split[2];
            }
            var color_code = line_split[4];
            this.ColorTo(y, x, color_code);
        }
    }

}
