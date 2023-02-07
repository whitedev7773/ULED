import FrameList from "./frame-box/frame.js";
import Launchpad from "./launchpad/launchpad.js";
import Color from "./launchpad/color-code.js";


var frame_list = new FrameList();
var launchpad = new Launchpad();

document.querySelectorAll("#frame-list > .item").forEach((item) => {
    item.addEventListener("click", frame_list.OnClickFrame.bind(frame_list));
});

// 버튼 이벤트 리스너 추가
document.querySelector("#add-button").addEventListener("click", (e) => {
    frame_list.AddFrame();
});

document.querySelector("#remove-button").addEventListener("click", (e) => {
    frame_list.RemoveFrame(frame_list.selectedFrame);
});

document.querySelector("#insert-button").addEventListener("click", (e) => {
    frame_list.InsertFrameAt(frame_list.selectedFrame);
});

document.querySelector("#play-button").addEventListener("click", async (e) => {
    await launchpad.Play();
});
/*****************************************************/


// 가상 런치패드 타입 변경 메뉴 이벤트 리스너
document.querySelector("#launchpad-type-select").addEventListener("change", (e) => {
    launchpad.ChangeTypeTo(e.target.value);
});

document.oncontextmenu = () => {
    return false;
}