// For Module Export
export default class FrameList {
    frames = 1;
    selectedFrame = 1;

    constructor (){
        console.log("FrameList Attached");
    }
    
    SelectFrame(frame_number, show_log=true) {
        // 프레임 리스트 갱신
        var items = document.querySelectorAll("#frame-list > .item");

        this.selectedFrame = Number(frame_number);
        frame_number = this.selectedFrame - 1;

        items.forEach((item) => {
            item.classList.remove("selected");
        })

        items[frame_number].classList.add("selected");
        if (show_log){
            console.log(`${items[frame_number].innerHTML} Selected`);
        }
    }
    
    AddFrame() {
        // 프레임 리스트 갱신
        var items = document.querySelectorAll("#frame-list > .item");

        var last_frame = items[this.frames - 1]

        // 마지막 프레임으로부터 새 프레임 복사
        var new_frame = last_frame.cloneNode(false);
        new_frame.innerHTML = `Frame ${this.frames + 1}`;
        new_frame.classList.remove("selected");
        new_frame.addEventListener("click", this.OnClickFrame.bind(this));

        // 마지막 프레임 바로 아래에 추가
        last_frame.after(new_frame);

        // 총 프레임 개수에 1 추가
        this.frames += 1;

        var frame_list = document.querySelector("#frame-list");
        frame_list.scrollTo({ top: frame_list.scrollHeight, behavior: 'smooth' });

        this.SelectFrame(this.frames, false);
        console.log("Added Frame");
    }
    
    InsertFrameAt(frame_number) {
        // 프레임 리스트 갱신
        var items = document.querySelectorAll("#frame-list > .item");

        var current_frame = items[frame_number - 1];

        // 현재 선택된 프레임 다음에 새로운 프레임 준비
        var new_frame = current_frame.cloneNode(false);
        new_frame.innerHTML = `Frame ${frame_number + 1}`;
        new_frame.classList.remove("selected");
        new_frame.addEventListener("click", this.OnClickFrame.bind(this));

        // 프레임 삽입
        current_frame.after(new_frame);

        this.SortFrameList(false);
        this.SelectFrame(frame_number + 1);
        console.log(`Inserted Frame At ${frame_number}`);
    }
    
    RemoveFrame(frame_number) {
        // 프레임 리스트 갱신
        var items = document.querySelectorAll("#frame-list > .item");

        if (items.length <= 1) {
            alert("프레임은 최소 1개 이상이여야해요\nThe frame is to be at least one.");
            return;
        }        

        // 삭제 애니메이션 추가
        items[frame_number-1].animate({opacity: 0, transform: 'translateX(20%)', marginBottom: '-45px'}, {duration: 100, easing: "ease-out", fill: "forwards"});
        
        setTimeout(() => {
            items[frame_number-1].remove();
            this.SortFrameList(false);
    
            if (frame_number <= this.frames) {
                this.SelectFrame(frame_number, false);
            }
            else {
                this.SelectFrame(this.frames, false);
            }
        }, 100);

        console.log(`Removed Frame ${frame_number}`);
    }

    SortFrameList(show_log=true) {
        // 프레임 리스트 갱신
        var items = document.querySelectorAll("#frame-list > .item");

        var frame_number = 0
        items.forEach((item) => {
            frame_number += 1;
            item.innerHTML = `Frame ${frame_number}`;
        })

        this.frames = frame_number;

        if (show_log){
            console.log(`Updated Frame List (Frame Count : ${frame_number})`);
        }
    }

    // EventListener
    OnClickFrame(event) {
        var frame_number = Number(event.target.innerHTML.split(" ")[1]);
        this.SelectFrame(frame_number);
    }
}
