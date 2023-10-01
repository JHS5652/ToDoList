//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.

// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 밑줄 보여주기

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let mode = "all";
let filterList=[];
addButton.addEventListener("click",addTask);
taskInput.addEventListener("keypress",function(event){
  if (event.key === "Enter"){
    addTask();  
  }
});
for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){
    filter(event);
  })
}
function addTask(){
  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete:false
  };
  taskList.push(task);
  console.log(taskList);
 render();
}
function render(){
  let list =[];

  if(mode=="all"){
    list = taskList;
  }else if(mode == "ongoing"||mode=="done"){
    list = filterList;
    console.log("ongoing else if");
  }

  let resultHTML="";
  for(let i=0;i<list.length;i++){

    if(list[i].isComplete==true){
      resultHTML+=`<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
      <i class="fa-solid fa-rotate-left color-gray" onclick="toggleComplete('${list[i].id}')"></i>
      <i class="fa-sharp fa-solid fa-trash color-red" onclick="deleteTask('${list[i].id}')"></i>
      </div>
    </div>`;
    }else{
      resultHTML+=`<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <i class="fa-solid fa-check color-green" onclick="toggleComplete('${list[i].id}')"></i>
      <i class="fa-sharp fa-solid fa-trash color-red" onclick="deleteTask('${list[i].id}')"></i>
    </div>
  </div>`;
}
    
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}
function toggleComplete(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
      taskList[i].isComplete= !taskList[i].isComplete;
      break;
    }
  }
  console.log(taskList);
  render();
}

function filter(event){
  mode = event.target.id;
  filterList = [];
  console.log("클릭됨",event.target.id);

  document.getElementById("under-line").style.width = event.target.offsetWidth +"px";
  document.getElementById("under-line").style.top = event.target.offsetTop+event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left = event.target.offsetLeft + "px";
  //이거 뭐임?


  if(mode=="all"){
    console.log(taskList);
    render();
  }else if(mode=="ongoing"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete == false){
        filterList.push(taskList[i]);
      }
    }



    render();
  }else if(mode =="done"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete == true){
        filterList.push(taskList[i])
      }
    }
    render();
  }
  console.log(filterList);
}

function randomIDGenerate(){
  return Math.random().toString(36).substr(2, 16);
}

function deleteTask(id){
  console.log(id);
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
      taskList.splice(i,1);
    }
  }
  for(let i=0;i<filterList.length;i++){
    if(filterList[i].id==id){
      filterList.splice(i,1);
    }
  }
  //taskList.splice(num,1);
  render();
}