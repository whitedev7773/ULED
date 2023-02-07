export default class WebMIDI {

    midi_access = null;
    targetOutput = null;

    constructor() {
        // WebMIDI API를 지원하지 않으면 경고창 띄우기
        if (!navigator.requestMIDIAccess) {
            var kr = "WebMIDI가 지원되지 않는 브라우저에요.\nULED 사용에 영향은 없지만 실물 Launchpad로 미리볼 수 없어요";
            var en = "WebMIDI is not supported on this browser.\nIt doesn't affect the use of ULED, but it can't be previewed on the actual Launchpad.";
            alert(kr + "\n\n" + en);

            kr = "런치패드와 연결하기 위해선 크로미움 기반 또는 WebMIDI API를 지원하는 브라우저에서 접속해야해요.";
            en = "To connect with the Launchpad, you need to access it from a browser that is Chromium-based or supports the WebMIDI API.";
            alert(kr + "\n\n" + en);
            return;
        }

        navigator.requestMIDIAccess().then(this.__init_webMidi__.bind(this));
    }
    
    /** Init For Midi I/O */
    __init_webMidi__(midi_access) {
        this.midi_access = midi_access;

        for (var input of midi_access.inputs.values()){
            input.onmidimessage = this.OnMidiEvent.bind(this);
        }
    }
            
    OnMidiEvent(event) {
        var channel = event.data[0];
        var note = event.data[1];
        var velocity = event.data[2];
    
        var message = `<${event.target.name}> ch: ${channel}, note: ${note}, velo: ${velocity}\n`;
        var debug = document.querySelector("#midi-io-log > textarea");
    
        debug.value += message;
        debug.scrollTo({ top: debug.scrollHeight });

        if (!velocity == 0) {
            this.SendEvent(note, 3);
        }
        else{
            this.SendEvent(note, 0);
        }
    }
    
    /**
     * select_menu에 사용 가능한 MIDI를 선택할 수 있도록 연결하고 값 변경 시 해당 MIDI로 자동 연결
     * @param {Element}} <select> element
     */
    Execute(select_menu) {
        select_menu.options.length = 0;

        var outputs = this.midi_access.outputs;
        for (var output of outputs.values()) {
            let new_midi = new Option(output.name, output.name)
            select_menu.append(new_midi);
        }

        select_menu.addEventListener("change", OnSelectChange.bind(this));

        // 메뉴 변경 이벤트 리스너
        function OnSelectChange (event) {
            var device_name = event.target.value;
            this.ConnectDeviceByName(device_name);
        }
    }

    /**
     * 현재 선택된 MIDI 기기로 이벤트 전송
     * @param {int} note 
     * @param {int} velocity 
     */
    SendEvent(note, velocity) {
        if (!this.targetOutput) {
            console.log("No MIDI Device Connected");
            return;
        }
        this.targetOutput.send([0x90, note, velocity]); // [channel, note, velocity]
    }

    /**
     * 기기의 이름을 통해 연결 (이전에 연결한 기기는 연결 해제됨)
     * @param {string} device_name 
     */
    ConnectDeviceByName(device_name) {
        var outputs = this.midi_access.outputs;

        for (var output of outputs.values()) {
            if (output.name === device_name) {
                console.log(`Connected To ${device_name}`);
                this.targetOutput = output;
                break;
            }
        }
    }

}
