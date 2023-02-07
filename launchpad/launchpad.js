import Color from "./color-code.js";
import WebMIDI from "./webmidi.js";

// For Module Export
export default class Launchpad {

    pallete = new Color();
    web_midi = new WebMIDI();
    button = {};
    chain = {};
    logo = null;

    __button_midi_note_data = {
        // 9 : [chain1,]
    }

    constructor (){
        this.logo = document.querySelector("#logo");
        for (var i = 1; i <= 32; i++) {
            this.chain[i] = document.querySelector(`#chain-${i}`);
        }
        for (var y = 1; y <= 8; y++) {
            this.button[y] = document.querySelector(`#line-${y}`).children;
        }

        setTimeout(() => {
            this.web_midi.Execute(document.querySelector("#midi-out-select"));
        }, 500);

        console.log("Virtual Laucnhpad Attached");
        // console.log(this.chain);
    }

    // 가상 런치패드 디자인 변경
    ChangeTypeTo(class_style) {
        document.querySelector("#virtual-launchpad").classList = [class_style];
    }

    async Delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    ColorTo(y, x, color_code="0") {
        // console.log(y, x, color_code);
        switch (y) {
            case "mc":
                const chain = Number(x);
                this.ColorChainTo(x, color_code);
                break;
            case "l":
                this.ColorLogo(color_code);
                break;
            default:
                this.web_midi.SendEvent(Number(`${9-y}${x}`), color_code);
                this.button[y][x].style.backgroundColor = this.pallete.GetColorByCode(color_code);
        }
    }

    ColorChainTo(chain_number, color_code="0") {
        this.chain[chain_number].style.backgroundColor = this.pallete.GetColorByCode(color_code);
    }
    
    ColorLogo(color_code="0") {
        this.logo.style.backgroundColor = this.pallete.GetColorByCode(color_code);
    }

    Clear(color_code="0") {
        for (let y = 0; y <= 9; y++) {
            for (let x = 0; x <= 9; x++) {
                this.ColorTo(y, x, color_code);
            }
        }
    }

    // 전체 LED 코드 플레이
    async Play() {
        const lines = document.querySelector("#whole-led").value.split("\n");
        const commands = {
            d: "delay",
            delay: "delay",
            o: "on",
            on: "on",
            f: "off",
            off: "off"
        };

        var all_delay = 0;

        for (const line of lines) {
            if (!line) {
                continue;
            }

            const [command, ...args] = line.split(" ").map(x => x.toLowerCase());
            const cmd = commands[command];
            let y, x, colorCode, autoKeywordPosition = 3;

            switch (cmd) {
                case "delay":
                    // await this.Delay(Number(args[0]));
                    all_delay += Number(line.split(" ")[1]);
                    break;
                case "on":
                case "off":
                    switch (args[0]) {
                        case "mc":
                            y = "mc";
                            x = Number(args[1]);
                            break;
                        case "l":
                            y = "l";
                            autoKeywordPosition = 2;
                            break;
                        default:
                            y = Number(args[0]);
                            x = Number(args[1]);
                    }
                    switch (args[autoKeywordPosition]) {
                        case "a":
                        case "auto":
                            colorCode = args[autoKeywordPosition + 1];
                            break;
                        default:
                            colorCode = args[autoKeywordPosition];
                    }
                    setTimeout(() => {
                        this.ColorTo(y, x, cmd === "on" ? colorCode : "0");
                    }, all_delay);
                    break;
            }
        }
    }  
}
